#include "engine/BacktestEngine.hpp"

#include <iostream>

BacktestEngine::BacktestEngine(
    const MarketData& marketData,
    Strategy& strategy,
    ExecutionEngine& executionEngine,
    Portfolio& portfolio)
    : iterator_(marketData),
      strategy_(strategy),
      executionEngine_(executionEngine),
      portfolio_(portfolio)
{
}

void BacktestEngine::run()
{
    while (iterator_.hasNext())
    {
        try
        {
            const Candle& candle = iterator_.current();

            portfolio_.updateMarketPrice(candle.getClose());

            Signal signal = strategy_.onCandle(candle);

            executionEngine_.execute(signal, candle);

            portfolio_.recordEquity();

            iterator_.next();
        }
        catch (const std::exception& e)
        {
            std::cout << e.what() << '\n';
            iterator_.next();
        }
    }
}