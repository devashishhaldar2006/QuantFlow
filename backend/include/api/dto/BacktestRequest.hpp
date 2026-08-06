#pragma once

#include <string>
#include <nlohmann/json.hpp>

struct BacktestRequest
{
    std::string strategy;
    std::string csvFile;

    double initialCash;
    double commission;
    double stopLossPercent;
    double takeProfitPercent;

    int shortMAPeriod = 10;
    int longMAPeriod = 20;


    static BacktestRequest fromJson(
        const nlohmann::json& body);
};