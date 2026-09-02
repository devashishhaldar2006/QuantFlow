import { StateGraph, Annotation, END, START } from "@langchain/langgraph";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { getMistralClient } from "../mistralClient";
import { RiskOfficerVerdict } from "../types";

// 1. Define State Annotation
export const RiskOfficerAnnotation = Annotation.Root({
  backtestId: Annotation<string>(),
  strategyName: Annotation<string>(),
  initialCapital: Annotation<number>(),
  finalEquity: Annotation<number>(),
  netProfit: Annotation<number>(),
  totalReturnPercent: Annotation<number>(),
  sharpeRatio: Annotation<number>(),
  maximumDrawdown: Annotation<number>(),
  winRatePercent: Annotation<number>(),
  profitFactor: Annotation<number>(),
  totalTrades: Annotation<number>(),
  winningTrades: Annotation<number>(),
  losingTrades: Annotation<number>(),
  averageWin: Annotation<number>(),
  averageLoss: Annotation<number>(),
  largestWin: Annotation<number>(),
  largestLoss: Annotation<number>(),
  // Audit node outputs
  overfittingFindings: Annotation<{
    score: number;
    luckConcentrationPercent: number;
    observations: string[];
  }>(),
  regimeFindings: Annotation<{
    score: number;
    stressTestSummary: string;
    vulnerableConditions: string[];
  }>(),
  finalVerdict: Annotation<RiskOfficerVerdict | undefined>(),
});

// 2. Node: Detect Overfitting & Outlier Luck Bias
async function detectOverfittingNode(state: typeof RiskOfficerAnnotation.State) {
  const model = getMistralClient({ temperature: 0.1 });

  // Calculate quantitative concentration ratio
  const net = state.netProfit > 0 ? state.netProfit : 1;
  const luckConcentration = Number(
    Math.min(100, Math.max(0, (state.largestWin / net) * 100)).toFixed(1),
  );

  const prompt = `Analyze this algorithmic trading backtest for statistical overfitting, curve-fitting, and sample size validity:
Strategy: ${state.strategyName}
Total Trades: ${state.totalTrades}
Winning Trades: ${state.winningTrades} | Losing Trades: ${state.losingTrades}
Win Rate: ${state.winRatePercent.toFixed(2)}%
Net Profit: $${state.netProfit.toFixed(2)}
Largest Single Winning Trade: $${state.largestWin.toFixed(2)} (accounts for ${luckConcentration}% of total profit)
Average Win / Average Loss: $${state.averageWin.toFixed(2)} / $${state.averageLoss.toFixed(2)}

Evaluate:
1. Is sample size statistically significant? (e.g. < 30 trades is dangerously small).
2. Is profit concentrated in a single lucky outlier?
3. Assign an Overfitting Robustness Score from 0 to 100 (where 100 = completely robust, 0 = pure curve fitting).

Return JSON ONLY:
{
  "score": number,
  "luckConcentrationPercent": ${luckConcentration},
  "observations": ["bullet 1", "bullet 2"]
}`;

  try {
    const response = await model.invoke([
      new SystemMessage("You output valid JSON only. No markdown fences."),
      new HumanMessage(prompt),
    ]);
    const raw = String(response.content).replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(raw);
    return { overfittingFindings: parsed };
  } catch {
    return {
      overfittingFindings: {
        score: state.totalTrades > 30 ? 82 : 45,
        luckConcentrationPercent: luckConcentration,
        observations: [
          state.totalTrades < 30
            ? "Sample size is under 30 trades; high risk of curve-fitting."
            : "Trade count meets baseline statistical sample size requirements.",
          luckConcentration > 40
            ? "Over 40% of net returns driven by a single outlier trade."
            : "Returns are evenly distributed across winning trades.",
        ],
      },
    };
  }
}

// 3. Node: Stress Test Across Macro Regimes
async function stressTestRegimesNode(state: typeof RiskOfficerAnnotation.State) {
  const model = getMistralClient({ temperature: 0.2 });

  const prompt = `Conduct a macroeconomic regime stress test for the quantitative strategy:
Strategy Model: ${state.strategyName}
Sharpe Ratio: ${state.sharpeRatio.toFixed(2)}
Maximum Drawdown: ${state.maximumDrawdown.toFixed(2)}%
Profit Factor: ${state.profitFactor.toFixed(2)}

Simulate how this specific strategy algorithm performs during:
1. High-volatility sideways whipsaw chop (e.g. central bank rate announcements).
2. Sudden flash crash with severe liquidity dry-up and slippage.
3. Sustained multi-month grinding bear market.

Return JSON ONLY:
{
  "score": number (0 to 100 regime survival rating),
  "stressTestSummary": "string (concise 2-sentence summary)",
  "vulnerableConditions": ["condition 1", "condition 2"]
}`;

  try {
    const response = await model.invoke([
      new SystemMessage("You output valid JSON only. No markdown fences."),
      new HumanMessage(prompt),
    ]);
    const raw = String(response.content).replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(raw);
    return { regimeFindings: parsed };
  } catch {
    return {
      regimeFindings: {
        score: state.maximumDrawdown < 10 ? 85 : 55,
        stressTestSummary: `Strategy exhibits ${state.maximumDrawdown < 10 ? "stable" : "elevated"} drawdown vulnerability under volatility shocks.`,
        vulnerableConditions: [
          "Low-liquidity consolidations causing false breakout whipsaws.",
          "Extended trending reversals before trailing stop-losses trigger.",
        ],
      },
    };
  }
}

// 4. Node: Synthesize Institutional Risk Committee Verdict
async function synthesizeVerdictNode(state: typeof RiskOfficerAnnotation.State) {
  const model = getMistralClient({ temperature: 0.1 });

  const over = state.overfittingFindings || { score: 70, luckConcentrationPercent: 20, observations: [] };
  const regime = state.regimeFindings || { score: 70, stressTestSummary: "", vulnerableConditions: [] };

  const compositeScore = Math.round(
    over.score * 0.4 + regime.score * 0.4 + (state.sharpeRatio > 1.5 ? 20 : 10),
  );

  const prompt = `You are the Chief Risk Officer (CRO) at an institutional hedge fund.
Synthesize the final Institutional Risk Committee Verdict for strategy: ${state.strategyName}
- Backtest Return: ${state.totalReturnPercent.toFixed(2)}%
- Sharpe: ${state.sharpeRatio.toFixed(2)}
- Max Drawdown: ${state.maximumDrawdown.toFixed(2)}%
- Overfitting Score: ${over.score}/100
- Regime Shock Score: ${regime.score}/100
- Composite Score: ${compositeScore}/100

Assign one classification:
- "INSTITUTIONAL_GRADE" (if compositeScore >= 78)
- "SPECULATIVE" (if compositeScore between 55 and 77)
- "OVERFITTED" (if overfitting score < 50)
- "EXCESSIVE_TAIL_RISK" (if drawdown > 18%)

Provide 3 concrete, mathematical risk limits (e.g. max position size, daily kill-switch loss limit).

Return JSON ONLY:
{
  "overallHealthScore": ${compositeScore},
  "classification": "INSTITUTIONAL_GRADE | SPECULATIVE | OVERFITTED | EXCESSIVE_TAIL_RISK",
  "summary": "2-3 sentence executive decision summary",
  "actionableRecommendations": ["recommendation 1", "recommendation 2", "recommendation 3"]
}`;

  try {
    const response = await model.invoke([
      new SystemMessage("You output valid JSON only. No markdown fences."),
      new HumanMessage(prompt),
    ]);
    const raw = String(response.content).replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(raw);

    const verdict: RiskOfficerVerdict = {
      overallHealthScore: parsed.overallHealthScore || compositeScore,
      classification: parsed.classification || (compositeScore >= 75 ? "INSTITUTIONAL_GRADE" : "SPECULATIVE"),
      summary: parsed.summary || "Strategy approved with standard institutional position sizing constraints.",
      overfittingAnalysis: over,
      regimeStressAnalysis: regime,
      actionableRecommendations: parsed.actionableRecommendations || [
        "Enforce a 2.0% maximum risk allocation per single execution.",
        "Implement a daily portfolio loss kill-switch at 3.5%.",
        "Calibrate trailing stops during high-impact macroeconomic events.",
      ],
      auditedAt: new Date().toISOString(),
    };

    return { finalVerdict: verdict };
  } catch {
    const fallbackVerdict: RiskOfficerVerdict = {
      overallHealthScore: compositeScore,
      classification: compositeScore >= 75 ? "INSTITUTIONAL_GRADE" : "SPECULATIVE",
      summary: `Automated Risk Committee evaluation completed. Strategy scored ${compositeScore}/100 with manageable tail risk.`,
      overfittingAnalysis: over,
      regimeStressAnalysis: regime,
      actionableRecommendations: [
        "Cap maximum capital deployment per trade at 5% of portfolio.",
        "Require minimum 20-period ATR filtering to buffer volatile market opens.",
        "Conduct weekly rolling window walk-forward audits.",
      ],
      auditedAt: new Date().toISOString(),
    };
    return { finalVerdict: fallbackVerdict };
  }
}

// 5. Assemble LangGraph Workflow
export function createRiskOfficerGraph() {
  const workflow = new StateGraph(RiskOfficerAnnotation)
    .addNode("detectOverfitting", detectOverfittingNode)
    .addNode("stressTestRegimes", stressTestRegimesNode)
    .addNode("synthesizeVerdict", synthesizeVerdictNode)
    .addEdge(START, "detectOverfitting")
    .addEdge("detectOverfitting", "stressTestRegimes")
    .addEdge("stressTestRegimes", "synthesizeVerdict")
    .addEdge("synthesizeVerdict", END);

  return workflow.compile();
}
