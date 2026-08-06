#include "strategy/RSIStrategy.hpp"

RSIStrategy::RSIStrategy(
    std::size_t period,
    double oversold,
    double overbought)
    : rsi_(period),
      period_(period),
      oversold_(oversold),
      overbought_(overbought)
{
}

Signal RSIStrategy::onCandle(
    const Candle &candle)
{
    closes_.push_back(candle.getClose());

    if (closes_.size() <= period_)
    {
        return Signal::Hold;
    }

    const auto rsiValues =
        rsi_.calculate(closes_);

    const double latestRSI =
        rsiValues.back();

    if (latestRSI < oversold_)
    {
        return Signal::Buy;
    }

    if (latestRSI > overbought_)
    {
        return Signal::Sell;
    }

    return Signal::Hold;
}