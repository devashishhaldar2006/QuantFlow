#pragma once

#include <string>
#include <nlohmann/json.hpp>

struct BacktestRequest
{
    std::string strategy;
    std::string csvFile;

    double initialCash      = 0.0;
    double commission       = 0.0;
    double stopLossPercent  = 0.0;
    double takeProfitPercent = 0.0;

    int shortMAPeriod = 10;
    int longMAPeriod = 20;


    static BacktestRequest fromJson(
        const nlohmann::json& body);
};