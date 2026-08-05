#pragma once

#include <nlohmann/json.hpp>
struct BacktestResult
{
    double initialCapital = 0.0;
    double finalEquity = 0.0;

    double netProfit = 0.0;
    double totalReturnPercent = 0.0;

    int totalTrades = 0;
    int winningTrades = 0;
    int losingTrades = 0;

    double winRatePercent = 0.0;

    double averageWin = 0.0;
    double averageLoss = 0.0;

    double largestWin = 0.0;
    double largestLoss = 0.0;

    double maximumDrawdown = 0.0;
    double profitFactor = 0.0;

    double expectancy = 0.0;

    double annualizedReturn = 0.0;
    double annualizedVolatility = 0.0;
    double sharpeRatio = 0.0;

    nlohmann::json toJson() const;
};