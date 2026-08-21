#pragma once

#include <memory>
#include <string>
#include <vector>

#include "config/Config.hpp"
#include "strategy/Strategy.hpp"

class StrategyFactory
{
public:
    static std::unique_ptr<Strategy> create(
        const Config& config);

    static std::vector<std::string> availableStrategies();
};