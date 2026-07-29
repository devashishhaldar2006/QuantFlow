#include "execution/ExecutionEngine.hpp"

ExecutionEngine::ExecutionEngine(
    Portfolio& portfolio,
    PositionSizer& positionSizer,
    double slippage)
    : portfolio_(portfolio),
      positionSizer_(positionSizer),
      slippage_(slippage)
{
}

void ExecutionEngine::execute(
    Signal signal,
    const Candle& candle)
{
    double marketPrice = candle.getClose();
    std::string timestamp = candle.getTimestamp();

    switch (signal)
    {
        case Signal::Buy:
        {
            int quantity =
                positionSizer_.calculatePositionSize(portfolio_, marketPrice);

            if (quantity > 0)
            {
                portfolio_.buy(
                    quantity,
                    calculateBuyPrice(marketPrice),
                    timestamp);
            }
            break;
        }

        case Signal::Sell:
        {
            int quantity =
                positionSizer_.calculatePositionSize(portfolio_, marketPrice);

            if (quantity > 0)
            {
                portfolio_.sell(
                    quantity,
                    calculateSellPrice(marketPrice),
                    timestamp);
            }
            break;
        }

        case Signal::Hold:
            break;
    }
}

double ExecutionEngine::calculateBuyPrice(double marketPrice) const
{
    return marketPrice * (1.0 + slippage_);
}

double ExecutionEngine::calculateSellPrice(double marketPrice) const
{
    return marketPrice * (1.0 - slippage_);
}