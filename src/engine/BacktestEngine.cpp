#include "engine/BacktestEngine.hpp"

BacktestEngine::BacktestEngine(const MarketData& marketData,
                               Strategy& strategy)
    : iterator_(marketData),
      strategy_(strategy)
{
}

void BacktestEngine::run()
{
    while (iterator_.hasNext())
    {
        const Candle& candle = iterator_.current();

        Signal signal = strategy_.onCandle(candle);

        (void)signal;

        iterator_.next();
    }
}