#include "api/controllers/BacktestController.hpp"

#include "api/dto/BacktestRequest.hpp"
#include "api/services/BacktestService.hpp"
#include <nlohmann/json.hpp>
#include "api/dto/BacktestResult.hpp"
#include <iostream>

using json = nlohmann::json;

void BacktestController::registerRoutes(
    httplib::Server &server)
{
    server.Post(
        "/backtest",
        handleBacktest);
}

void BacktestController::handleBacktest(
    const httplib::Request &req,
    httplib::Response &res)
{
    try
    {
        json body = json::parse(req.body);

        BacktestRequest request;
        request.strategy = body.at("strategy");
        request.csvFile = body.at("csvFile");
        request.initialCash = body.at("initialCash");
        request.commission = body.at("commission");
        request.stopLossPercent = body.at("stopLossPercent");
        request.takeProfitPercent = body.at("takeProfitPercent");
        request.shortMAPeriod =
            body.value("shortMAPeriod", 10);
        request.longMAPeriod =
            body.value("longMAPeriod", 20);

        BacktestService service;

        std::cout << "Starting backtest\n";

        BacktestResult result =
            service.run(request);

        std::cout << "Backtest completed\n";

        json response;
        response["initialCapital"] = result.initialCapital;
        response["finalEquity"] = result.finalEquity;
        response["netProfit"] = result.netProfit;
        response["totalReturnPercent"] = result.totalReturnPercent;

        response["totalTrades"] = result.totalTrades;
        response["winningTrades"] = result.winningTrades;
        response["losingTrades"] = result.losingTrades;
        response["winRatePercent"] = result.winRatePercent;

        response["maximumDrawdown"] = result.maximumDrawdown;
        response["profitFactor"] = result.profitFactor;
        response["expectancy"] = result.expectancy;

        response["annualizedReturn"] = result.annualizedReturn;
        response["annualizedVolatility"] = result.annualizedVolatility;
        response["sharpeRatio"] = result.sharpeRatio;
        res.set_content(
            response.dump(4),
            "application/json");
    }
    catch (const json::exception &e)
    {
        std::cout << "JSON Exception: " << e.what() << '\n';
        res.status = 400;
        res.set_content(std::string("Invalid Request: ") + e.what(), "text/plain");
    }
    catch (const std::exception &e)
    {
        std::cout << "Exception: " << e.what() << '\n';

        res.status = 500;
        res.set_content(e.what(), "text/plain");
    }
}