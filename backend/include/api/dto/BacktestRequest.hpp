#pragma once

#include <string>

#include <nlohmann/json.hpp>

struct BacktestRequest
{
    std::string strategy;
    std::string csvFile;

    double initialCash = 0.0;
    double commission = 0.0;
    double stopLossPercent = 0.0;
    double takeProfitPercent = 0.0;

    // Moving Average Cross
    int shortMAPeriod = 10;
    int longMAPeriod = 20;

    // RSI
    int rsiPeriod = 14;
    double oversold = 30.0;
    double overbought = 70.0;

    // EMA Cross
    int fastEMAPeriod = 10;
    int slowEMAPeriod = 20;

    // MACD
    int macdFastPeriod = 12;
    int macdSlowPeriod = 26;
    int macdSignalPeriod = 9;

    // Bollinger Bands
    int bollingerPeriod = 20;
    double bollingerMultiplier = 2.0;

    // ATR Filter
    int atrPeriod = 14;
    double minimumATR = 1.0;

    static BacktestRequest fromJson(
        const nlohmann::json& body);
};