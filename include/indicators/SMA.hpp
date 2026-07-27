#pragma once

#include "indicators/Indicator.hpp"

#include <deque>

class SMA : public Indicator
{
private:
    std::size_t period_;
    
    std::deque<double> prices_;

    double runningSum_;
    double currentValue_;

public:
    explicit SMA(std::size_t period);

    void update(const Candle &candle) override;

    double value() const override;

    bool isReady() const override;
};