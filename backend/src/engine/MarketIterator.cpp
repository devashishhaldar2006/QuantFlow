#include "engine/MarketIterator.hpp"
#include <stdexcept>

MarketIterator::MarketIterator(const MarketData& marketData)
    : marketData_(marketData),
      currentIndex_(0)
{
}

bool MarketIterator::hasNext() const
{
    return currentIndex_ < marketData_.size();
}

const Candle& MarketIterator::current() const
{
    if (currentIndex_ >= marketData_.size())
    {
        throw std::out_of_range("Current index is out of range.");
    }
    return marketData_.getCandle(currentIndex_);
}

void MarketIterator::next()
{
    if (hasNext())
    {
        ++currentIndex_;
    }
}

void MarketIterator::reset()
{
    currentIndex_ = 0;
}

std::size_t MarketIterator::currentIndex() const
{
    return currentIndex_;
}