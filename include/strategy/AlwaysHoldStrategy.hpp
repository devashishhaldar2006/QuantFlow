#pragma once

#include "strategy/Strategy.hpp"

class AlwaysHoldStrategy : public Strategy
{
public:
    Signal onCandle(const Candle& candle) override;
};