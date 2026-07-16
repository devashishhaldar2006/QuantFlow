#pragma once

#include "market/Candle.hpp"
#include "strategy/Signal.hpp"

class Strategy
{
public:
    virtual ~Strategy() = default;

    virtual Signal onCandle(const Candle& candle) = 0;
};