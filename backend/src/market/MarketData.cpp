#include "market/MarketData.hpp"

#include <stdexcept>

void MarketData::addCandle(const Candle& candle)
{
    candles_.push_back(candle);
}

const Candle& MarketData::getCandle(std::size_t index) const
{
    if (index >= candles_.size())
    {
        throw std::out_of_range("Index out of bounds");
    }
    return candles_[index];
}

std::size_t MarketData::size() const
{
    return candles_.size();
}

bool MarketData::empty() const
{
    return candles_.empty();
}