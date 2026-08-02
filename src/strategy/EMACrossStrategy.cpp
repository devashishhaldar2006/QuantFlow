#include "strategy/EMACrossStrategy.hpp"

#include <cmath>
#include <stdexcept>

EMACrossStrategy::EMACrossStrategy(
    std::size_t fastPeriod,
    std::size_t slowPeriod)
    : fastEMA_(fastPeriod),
      slowEMA_(slowPeriod),
      fastPeriod_(fastPeriod),
      slowPeriod_(slowPeriod),
      wasFastAboveSlow_(false),
      hasPreviousState_(false)
{
    if (fastPeriod == 0)
    {
        throw std::invalid_argument(
            "Fast EMA period must be greater than zero.");
    }

    if (slowPeriod == 0)
    {
        throw std::invalid_argument(
            "Slow EMA period must be greater than zero.");
    }

    if (fastPeriod >= slowPeriod)
    {
        throw std::invalid_argument(
            "Fast EMA period must be less than slow EMA period.");
    }
}

Signal EMACrossStrategy::onCandle(
    const Candle &candle)
{
    closes_.push_back(candle.getClose());

    if (closes_.size() < slowPeriod_)
    {
        return Signal::Hold;
    }

    const auto fastValues =
        fastEMA_.calculate(closes_);

    const auto slowValues =
        slowEMA_.calculate(closes_);

    const double fast =
        fastValues.back();

    const double slow =
        slowValues.back();

    if (std::isnan(fast) ||
        std::isnan(slow))
    {
        return Signal::Hold;
    }

    const bool isFastAboveSlow =
        fast > slow;

    if (!hasPreviousState_)
    {
        wasFastAboveSlow_ = isFastAboveSlow;
        hasPreviousState_ = true;

        return Signal::Hold;
    }

    // Bullish crossover
    if (!wasFastAboveSlow_ &&
        isFastAboveSlow)
    {
        wasFastAboveSlow_ = true;
        return Signal::Buy;
    }

    // Bearish crossover
    if (wasFastAboveSlow_ &&
        !isFastAboveSlow)
    {
        wasFastAboveSlow_ = false;
        return Signal::Sell;
    }

    wasFastAboveSlow_ = isFastAboveSlow;

    return Signal::Hold;
}