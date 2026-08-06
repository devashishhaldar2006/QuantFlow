#include "strategy/BollingerStrategy.hpp"

#include <stdexcept>
#include <cmath>

BollingerStrategy::BollingerStrategy(
    std::size_t period,
    double multiplier)
    : bollingerBands_(period, multiplier),
      period_(period),
      multiplier_(multiplier)
{
    if (period_ == 0)
    {
        throw std::invalid_argument(
            "Period must be greater than zero.");
    }
    if (multiplier_ <= 0.0)
    {
        throw std::invalid_argument(
            "Multiplier must be greater than zero.");
    }
}

Signal BollingerStrategy::onCandle(
    const Candle &candle)
{
    closes_.push_back(candle.getClose());

    if (closes_.size() < period_)
    {
        return Signal::Hold;
    }

    const auto bands =
        bollingerBands_.calculate(closes_);

    const double upper =
        bands.upper.back();

    const double lower =
        bands.lower.back();

    const double price =
        candle.getClose();

    if (std::isnan(upper) ||
        std::isnan(lower))
    {
        return Signal::Hold;
    }

    if (price < lower)
    {
        return Signal::Buy;
    }

    if (price > upper)
    {
        return Signal::Sell;
    }

    return Signal::Hold;
}