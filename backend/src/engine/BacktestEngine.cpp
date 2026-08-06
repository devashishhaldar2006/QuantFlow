#include "engine/BacktestEngine.hpp"

BacktestEngine::BacktestEngine(
    const MarketData &marketData,
    Strategy &strategy,
    ExecutionEngine &executionEngine,
    Portfolio &portfolio,
    RiskManager &riskManager)
    : iterator_(marketData),
      strategy_(strategy),
      executionEngine_(executionEngine),
      portfolio_(portfolio),
      riskManager_(riskManager)
{
}

void BacktestEngine::run()
{
    while (iterator_.hasNext())
    {
        const Candle &candle = iterator_.current();

        portfolio_.updateMarketPrice(
            candle.getClose());

        const ExitDecision exitDecision =
            riskManager_.evaluate(candle);

        if (exitDecision.shouldExit)
        {
            executionEngine_.execute(
                exitDecision,
                candle);
        }
        else
        {
            Signal signal =
                strategy_.onCandle(candle);

            executionEngine_.execute(
                signal,
                candle);
        }

        portfolio_.recordEquity();

        iterator_.next();
    }
}