#pragma once

#include <string>

struct Config
{
    std::string csvFile;

    std::string strategy;

    double initialCash;

    double commission;

    double stopLossPercent;

    double takeProfitPercent;

    double slippage;

    int shortMAPeriod;

    int longMAPeriod;
};