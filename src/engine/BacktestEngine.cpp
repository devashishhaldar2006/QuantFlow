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
            {
                const int quantity = positionSizer_.calculatePositionSize(portfolio_, price);

                if (quantity > 0)
                {
                    portfolio_.buy(quantity, price, candle.getTimestamp());
                }
                break;
            }
            case Signal::Sell:
            {
                const int quantity = portfolio_.position();

                if (quantity > 0)
                {
                    portfolio_.sell(quantity, price, candle.getTimestamp());
                }
                break;
            }
            case Signal::Hold:
                // Do nothing
                break;
            }
        }
        catch (const std::exception &e)
        {
            std::cout << e.what() << '\n';
        }
        portfolio_.recordEquity();
        iterator_.next();
    }
}