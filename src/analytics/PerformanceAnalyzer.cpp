#include "analytics/PerformanceAnalyzer.hpp"

PerformanceAnalyzer::PerformanceAnalyzer(Portfolio &portfolio) : portfolio_(portfolio)
{
}

double PerformanceAnalyzer::finalPortfolioValue() const
{
    return portfolio_.totalValue();
}

double PerformanceAnalyzer::netProfit() const
{
    return finalPortfolioValue() - portfolio_.initialCash();
}

int PerformanceAnalyzer::totalTrades() const
{
    return static_cast<int>(portfolio_.getTrades().size());
}
