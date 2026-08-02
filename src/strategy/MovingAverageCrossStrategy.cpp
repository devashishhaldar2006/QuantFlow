#include "strategy/MovingAverageCrossStrategy.hpp"

#include <stdexcept>
#include <cmath>

MovingAverageCrossStrategy::MovingAverageCrossStrategy(
    int fastPeriod,
    int slowPeriod)
    : fastSMA_(fastPeriod),
      slowSMA_(slowPeriod),
      wasFastAboveSlow_(false),
      hasPreviousState_(false)
{
    if (fastPeriod >= slowPeriod)
    {
        throw std::invalid_argument(
            "Fast period must be less than slow period.");
    }
}

Signal MovingAverageCrossStrategy::onCandle(
    const Candle &candle)
{
    closes_.push_back(candle.getClose());

    const auto fast =
        fastSMA_.calculate(closes_);

    const auto slow =
        slowSMA_.calculate(closes_);

    const double fastValue =
        fast.back();

    const double slowValue =
        slow.back();

    if (std::isnan(fastValue) ||
        std::isnan(slowValue))
    {
        return Signal::Hold;
    }

    const bool isFastAboveSlow =
        fastValue > slowValue;

    if (!hasPreviousState_)
    {
        wasFastAboveSlow_ = isFastAboveSlow;
        hasPreviousState_ = true;

        return Signal::Hold;
    }

    if (!wasFastAboveSlow_ &&
        isFastAboveSlow)
    {
        wasFastAboveSlow_ = true;
        return Signal::Buy;
    }

    if (wasFastAboveSlow_ &&
        !isFastAboveSlow)
    {
        wasFastAboveSlow_ = false;
        return Signal::Sell;
    }

    wasFastAboveSlow_ = isFastAboveSlow;

    return Signal::Hold;
}