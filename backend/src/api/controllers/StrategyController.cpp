#include "api/controllers/StrategyController.hpp"

#include "api/dto/StrategyInfo.hpp"
#include "strategy/StrategyFactory.hpp"

#include <nlohmann/json.hpp>

#include <string>
#include <unordered_map>
#include <vector>

using json = nlohmann::json;

namespace
{

const std::unordered_map<std::string, StrategyInfo> strategyMetadata = {
    {
        "MovingAverageCross",
        {
            "MovingAverageCross",
            "Trend",
            "Trend-following strategy based on the crossover of short and long simple moving averages.",
            {
                "Short MA Period",
                "Long MA Period"
            }
        }
    },
    {
        "EMACross",
        {
            "EMACross",
            "Trend",
            "Trend-following strategy using fast and slow exponential moving average crossovers.",
            {
                "Fast EMA Period",
                "Slow EMA Period"
            }
        }
    },
    {
        "RSI",
        {
            "RSI",
            "Momentum",
            "Momentum strategy that generates signals from overbought and oversold RSI conditions.",
            {
                "RSI Period",
                "Oversold",
                "Overbought"
            }
        }
    },
    {
        "MACD",
        {
            "MACD",
            "Momentum",
            "Momentum and trend strategy based on MACD and signal-line crossovers.",
            {
                "Fast MACD Period",
                "Slow MACD Period",
                "Signal Period"
            }
        }
    },
    {
        "Bollinger",
        {
            "Bollinger",
            "Volatility",
            "Volatility-based strategy using Bollinger Band price deviations.",
            {
                "Bollinger Period",
                "Standard Deviation Multiplier"
            }
        }
    },
    {
        "ATRFilter",
        {
            "ATRFilter",
            "Volatility",
            "Volatility-filtered strategy that uses Average True Range to control trading conditions.",
            {
                "ATR Period",
                "ATR Threshold"
            }
        }
    },
    {
        "AlwaysHold",
        {
            "AlwaysHold",
            "Passive",
            "Passive benchmark strategy that maintains a buy-and-hold position.",
            {}
        }
    }
};

}

void StrategyController::registerRoutes(
    httplib::Server& server)
{
    server.Get(
        "/strategies",
        handleStrategies);
}

void StrategyController::handleStrategies(
    const httplib::Request&,
    httplib::Response& res)
{
    json response = json::array();

    const std::vector<std::string> strategies =
        StrategyFactory::availableStrategies();

    for (const std::string& strategyName : strategies)
    {
        const auto it =
            strategyMetadata.find(strategyName);

        if (it == strategyMetadata.end())
        {
            continue;
        }

        response.push_back(
            it->second.toJson());
    }

    res.set_content(
        response.dump(4),
        "application/json");
}