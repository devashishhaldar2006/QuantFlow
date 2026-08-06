#include "indicators/BollingerBands.hpp"

#include <cmath>
#include <limits>
#include <stdexcept>

BollingerBands::BollingerBands(std::size_t period, double multiplier)
    : period_(period), multiplier_(multiplier)
{
    if (period == 0)
    {
        throw std::invalid_argument(
            "Bollinger Bands period must be greater than zero.");
    }

    if (multiplier <= 0.0)
    {
        throw std::invalid_argument(
            "Bollinger Bands multiplier must be greater than zero.");
    }
}

BollingerBandsResult BollingerBands::calculate(
    const std::vector<double>& prices) const
{
    const double NaN = std::numeric_limits<double>::quiet_NaN();

    BollingerBandsResult result;

    result.upper = std::vector<double>(prices.size(), NaN);
    result.middle = std::vector<double>(prices.size(), NaN);
    result.lower = std::vector<double>(prices.size(), NaN);

    if (prices.size() < period_)
    {
        return result;
    }

    for (std::size_t i = period_ - 1; i < prices.size(); ++i)
    {
        const std::size_t windowStart = i + 1 - period_;

        double sum = 0.0;

        for (std::size_t j = windowStart; j <= i; ++j)
        {
            sum += prices[j];
        }

        const double mean = sum / static_cast<double>(period_);

        double varianceSum = 0.0;

        for (std::size_t j = windowStart; j <= i; ++j)
        {
            const double difference = prices[j] - mean;
            varianceSum += difference * difference;
        }

        const double standardDeviation =
            std::sqrt(varianceSum / static_cast<double>(period_));

        result.middle[i] = mean;
        result.upper[i] = mean + multiplier_ * standardDeviation;
        result.lower[i] = mean - multiplier_ * standardDeviation;
    }

    return result;
}