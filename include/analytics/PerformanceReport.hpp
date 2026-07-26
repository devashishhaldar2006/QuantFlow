#pragma once

struct PerformanceReport
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
};