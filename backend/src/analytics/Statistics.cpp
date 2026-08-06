#include "analytics/Statistics.hpp"

#include <numeric>
#include <stdexcept>
#include <cmath>

std::vector<double> Statistics::calculateReturns(
    const std::vector<double> &equityCurve)
{

    if (equityCurve.size() < 2)
    {
        return {};
    }

    std::vector<double> returns;

    returns.reserve(equityCurve.size() - 1);

    for (size_t i = 1; i < equityCurve.size(); ++i)
    {
        if (equityCurve[i - 1] == 0.0)
        {
            returns.push_back(0.0);
        }
        else
        {
            double returnValue =
                (equityCurve[i] - equityCurve[i - 1]) /
                equityCurve[i - 1];

            returns.push_back(returnValue);
        }
    }

    return returns;
}

double Statistics::mean(const std::vector<double> &data)
{
    if (data.empty())
    {
        throw std::invalid_argument("Cannot calculate mean of empty data");
    }

    double sum = std::accumulate(data.begin(), data.end(), 0.0);

    return sum / static_cast<double>(data.size());
}
double Statistics::standardDeviation(
    const std::vector<double> &data)
{
    if (data.size() < 2)
    {
        throw std::invalid_argument(
            "At least two observations are required.");
    }

    const double meanValue = mean(data);
    double sumSquaredDiff = 0.0;

    for (const auto &value : data)
    {
        const double diff = value - meanValue;
        sumSquaredDiff += diff * diff;
    }

    return std::sqrt(
    sumSquaredDiff /
    static_cast<double>(data.size() - 1));
}

double Statistics::annualizedVolatility(
    const std::vector<double> &returns,
    int tradingDays)
{
    if (tradingDays <= 0)
    {
        throw std::invalid_argument(
            "Trading days must be positive.");
    }
    const double stdDev = standardDeviation(returns);

    return stdDev * std::sqrt(static_cast<double>(tradingDays));
}

double Statistics::annualizedReturn(
    const std::vector<double> &returns,
    int tradingDays)
{
    if (tradingDays <= 0)
    {
        throw std::invalid_argument(
            "Trading days must be positive.");
    }

    const double meanReturn = mean(returns);

    return meanReturn * static_cast<double>(tradingDays);
}

double Statistics::sharpeRatio(
    const std::vector<double> &returns,
    double riskFreeRate,
    int tradingDays)
{
    if (tradingDays <= 0)
    {
        throw std::invalid_argument(
            "Trading days must be positive.");
    }

    const double annualizedReturnValue =
        annualizedReturn(returns, tradingDays);

    const double annualizedVolatilityValue =
        annualizedVolatility(returns, tradingDays);

    constexpr double EPS = 1e-12;

    if (annualizedVolatilityValue < EPS)
    {
        throw std::runtime_error(
            "Annualized volatility is zero, cannot calculate Sharpe ratio.");
    }

    return (annualizedReturnValue - riskFreeRate) /
           annualizedVolatilityValue;
}