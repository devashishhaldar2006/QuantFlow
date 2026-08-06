#include "strategy/ATRFilterStrategy.hpp"

#include <cmath>
#include <stdexcept>

ATRFilterStrategy::ATRFilterStrategy(
    std::size_t period,
    double minimumATR)
    : atr_(period),
      period_(period),
      minimumATR_(minimumATR)
{
    if (period_ == 0)
    {
        throw std::invalid_argument(
            "Period must be greater than zero.");
    }

    if (minimumATR_ <= 0.0)
    {
        throw std::invalid_argument(
            "Minimum ATR must be greater than zero.");
    }
}

Signal ATRFilterStrategy::onCandle(
    const Candle& candle)
{
    highs_.push_back(candle.getHigh());
    lows_.push_back(candle.getLow());
    closes_.push_back(candle.getClose());

    if (highs_.size() < period_ + 1)
    {
        return Signal::Hold;
    }

    const auto atrValues =
        atr_.calculate(
            highs_,
            lows_,
            closes_);

    const double latestATR =
        atrValues.back();

    if (std::isnan(latestATR))
    {
        return Signal::Hold;
    }

    if (latestATR < minimumATR_)
    {
        return Signal::Hold;
    }

    return Signal::Buy;
}