#include "indicators/RSI.hpp"

#include <cmath>
#include <limits>
#include <stdexcept>

RSI::RSI(std::size_t period)
    : period_(period)
{
    if (period == 0)
    {
        throw std::invalid_argument(
            "RSI period must be greater than zero.");
    }
}

std::vector<double> RSI::calculate(
    const std::vector<double> &prices) const
{
    if (prices.size() <= period_)
    {
        return std::vector<double>(
            prices.size(),
            std::numeric_limits<double>::quiet_NaN());
    }

    std::vector<double> rsiValues(
        prices.size(),
        std::numeric_limits<double>::quiet_NaN());

    auto calculateRSI = [](double averageGain, double averageLoss)
    {
        constexpr double EPS = 1e-12;

        if (averageLoss < EPS)
        {
            return 100.0;
        }

        const double rs = averageGain / averageLoss;

        return 100.0 - (100.0 / (1.0 + rs));
    };

    std::vector<double> gains;
    std::vector<double> losses;

    gains.reserve(prices.size() - 1);
    losses.reserve(prices.size() - 1);

    for (std::size_t i = 1; i < prices.size(); ++i)
    {
        const double change = prices[i] - prices[i - 1];

        if (change > 0.0)
        {
            gains.push_back(change);
            losses.push_back(0.0);
        }
        else
        {
            gains.push_back(0.0);
            losses.push_back(std::abs(change));
        }
    }

    double averageGain = 0.0;
    double averageLoss = 0.0;

    for (std::size_t i = 0; i < period_; ++i)
    {
        averageGain += gains[i];
        averageLoss += losses[i];
    }

    averageGain /= static_cast<double>(period_);
    averageLoss /= static_cast<double>(period_);

    // First RSI value
    rsiValues[period_] = calculateRSI(averageGain, averageLoss);

    // Wilder's smoothing
    for (std::size_t i = period_; i < gains.size(); ++i)
    {
        averageGain =
            ((averageGain * static_cast<double>(period_ - 1)) + gains[i]) /
            static_cast<double>(period_);

        averageLoss =
            ((averageLoss * static_cast<double>(period_ - 1)) + losses[i]) /
            static_cast<double>(period_);

        rsiValues[i + 1] = calculateRSI(averageGain, averageLoss);
    }

    return rsiValues;
}