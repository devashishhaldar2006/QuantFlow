#include "indicators/MACD.hpp"

#include <cmath>
#include <limits>
#include <stdexcept>

MACD::MACD(
    std::size_t fastPeriod,
    std::size_t slowPeriod,
    std::size_t signalPeriod)
    : fastPeriod_(fastPeriod),
      slowPeriod_(slowPeriod),
      signalPeriod_(signalPeriod)
{
    if (fastPeriod == 0)
    {
        throw std::invalid_argument(
            "Fast EMA period must be greater than zero.");
    }

    if (slowPeriod == 0)
    {
        throw std::invalid_argument(
            "Slow EMA period must be greater than zero.");
    }

    if (signalPeriod == 0)
    {
        throw std::invalid_argument(
            "Signal EMA period must be greater than zero.");
    }

    if (fastPeriod >= slowPeriod)
    {
        throw std::invalid_argument(
            "Fast EMA period must be less than slow EMA period.");
    }
}

MACDResult MACD::calculate(
    const std::vector<double>& prices) const
{
    EMA fastEMA(fastPeriod_);
    EMA slowEMA(slowPeriod_);
    EMA signalEMA(signalPeriod_);

    const auto fast =
        fastEMA.calculate(prices);

    const auto slow =
        slowEMA.calculate(prices);

    const double NaN =
        std::numeric_limits<double>::quiet_NaN();

    MACDResult result;

    result.macd =
        std::vector<double>(prices.size(), NaN);

    result.signal =
        std::vector<double>(prices.size(), NaN);

    result.histogram =
        std::vector<double>(prices.size(), NaN);

    // MACD Line
    for (std::size_t i = 0; i < prices.size(); ++i)
    {
        if (std::isnan(fast[i]) ||
            std::isnan(slow[i]))
        {
            continue;
        }

        result.macd[i] =
            fast[i] - slow[i];
    }

    // Signal Line
    result.signal =
        signalEMA.calculate(result.macd);

    // Histogram
    for (std::size_t i = 0; i < prices.size(); ++i)
    {
        if (std::isnan(result.macd[i]) ||
            std::isnan(result.signal[i]))
        {
            continue;
        }

        result.histogram[i] =
            result.macd[i] -
            result.signal[i];
    }

    return result;
}