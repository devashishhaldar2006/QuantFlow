#pragma once

#include <deque>

#include "strategy/Strategy.hpp"

class MovingAverageStrategy : public Strategy
{
private:
    int fastPeriod_;
    int slowPeriod_;

    double fastSum_;
    double slowSum_;

    std::deque<double> fastPrices_;
    std::deque<double> slowPrices_;
    
    bool wasFastAboveSlow_;
    bool hasPreviousState_;

    double fastMovingAverage() const;
    double slowMovingAverage() const;


public:
    explicit MovingAverageStrategy(int fastPeriod, int slowPeriod);

    Signal onCandle(const Candle &candle) override;
};