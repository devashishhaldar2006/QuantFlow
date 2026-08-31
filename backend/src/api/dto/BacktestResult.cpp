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

    json equityCurveJson = json::array();

    for (const auto &point : this->equityCurve)
    {
        equityCurveJson.push_back({{"timestamp", point.timestamp},
                                   {"equity", point.equity}});
    }

    response["equityCurve"] = equityCurveJson;

    json tradesJson = json::array();

    for (const auto &trade : this->trades)
    {
        tradesJson.push_back({{"timestamp", trade.timestamp},
                              {"side", trade.side},
                              {"quantity", trade.quantity},
                              {"executionPrice", trade.executionPrice},
                              {"commission", trade.commission},
                              {"cashFlow", trade.cashFlow}});
    }

    response["trades"] = tradesJson;

    return response;
}