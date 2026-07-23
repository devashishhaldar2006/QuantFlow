#include "strategy/MovingAverageStrategy.hpp"

#include <stdexcept>

MovingAverageStrategy::MovingAverageStrategy(int fastPeriod, int slowPeriod)
    : fastPeriod_(fastPeriod),
      slowPeriod_(slowPeriod),
      fastSum_(0.0),
      slowSum_(0.0),
      wasFastAboveSlow_(false),
      hasPreviousState_(false)
{
    if (fastPeriod <= 0 || slowPeriod <= 0)
    {
        throw std::invalid_argument("Periods must be positive integers.");
    }

    if (fastPeriod >= slowPeriod)
    {
        throw std::invalid_argument(
            "Fast period must be less than slow period.");
    }
}

Signal MovingAverageStrategy::onCandle(const Candle &candle)
{
    const double closePrice = candle.getClose();

    fastPrices_.push_back(closePrice);
    fastSum_ += closePrice;

    if (fastPrices_.size() > static_cast<size_t>(fastPeriod_))
    {
        fastSum_ -= fastPrices_.front();
        fastPrices_.pop_front();
    }

    slowPrices_.push_back(closePrice);
    slowSum_ += closePrice;

    if (slowPrices_.size() > static_cast<size_t>(slowPeriod_))
    {
        slowSum_ -= slowPrices_.front();
        slowPrices_.pop_front();
    }

    if (slowPrices_.size() < static_cast<size_t>(slowPeriod_))
    {
        return Signal::Hold;
    }

    const bool isFastAboveSlow =
        fastMovingAverage() > slowMovingAverage();

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

double MovingAverageStrategy::fastMovingAverage() const
{
    return fastSum_ / static_cast<double>(fastPrices_.size());
}

double MovingAverageStrategy::slowMovingAverage() const
{
    return slowSum_ / static_cast<double>(slowPrices_.size());
}
