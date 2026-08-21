#pragma once

#include <string>
#include <vector>

#include <nlohmann/json.hpp>

struct StrategyInfo
{
    std::string name;
    std::string category;
    std::string description;
    std::vector<std::string> parameters;

    nlohmann::json toJson() const;
};