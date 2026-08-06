#include "strategy/AlwaysHoldStrategy.hpp"

Signal AlwaysHoldStrategy::onCandle(const Candle&)
{
    return Signal::Hold;
}