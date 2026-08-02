#include "strategy/StrategyFactory.hpp"

#include <memory>
#include <stdexcept>

#include "strategy/AlwaysHoldStrategy.hpp"
#include "strategy/MovingAverageCrossStrategy.hpp"
#include "strategy/RSIStrategy.hpp"
#include "strategy/EMACrossStrategy.hpp"
#include "strategy/MACDStrategy.hpp"
#include "strategy/BollingerStrategy.hpp"
#include "strategy/ATRFilterStrategy.hpp"

std::unique_ptr<Strategy>
StrategyFactory::create(const Config &config)
{
    if (config.strategy == "MovingAverageCross")
    {
        return std::make_unique<MovingAverageCrossStrategy>(
            config.shortMAPeriod,
            config.longMAPeriod);
    }

    if (config.strategy == "AlwaysHold")
    {
        return std::make_unique<AlwaysHoldStrategy>();
    }

    if (config.strategy == "RSI")
    {
        return std::make_unique<RSIStrategy>(
            config.rsiPeriod,
            config.oversold,
            config.overbought);
    }

    if (config.strategy == "EMACross")
    {
        return std::make_unique<EMACrossStrategy>(
            config.fastEMAPeriod,
            config.slowEMAPeriod);
    }

    if (config.strategy == "MACD")
    {
        return std::make_unique<MACDStrategy>(
            config.macdFastPeriod,
            config.macdSlowPeriod,
            config.macdSignalPeriod);
    }

    if (config.strategy == "Bollinger")
    {
        return std::make_unique<BollingerStrategy>(
            config.bollingerPeriod,
            config.bollingerMultiplier);
    }

    if (config.strategy == "ATRFilter")
    {
        return std::make_unique<ATRFilterStrategy>(
            config.atrPeriod,
            config.minimumATR);
    }

    throw std::runtime_error(
        "Unknown strategy: " + config.strategy);
}