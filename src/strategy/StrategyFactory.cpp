#include "strategy/StrategyFactory.hpp"

#include <memory>
#include <stdexcept>

#include "strategy/MovingAverageCrossStrategy.hpp"
#include "strategy/AlwaysHoldStrategy.hpp"

std::unique_ptr<Strategy>
StrategyFactory::create(const Config& config)
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

    throw std::runtime_error(
        "Unknown strategy: " + config.strategy);
}