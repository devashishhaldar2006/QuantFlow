#include "strategy/MovingAverageCrossStrategy.hpp"

#include <stdexcept>

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

Signal MovingAverageCrossStrategy::onCandle(const Candle& candle)
{
    fastSMA_.update(candle);
    slowSMA_.update(candle);

    if (!fastSMA_.isReady() || !slowSMA_.isReady())
    {
        return Signal::Hold;
    }

    const bool isFastAboveSlow =
        fastSMA_.value() > slowSMA_.value();

    if (!hasPreviousState_)
    {
        wasFastAboveSlow_ = isFastAboveSlow;
        hasPreviousState_ = true;
        return Signal::Hold;
    }

    if (!wasFastAboveSlow_ && isFastAboveSlow)
    {
        wasFastAboveSlow_ = true;
        return Signal::Buy;
    }

    if (wasFastAboveSlow_ && !isFastAboveSlow)
    {
        wasFastAboveSlow_ = false;
        return Signal::Sell;
    }

    return Signal::Hold;
}