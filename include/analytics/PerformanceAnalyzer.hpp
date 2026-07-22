#pragma once

#include "portfolio/Portfolio.hpp"

class PerformanceAnalyzer
{
private:
    Portfolio &portfolio_;

public:
    explicit PerformanceAnalyzer(Portfolio &portfolio);

    double finalPortfolioValue() const;

    double netProfit() const;

    int totalTrades() const;
};