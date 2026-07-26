#include "indicators/SMA.hpp"

#include <stdexcept>

SMA::SMA(int period) : period_(period), runningSum_(0.0), currentValue_(0.0)
{
    if (period <= 0)
    {
        throw std::invalid_argument("SMA period must be greater than zero.");
    }
}

void SMA::update(const Candle &candle)
{
    double price = candle.getClose();

    prices_.push_back(price);
    runningSum_ += price;

    if (prices_.size() > period_)
    {
        runningSum_ -= prices_.front();
        prices_.pop_front();
    }

    if (isReady())
    {
        currentValue_ = runningSum_ / period_;
    }
}

double SMA::value() const
{
    return currentValue_;
}

bool SMA::isReady() const
{
    return prices_.size() == period_;
}
