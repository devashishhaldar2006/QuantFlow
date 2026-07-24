#pragma once

#include "portfolio/Portfolio.hpp"

class PerformanceAnalyzer
{
private:
    const Portfolio &portfolio_;

public:
    explicit PerformanceAnalyzer(const Portfolio &portfolio);

    double finalPortfolioValue() const;

    double netProfit() const;

    int totalTrades() const;

    double totalReturnPercent() const;

    int winningTrades() const;

    int losingTrades() const;

    double winRate() const;

    void printReport() const;
};