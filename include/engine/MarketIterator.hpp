#pragma once

#include <cstddef>

#include "market/MarketData.hpp"

class MarketIterator
{
private:
    const MarketData& marketData_;
    std::size_t currentIndex_;

public:
    explicit MarketIterator(const MarketData& marketData);

    bool hasNext() const;

    const Candle& current() const;

    void next();

    void reset();

    std::size_t currentIndex() const;
};