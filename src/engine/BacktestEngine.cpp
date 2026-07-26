#include "engine/BacktestEngine.hpp"

#include <iostream>

BacktestEngine::BacktestEngine(const MarketData &marketData, Strategy &strategy, Portfolio &portfolio, double slippage)
    : iterator_(marketData),
      strategy_(strategy),
      portfolio_(portfolio),
      slippage_(slippage)
{
}

void BacktestEngine::run()
{
    while (iterator_.hasNext())
    {
        try
        {
            const Candle &candle = iterator_.current();

            const double price = candle.getClose();

            portfolio_.updateMarketPrice(price);

            // Check stop loss before asking the strategy
            if (portfolio_.position() > 0)
            {
                const double stopPrice = portfolio_.stopLossPrice();
                const double takeProfitPrice = portfolio_.takeProfitPrice();

                double exitPrice = 0.0;

                if (candle.getLow() <= stopPrice)
                {
                    exitPrice = stopPrice;
                }
                else if (candle.getHigh() >= takeProfitPrice)
                {
                    exitPrice = takeProfitPrice;
                }

                if (exitPrice > 0.0)
                {
                    const int quantity = portfolio_.position();

                    const double executionPrice =
                        calculateSellPrice(exitPrice);

                    portfolio_.sell(
                        quantity,
                        executionPrice,
                        candle.getTimestamp());

                    portfolio_.recordEquity();
                    iterator_.next();
                    continue;
                }
            }

            const Signal signal = strategy_.onCandle(candle);

            switch (signal)
            {
            case Signal::Buy:
            {
                const double executionPrice =
                    calculateBuyPrice(price);

                const int quantity =
                    positionSizer_.calculatePositionSize(
                        portfolio_,
                        executionPrice);

                if (quantity > 0)
                {
                    portfolio_.buy(
                        quantity,
                        executionPrice,
                        candle.getTimestamp());
                }

                break;
            }

            case Signal::Sell:
            {
                const int quantity =
                    portfolio_.position();

                if (quantity > 0)
                {
                    const double executionPrice =
                        calculateSellPrice(price);

                    portfolio_.sell(
                        quantity,
                        executionPrice,
                        candle.getTimestamp());
                }

                break;
            }

            case Signal::Hold:
                break;
            }

            portfolio_.recordEquity();
        }
        catch (const std::exception &e)
        {
            std::cout << e.what() << '\n';
        }

        iterator_.next();
    }
}

double BacktestEngine::calculateBuyPrice(double marketPrice) const
{
    return marketPrice * (1.0 + slippage_);
}

double BacktestEngine::calculateSellPrice(double marketPrice) const
{
    return marketPrice * (1.0 - slippage_);
}