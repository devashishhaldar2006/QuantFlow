#pragma once

#include <vector>

class Statistics
{
public:
    static std::vector<double> calculateReturns(
        const std::vector<double> &equityCurve);

    static double mean(const std::vector<double> &data);

    static double standardDeviation(
        const std::vector<double> &data);
    static double annualizedVolatility(
        const std::vector<double> &returns,
        int tradingDays = 252);
    static double annualizedReturn(
        const std::vector<double> &returns,
        int tradingDays = 252);

    static double sharpeRatio(
        const std::vector<double> &returns,
        double riskFreeRate = 0.0,
        int tradingDays = 252);
};