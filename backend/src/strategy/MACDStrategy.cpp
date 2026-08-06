#include "strategy/MACDStrategy.hpp"

#include <cmath>
#include <stdexcept>

MACDStrategy::MACDStrategy(
    std::size_t fastPeriod,
    std::size_t slowPeriod,
    std::size_t signalPeriod)
    : macd_(fastPeriod, slowPeriod, signalPeriod),
      fastPeriod_(fastPeriod),
      slowPeriod_(slowPeriod),
      signalPeriod_(signalPeriod),
      wasMACDAboveSignal_(false),
      hasPreviousState_(false)
{
    if (fastPeriod == 0)
    {
        throw std::invalid_argument(
            "Fast MACD period must be greater than zero.");
    }

    if (slowPeriod == 0)
    {
        throw std::invalid_argument(
            "Slow MACD period must be greater than zero.");
    }

    if (signalPeriod == 0)
    {
        throw std::invalid_argument(
            "Signal MACD period must be greater than zero.");
    }

    if (fastPeriod >= slowPeriod)
    {
        throw std::invalid_argument(
            "Fast MACD period must be less than slow MACD period.");
    }
}

Signal MACDStrategy::onCandle(
    const Candle &candle)
{
    closes_.push_back(candle.getClose());

    if (closes_.size() < slowPeriod_)
    {
        return Signal::Hold;
    }
    const auto result =
        macd_.calculate(closes_);

    const double latestMACD =
        result.macd.back();

    const double latestSignal =
        result.signal.back();

    if (std::isnan(latestMACD) ||
        std::isnan(latestSignal))
    {
        return Signal::Hold;
    }

    const bool isMACDAboveSignal =
        latestMACD > latestSignal;

    if (!hasPreviousState_)
    {
        wasMACDAboveSignal_ =
            isMACDAboveSignal;

        hasPreviousState_ = true;

        return Signal::Hold;
    }

    if (!wasMACDAboveSignal_ &&
        isMACDAboveSignal)
    {
        wasMACDAboveSignal_ = true;

        return Signal::Buy;
    }

    if (wasMACDAboveSignal_ &&
        !isMACDAboveSignal)
    {
        wasMACDAboveSignal_ = false;

        return Signal::Sell;
    }

    wasMACDAboveSignal_ =
        isMACDAboveSignal;

    return Signal::Hold;
}