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

    // SMA Strategy
    int shortMAPeriod;
    int longMAPeriod;

    // RSI Strategy
    int rsiPeriod = 14;
    double oversold = 30.0;
    double overbought = 70.0;

    // EMA Cross Strategy
    int fastEMAPeriod = 10;
    int slowEMAPeriod = 20;

    // MACD Strategy
    int macdFastPeriod = 12;
    int macdSlowPeriod = 26;
    int macdSignalPeriod = 9;

    // Bollinger Bands Strategy
    int bollingerPeriod = 20;
    double bollingerMultiplier = 2.0;

    // ATR Filter Strategy
    int atrPeriod = 14;
    double minimumATR = 1.0;
};