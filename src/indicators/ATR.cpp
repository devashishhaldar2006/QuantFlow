#include "indicators/ATR.hpp"

#include <stdexcept>
#include <limits>
#include <algorithm>
#include <cmath>

ATR::ATR(std::size_t period)
    : period_(period)
{
    if (period == 0)
    {
        throw std::invalid_argument(
            "ATR period must be greater than zero.");
    }
}
std::vector<double> ATR::calculate(
    const std::vector<double> &highs,
    const std::vector<double> &lows,
    const std::vector<double> &closes) const
{
    constexpr double NaN =
        std::numeric_limits<double>::quiet_NaN();

    std::vector<double> atr(
        highs.size(),
        NaN);

    // All vectors must have the same size.
    if (highs.size() != lows.size() ||
        highs.size() != closes.size())
    {
        throw std::invalid_argument(
            "High, low, and close vectors must have the same size.");
    }

    // Not enough data to calculate ATR.
    if (highs.size() < period_ + 1)
    {
        return atr;
    }

    // Compute True Range (TR).
    std::vector<double> trueRanges(highs.size(), NaN);

    for (std::size_t i = 1; i < highs.size(); ++i)
    {
        const double highLow =
            highs[i] - lows[i];

        const double highPrevClose =
            std::abs(highs[i] - closes[i - 1]);

        const double lowPrevClose =
            std::abs(lows[i] - closes[i - 1]);

        trueRanges[i] = std::max(
            {highLow,
             highPrevClose,
             lowPrevClose});
    }

    // Compute first ATR (Simple Average of first period True Ranges)
    double sum = 0.0;

    for (std::size_t i = 1; i <= period_; ++i)
    {
        sum += trueRanges[i];
    }

    atr[period_] =
        sum /
        static_cast<double>(period_);

    // Wilder's smoothing
    for (std::size_t i = period_ + 1;
         i < trueRanges.size();
         ++i)
    {
        atr[i] =
            (atr[i - 1] *
                 static_cast<double>(period_ - 1) +
             trueRanges[i]) /
            static_cast<double>(period_);
    }

    return atr;
}
