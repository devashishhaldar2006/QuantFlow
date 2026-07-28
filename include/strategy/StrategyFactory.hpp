#pragma once

#include <memory>

#include "config/Config.hpp"
#include "strategy/Strategy.hpp"

class StrategyFactory
{
public:
    static std::unique_ptr<Strategy> create(const Config& config);
};