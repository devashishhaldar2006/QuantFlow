#pragma once

#include <string>
#include <vector>

#include <nlohmann/json_fwd.hpp>
#include "portfolio/EquityPoint.hpp"
struct TradeResult
{
    std::string timestamp;
    std::string side;

    int quantity = 0;

    double executionPrice = 0.0;
    double commission = 0.0;
    double cashFlow = 0.0;
};

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

    std::vector<EquityPoint> equityCurve;
    std::vector<TradeResult> trades;

    nlohmann::json toJson() const;
};