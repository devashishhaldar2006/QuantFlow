#include "api/controllers/BacktestController.hpp"

#include "api/dto/BacktestRequest.hpp"
#include "api/dto/BacktestResult.hpp"
#include "api/services/BacktestService.hpp"
#include "api/validation/RequestValidator.hpp"

#include <nlohmann/json.hpp>
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
        json body =
            json::parse(req.body);

        RequestValidator::validateBacktestRequest(body);

        BacktestRequest request =
            BacktestRequest::fromJson(body);

        BacktestService service;

        BacktestResult result =
            service.run(request);

        res.set_content(
            result.toJson().dump(4),
            "application/json");
    }
    catch (const json::exception &e)
    {
        std::cout
            << "JSON Exception: "
            << e.what()
            << '\n';

        res.status = 400;

        res.set_content(
            R"({"error":"Invalid JSON request"})",
            "application/json");
    }
    catch (const std::exception &e)
    {
        std::cout
            << "Exception: "
            << e.what()
            << '\n';

        res.status = 400;

        json error;

        error["error"] =
            e.what();

        res.set_content(
            error.dump(4),
            "application/json");
    }
}
