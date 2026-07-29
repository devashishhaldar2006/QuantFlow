#pragma once

#include "market/Candle.hpp"
#include "portfolio/Portfolio.hpp"
#include "risk/ExitDecision.hpp"

class RiskManager
{
public:
    explicit RiskManager(Portfolio& portfolio);

    ExitDecision evaluate(const Candle& candle) const;

private:
    Portfolio& portfolio_;
};