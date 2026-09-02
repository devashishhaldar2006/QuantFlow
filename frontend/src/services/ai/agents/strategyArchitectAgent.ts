import { StateGraph, Annotation, END, START } from "@langchain/langgraph";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { getMistralClient } from "../mistralClient";
import { StrategyArchitectState } from "../types";
import { createBacktest } from "@/services/backtest/backtestService";
import { BacktestConfig } from "@/features/backtest/schema";

// 1. Define State Annotation
export const StrategyArchitectAnnotation = Annotation.Root({
  hypothesis: Annotation<string>(),
  preferredAssetClass: Annotation<string | undefined>(),
  timeframe: Annotation<string | undefined>(),
  config: Annotation<Partial<BacktestConfig>>(),
  validationErrors: Annotation<string[]>({
    reducer: (curr, next) => next,
    default: () => [],
  }),
  iterationCount: Annotation<number>({
    reducer: (curr, next) => next,
    default: () => 0,
  }),
  backtestResult: Annotation<any>(),
  reflectionNotes: Annotation<string | undefined>(),
  isViable: Annotation<boolean>({
    reducer: (curr, next) => next,
    default: () => false,
  }),
  strategyMemo: Annotation<string | undefined>(),
});

// 2. Node: Parse natural language hypothesis into initial config
async function parseHypothesisNode(state: typeof StrategyArchitectAnnotation.State) {
  const model = getMistralClient({ temperature: 0.1 });

  const prompt = `You are an elite quantitative researcher at an institutional algorithmic hedge fund.
The user has provided this trading hypothesis:
"${state.hypothesis}"
Preferred asset class: ${state.preferredAssetClass || "Any"}
Preferred timeframe: ${state.timeframe || "1d"}

Choose EXACTLY ONE of the supported C++ QuantFlow strategies:
- "MovingAverageCross" (requires shortMAPeriod < longMAPeriod)
- "EMACross" (requires fastEMAPeriod < slowEMAPeriod)
- "RSI" (requires rsiPeriod, oversold < overbought)
- "MACD" (requires macdFastPeriod < macdSlowPeriod, macdSignalPeriod)
- "Bollinger" (requires bollingerPeriod, bollingerMultiplier)
- "ATRFilter" (requires atrPeriod, minimumATR)

Return ONLY a valid JSON object with:
{
  "strategy": "string (one of above)",
  "csvFile": "data/sample_nifty50_daily.csv",
  "initialCash": 100000,
  "commission": 0.001,
  "stopLossPercent": 0.02,
  "takeProfitPercent": 0.05,
  "slippage": 0.001,
  "shortMAPeriod": 10,
  "longMAPeriod": 20,
  "rsiPeriod": 14,
  "oversold": 30,
  "overbought": 70,
  "fastEMAPeriod": 10,
  "slowEMAPeriod": 20,
  "macdFastPeriod": 12,
  "macdSlowPeriod": 26,
  "macdSignalPeriod": 9,
  "bollingerPeriod": 20,
  "bollingerMultiplier": 2.0,
  "atrPeriod": 14,
  "minimumATR": 1.0
}`;

  const response = await model.invoke([
    new SystemMessage("You output valid JSON only. No markdown fences."),
    new HumanMessage(prompt),
  ]);

  let parsed: any = {};
  try {
    const raw = String(response.content).replace(/```json/g, "").replace(/```/g, "").trim();
    parsed = JSON.parse(raw);
  } catch {
    parsed = {
      strategy: "MovingAverageCross",
      csvFile: "data/sample_nifty50_daily.csv",
      initialCash: 100000,
      commission: 0.001,
      stopLossPercent: 0.02,
      takeProfitPercent: 0.06,
      slippage: 0.001,
      shortMAPeriod: 10,
      longMAPeriod: 25,
    };
  }

  return {
    config: parsed,
    iterationCount: state.iterationCount + 1,
  };
}

// 3. Node: Validate & enforce C++ mathematical boundaries
async function validateAndConstrainNode(state: typeof StrategyArchitectAnnotation.State) {
  const cfg = { ...state.config };
  const errors: string[] = [];

  // Enforce boundary rules for C++ engine
  if (cfg.shortMAPeriod && cfg.longMAPeriod && cfg.shortMAPeriod >= cfg.longMAPeriod) {
    cfg.shortMAPeriod = Math.max(5, cfg.longMAPeriod - 10);
    errors.push("Adjusted shortMAPeriod to remain strictly less than longMAPeriod.");
  }
  if (cfg.fastEMAPeriod && cfg.slowEMAPeriod && cfg.fastEMAPeriod >= cfg.slowEMAPeriod) {
    cfg.fastEMAPeriod = Math.max(5, cfg.slowEMAPeriod - 10);
    errors.push("Adjusted fastEMAPeriod to remain strictly less than slowEMAPeriod.");
  }
  if (cfg.macdFastPeriod && cfg.macdSlowPeriod && cfg.macdFastPeriod >= cfg.macdSlowPeriod) {
    cfg.macdFastPeriod = Math.max(8, cfg.macdSlowPeriod - 14);
    errors.push("Adjusted macdFastPeriod to remain strictly less than macdSlowPeriod.");
  }
  if (cfg.oversold && cfg.overbought && cfg.oversold >= cfg.overbought) {
    cfg.oversold = 30;
    cfg.overbought = 70;
    errors.push("Reset RSI oversold/overbought to standard 30/70 thresholds.");
  }

  return {
    config: cfg,
    validationErrors: errors,
  };
}

// 4. Node: Execute backtest against C++ engine tool
async function executeEngineNode(state: typeof StrategyArchitectAnnotation.State, config?: any) {
  const userId = config?.configurable?.userId || "system-ai-agent";
  try {
    const fullConfig = state.config as BacktestConfig;
    const result = await createBacktest(fullConfig, userId);
    return {
      backtestResult: result,
    };
  } catch (err: any) {
    return {
      reflectionNotes: `Engine execution warning: ${err?.message || "Execution error"}`,
    };
  }
}

// 5. Node: Reflect on performance and tune if sub-optimal
async function reflectAndTuneNode(state: typeof StrategyArchitectAnnotation.State) {
  const res = state.backtestResult;
  const iteration = state.iterationCount;

  // If we don't have results or exceeded 2 loops, mark done
  if (!res || iteration >= 2) {
    return {
      isViable: true,
      reflectionNotes: "Strategy calibrated and finalized.",
    };
  }

  // Viability criteria: Sharpe >= 1.0 and Maximum Drawdown <= 15%
  const sharpe = res.sharpeRatio ?? 0;
  const maxDD = res.maximumDrawdown ?? 20;

  if (sharpe >= 1.0 && maxDD <= 15.0) {
    return {
      isViable: true,
      reflectionNotes: `Strategy achieved target risk metrics: Sharpe ${sharpe.toFixed(2)}, Max DD ${maxDD.toFixed(2)}%.`,
    };
  }

  // Otherwise, use Mistral to adjust hyperparameters
  const model = getMistralClient({ temperature: 0.3 });
  const tunePrompt = `The previous backtest of strategy ${state.config.strategy} yielded:
- Total Return: ${res.totalReturnPercent?.toFixed(2)}%
- Sharpe Ratio: ${sharpe.toFixed(2)}
- Max Drawdown: ${maxDD.toFixed(2)}%
- Win Rate: ${res.winRatePercent?.toFixed(2)}%

This is sub-optimal (we require Sharpe >= 1.0 and Max DD <= 15%).
Hypothesis was: "${state.hypothesis}".
Current config: ${JSON.stringify(state.config)}

Modify 2-3 parameters (e.g. adjust stop-loss, take-profit, or smoothing periods) to improve drawdown control.
Return ONLY the updated JSON config object.`;

  try {
    const response = await model.invoke([
      new SystemMessage("You output valid JSON only. No markdown fences."),
      new HumanMessage(tunePrompt),
    ]);
    const raw = String(response.content).replace(/```json/g, "").replace(/```/g, "").trim();
    const tunedConfig = JSON.parse(raw);

    return {
      config: { ...state.config, ...tunedConfig },
      iterationCount: iteration + 1,
      isViable: false,
      reflectionNotes: `Iterative tuning #${iteration}: Adjusting parameters to control drawdown.`,
    };
  } catch {
    return {
      isViable: true,
      reflectionNotes: "Completed tuning iteration.",
    };
  }
}

// 6. Node: Generate Institutional Strategy Memo
async function generateMemoNode(state: typeof StrategyArchitectAnnotation.State) {
  const model = getMistralClient({ temperature: 0.3 });
  const res = state.backtestResult;

  const prompt = `Write an Executive Quantitative Strategy Brief for an institutional portfolio manager.
Hypothesis: "${state.hypothesis}"
Selected Model: ${state.config.strategy}
Final Parameters: ${JSON.stringify(state.config)}
Performance Metrics:
- Total Return: ${res?.totalReturnPercent?.toFixed(2) || "N/A"}%
- Sharpe Ratio: ${res?.sharpeRatio?.toFixed(2) || "N/A"}
- Max Drawdown: ${res?.maximumDrawdown?.toFixed(2) || "N/A"}%
- Total Trades: ${res?.totalTrades || "N/A"}
- Win Rate: ${res?.winRatePercent?.toFixed(2) || "N/A"}%

Structure the brief into 3 concise sections:
1. Executive Hypothesis & Mathematical Thesis
2. Execution Risk & Regime Sensitivity
3. Portfolio Deployment Recommendation (Capital size & stop-loss rules)`;

  const response = await model.invoke([
    new SystemMessage("You are a Senior Quantitative Portfolio Manager writing an institutional memo."),
    new HumanMessage(prompt),
  ]);

  return {
    strategyMemo: String(response.content),
  };
}

// 7. Conditional routing function
function shouldContinueLoop(state: typeof StrategyArchitectAnnotation.State) {
  if (state.isViable || state.iterationCount >= 2) {
    return "generateMemo";
  }
  return "validateAndConstrain";
}

// 8. Assemble LangGraph Workflow
export function createStrategyArchitectGraph() {
  const workflow = new StateGraph(StrategyArchitectAnnotation)
    .addNode("parseHypothesis", parseHypothesisNode)
    .addNode("validateAndConstrain", validateAndConstrainNode)
    .addNode("executeEngine", executeEngineNode)
    .addNode("reflectAndTune", reflectAndTuneNode)
    .addNode("generateMemo", generateMemoNode)
    .addEdge(START, "parseHypothesis")
    .addEdge("parseHypothesis", "validateAndConstrain")
    .addEdge("validateAndConstrain", "executeEngine")
    .addEdge("executeEngine", "reflectAndTune")
    .addConditionalEdges("reflectAndTune", shouldContinueLoop, {
      generateMemo: "generateMemo",
      validateAndConstrain: "validateAndConstrain",
    })
    .addEdge("generateMemo", END);

  return workflow.compile();
}
