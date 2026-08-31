#include "strategy/StrategyFactory.hpp"

#include <functional>
#include <memory>
#include <stdexcept>
#include <string>
#include <unordered_map>
#include <vector>

#include "strategy/AlwaysHoldStrategy.hpp"
#include "strategy/ATRFilterStrategy.hpp"
#include "strategy/BollingerStrategy.hpp"
#include "strategy/EMACrossStrategy.hpp"
#include "strategy/MACDStrategy.hpp"
#include "strategy/MovingAverageCrossStrategy.hpp"
#include "strategy/RSIStrategy.hpp"

using StrategyCreator =
    std::function<std::unique_ptr<Strategy>(const Config&)>;

namespace
{
const std::unordered_map<std::string, StrategyCreator> creators = {
    {
        "MovingAverageCross",
        [](const Config& config)
        {
            return std::make_unique<MovingAverageCrossStrategy>(
                config.shortMAPeriod,
                config.longMAPeriod);
        }
    },
    {
        "AlwaysHold",
        [](const Config&)
        {
            return std::make_unique<AlwaysHoldStrategy>();
        }
    },
    {
        "RSI",
        [](const Config& config)
        {
            return std::make_unique<RSIStrategy>(
                config.rsiPeriod,
                config.oversold,
                config.overbought);
        }
    },
    {
        "EMACross",
        [](const Config& config)
        {
            return std::make_unique<EMACrossStrategy>(
                config.fastEMAPeriod,
                config.slowEMAPeriod);
        }
    },
    {
        "MACD",
        [](const Config& config)
        {
            return std::make_unique<MACDStrategy>(
                config.macdFastPeriod,
                config.macdSlowPeriod,
                config.macdSignalPeriod);
        }
    },
    {
        "Bollinger",
        [](const Config& config)
        {
            return std::make_unique<BollingerStrategy>(
                config.bollingerPeriod,
                config.bollingerMultiplier);
        }
    },
    {
        "ATRFilter",
        [](const Config& config)
        {
            return std::make_unique<ATRFilterStrategy>(
                config.atrPeriod,
                config.minimumATR);
        }
    }
};
}

std::unique_ptr<Strategy> StrategyFactory::create(
    const Config& config)
{
    const auto it = creators.find(config.strategy);

    if (it != creators.end())
    {
        return it->second(config);
    }

    throw std::runtime_error(
        "Unknown strategy: " + config.strategy);
}

std::vector<std::string> StrategyFactory::availableStrategies()
{
    return {
        "MovingAverageCross",
        "EMACross",
        "RSI",
        "MACD",
        "Bollinger",
        "ATRFilter",
        "AlwaysHold"
    };
}