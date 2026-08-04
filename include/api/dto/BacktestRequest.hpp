#pragma once

#include <string>

struct BacktestRequest
{
    std::string strategy;

    std::string csvFile;

    double initialCash;

    double commission;

    double stopLossPercent;

    double takeProfitPercent;
};