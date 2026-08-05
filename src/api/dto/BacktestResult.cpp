#include "api/dto/BacktestResult.hpp"

#include <nlohmann/json.hpp>

using json = nlohmann::json;

json BacktestResult::toJson() const
{
    json response;

    response["initialCapital"] = initialCapital;
    response["finalEquity"] = finalEquity;
    response["netProfit"] = netProfit;
    response["totalReturnPercent"] = totalReturnPercent;

    response["totalTrades"] = totalTrades;
    response["winningTrades"] = winningTrades;
    response["losingTrades"] = losingTrades;
    response["winRatePercent"] = winRatePercent;

    response["averageWin"] = averageWin;
    response["averageLoss"] = averageLoss;

    response["largestWin"] = largestWin;
    response["largestLoss"] = largestLoss;

    response["maximumDrawdown"] = maximumDrawdown;
    response["profitFactor"] = profitFactor;
    response["expectancy"] = expectancy;

    response["annualizedReturn"] = annualizedReturn;
    response["annualizedVolatility"] = annualizedVolatility;
    response["sharpeRatio"] = sharpeRatio;

    return response;
}