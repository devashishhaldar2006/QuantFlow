#pragma once

#include <vector>
#include <cstddef>

#include "market/Candle.hpp"

class MarketData
{
private:
    std::vector<Candle> candles_;

public:
    MarketData() = default;

    void addCandle(const Candle& candle);

    const Candle& getCandle(std::size_t index) const;

    std::size_t size() const;

    bool empty() const;
};