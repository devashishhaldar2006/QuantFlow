#include "market/Candle.hpp"
#include <stdexcept>
Candle::Candle(const std::string& timestamp,
               double open,
               double high,
               double low,
               double close,
               long long volume)
    : timestamp_(timestamp),
      open_(open),
      high_(high),
      low_(low),
      close_(close),
      volume_(volume)
{
    validate();
}

void Candle::validate() const
{
    if (timestamp_.empty())
    {
        throw std::invalid_argument("Timestamp cannot be empty.");
    }

    if (volume_ < 0)
    {
        throw std::invalid_argument("Volume cannot be negative.");
    }

    if (open_ < 0)
    {
        throw std::invalid_argument("Open price cannot be negative.");
    }

    if (high_ < 0)
    {
        throw std::invalid_argument("High price cannot be negative.");
    }

    if (low_ < 0)
    {
        throw std::invalid_argument("Low price cannot be negative.");
    }

    if (close_ < 0)
    {
        throw std::invalid_argument("Close price cannot be negative.");
    }

    if (low_ > high_)
    {
        throw std::invalid_argument("Low price cannot be greater than high price.");
    }

    if (open_ < low_ || open_ > high_)
    {
        throw std::invalid_argument("Open price must lie between low and high.");
    }

    if (close_ < low_ || close_ > high_)
    {
        throw std::invalid_argument("Close price must lie between low and high.");
    }
}

const std::string& Candle::getTimestamp() const
{
    return timestamp_;
}

double Candle::getOpen() const
{
    return open_;
}

double Candle::getHigh() const
{
    return high_;
}

double Candle::getLow() const
{
    return low_;
}

double Candle::getClose() const
{
    return close_;
}

long long Candle::getVolume() const
{
    return volume_;
}