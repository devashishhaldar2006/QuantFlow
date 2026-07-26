#pragma once

#include "market/Candle.hpp"

class Indicator
{
public:
    virtual ~Indicator() = default;

    virtual void update(const Candle& candle) = 0;

    virtual double value() const = 0;

    virtual bool isReady() const = 0;
};