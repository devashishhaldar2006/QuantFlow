#include "engine/BacktestEngine.hpp"

#include <iostream>

BacktestEngine::BacktestEngine(const MarketData &marketData, Strategy &strategy, Portfolio &portfolio)
    : iterator_(marketData),
      strategy_(strategy),
      portfolio_(portfolio)
{
}

void BacktestEngine::run()
{
    while (iterator_.hasNext())
    {
        const Candle &candle = iterator_.current();

        const double price = candle.getClose();

        portfolio_.updateMarketPrice(price);

        const Signal signal = strategy_.onCandle(candle);

        try
        {
            switch (signal)
            {
            case Signal::Buy:
                portfolio_.buy(1, price);
                break;
            case Signal::Sell:
                portfolio_.sell(1, price);
                break;
            case Signal::Hold:
                // Do nothing
                break;
            }
        }
        catch (const std::exception &e)
        {
            std::cout << e.what() << '\n';
        }
        iterator_.next();
    }
}