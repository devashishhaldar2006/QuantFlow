#pragma once

#include <string>

struct Config
{
    std::string csvFile;

    double initialCash;

    double commission;

    double stopLossPercent;

    double takeProfitPercent;

    int shortMAPeriod;

    int longMAPeriod;
};