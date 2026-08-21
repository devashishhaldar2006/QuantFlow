#include "api/dto/BacktestRequest.hpp"

BacktestRequest BacktestRequest::fromJson(
    const nlohmann::json& body)
{
    BacktestRequest request;

    request.strategy =
        body.at("strategy").get<std::string>();

    request.csvFile =
        body.at("csvFile").get<std::string>();

    request.initialCash =
        body.at("initialCash").get<double>();

    request.commission =
        body.at("commission").get<double>();

    request.stopLossPercent =
        body.at("stopLossPercent").get<double>();

    request.takeProfitPercent =
        body.at("takeProfitPercent").get<double>();

    // Moving Average Cross
    request.shortMAPeriod =
        body.value("shortMAPeriod", 10);

    request.longMAPeriod =
        body.value("longMAPeriod", 20);

    // RSI
    request.rsiPeriod =
        body.value("rsiPeriod", 14);

    request.oversold =
        body.value("oversold", 30.0);

    request.overbought =
        body.value("overbought", 70.0);

    // EMA Cross
    request.fastEMAPeriod =
        body.value("fastEMAPeriod", 10);

    request.slowEMAPeriod =
        body.value("slowEMAPeriod", 20);

    // MACD
    request.macdFastPeriod =
        body.value("macdFastPeriod", 12);

    request.macdSlowPeriod =
        body.value("macdSlowPeriod", 26);

    request.macdSignalPeriod =
        body.value("macdSignalPeriod", 9);

    // Bollinger Bands
    request.bollingerPeriod =
        body.value("bollingerPeriod", 20);

    request.bollingerMultiplier =
        body.value("bollingerMultiplier", 2.0);

    // ATR Filter
    request.atrPeriod =
        body.value("atrPeriod", 14);

    request.minimumATR =
        body.value("minimumATR", 1.0);

    return request;
}