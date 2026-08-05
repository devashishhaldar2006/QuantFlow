#include "api/controllers/BacktestController.hpp"

#include "api/dto/BacktestRequest.hpp"
#include "api/services/BacktestService.hpp"
#include <nlohmann/json.hpp>

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
    json body =
        json::parse(req.body);

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
    json response;

    response["strategy"] = request.strategy;
    response["csvFile"] = request.csvFile;
    response["initialCash"] = request.initialCash;
    response["commission"] = request.commission;
    response["stopLossPercent"] = request.stopLossPercent;
    response["takeProfitPercent"] = request.takeProfitPercent;

    try
    {
        BacktestService service;
        service.run(request);

        res.set_content(
            response.dump(4),
            "application/json");
    }
    catch (const std::exception &e)
    {
        std::cout << "Exception: " << e.what() << '\n';

        res.status = 500;
        res.set_content(e.what(), "text/plain");
    }
}