#pragma once

#include <string>

#include "market/Candle.hpp"
#include "order/Order.hpp"
#include "portfolio/Portfolio.hpp"
#include "risk/PositionSizer.hpp"
#include "strategy/Signal.hpp"

class ExecutionEngine
{
public:
    ExecutionEngine(
        Portfolio &portfolio,
        PositionSizer &positionSizer,
        double slippage = 0.0);

    void execute(
        Signal signal,
        const Candle &candle);

private:
    double calculateBuyPrice(double marketPrice) const;
    double calculateSellPrice(double marketPrice) const;

    Portfolio &portfolio_;
    PositionSizer &positionSizer_;
    double slippage_;
};