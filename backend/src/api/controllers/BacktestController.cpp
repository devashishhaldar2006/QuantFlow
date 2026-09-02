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
    // ── Content-Type guard ────────────────────────────────────────────────
    const std::string contentType =
        req.get_header_value("Content-Type");

    if (contentType.find("application/json") == std::string::npos)
    {
        res.status = 415;
        res.set_content(
            R"({"error":"Content-Type must be application/json"})",
            "application/json");
        return;
    }

    // ── Empty body guard ──────────────────────────────────────────────────
    if (req.body.empty())
    {
        res.status = 400;
        res.set_content(
            R"({"error":"Request body is empty"})",
            "application/json");
        return;
    }

    // ── Phase 1: parse + validate (client errors → 400) ──────────────────
    json body;
    BacktestRequest request;

    try
    {
        body = json::parse(req.body);
        RequestValidator::validateBacktestRequest(body);
        request = BacktestRequest::fromJson(body);
    }
    catch (const json::exception &ex)
    {
        std::cerr << "JSON parse error: " << ex.what() << '\n';

        res.status = 400;

        json error;
        error["error"]  = "Invalid JSON: check syntax and field types";
        error["detail"] = ex.what();

        res.set_content(error.dump(), "application/json");
        return;
    }
    catch (const std::exception &ex)
    {
        // Covers runtime_error from RequestValidator and any other
        // std::exception subclass thrown during parsing/validation.
        std::cerr << "Validation error: " << ex.what() << '\n';

        res.status = 400;

        json error;
        error["error"] = ex.what();

        res.set_content(error.dump(), "application/json");
        return;
    }

    // ── Phase 2: run backtest (server errors → 500) ───────────────────────
    try
    {
        BacktestService service;
        BacktestResult result = service.run(request);

        res.set_content(
            result.toJson().dump(4),
            "application/json");
    }
    catch (const std::exception &ex)
    {
        std::cerr << "Internal server error: " << ex.what() << '\n';

        res.status = 500;

        json error;
        error["error"]  = "Engine execution error";
        error["detail"] = ex.what();

        res.set_content(error.dump(), "application/json");
    }
}
