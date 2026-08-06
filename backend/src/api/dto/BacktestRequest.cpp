#include "api/dto/BacktestRequest.hpp"

BacktestRequest BacktestRequest::fromJson(
    const nlohmann::json& body)
{
    BacktestRequest request;

    request.strategy =
        body.at("strategy");

    request.csvFile =
        body.at("csvFile");

    request.initialCash =
        body.at("initialCash");

    request.commission =
        body.at("commission");

    request.stopLossPercent =
        body.at("stopLossPercent");

    request.takeProfitPercent =
        body.at("takeProfitPercent");

    request.shortMAPeriod =
        body.value("shortMAPeriod", 10);

    request.longMAPeriod =
        body.value("longMAPeriod", 20);

    return request;
}