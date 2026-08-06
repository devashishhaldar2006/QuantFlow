#include "indicators/SMA.hpp"

#include <limits>
#include <stdexcept>

SMA::SMA(std::size_t period)
    : period_(period)
{
    if (period_ == 0)
    {
        throw std::invalid_argument(
            "SMA period must be greater than zero.");
    }
}

std::vector<double> SMA::calculate(
    const std::vector<double>& prices) const
{
    const double NaN =
        std::numeric_limits<double>::quiet_NaN();

    std::vector<double> sma(
        prices.size(),
        NaN);

    if (prices.size() < period_)
    {
        return sma;
    }

    double sum = 0.0;

    for (std::size_t i = 0; i < period_; ++i)
    {
        sum += prices[i];
    }

    sma[period_ - 1] =
        sum / static_cast<double>(period_);

    for (std::size_t i = period_; i < prices.size(); ++i)
    {
        sum += prices[i];
        sum -= prices[i - period_];

        sma[i] =
            sum / static_cast<double>(period_);
    }

    return sma;
}