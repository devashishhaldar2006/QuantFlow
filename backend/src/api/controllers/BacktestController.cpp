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
    catch (const json::exception &ex)
    {
        // Malformed JSON — client error
        std::cerr
            << "JSON parse error: "
            << ex.what()
            << '\n';

        res.status = 400;

        json error;
        error["error"] = "Invalid JSON: check syntax and field types";
        error["detail"] = ex.what();

        res.set_content(
            error.dump(),
            "application/json");
    }
    catch (const std::invalid_argument &ex)
    {
        // Validation failures thrown as invalid_argument — client error
        std::cerr
            << "Validation error: "
            << ex.what()
            << '\n';

        res.status = 400;

        json error;
        error["error"] = ex.what();

        res.set_content(
            error.dump(),
            "application/json");
    }
    catch (const std::runtime_error &ex)
    {
        // runtime_error can come from validation OR internals.
        // Re-use 400 for validation messages (thrown by RequestValidator),
        // but internal infra errors (CSVParser, engine) also surface here.
        // A cleaner split would use a custom ValidationError type; for now
        // we keep 400 for runtime_error as it's always request-driven.
        std::cerr
            << "Request error: "
            << ex.what()
            << '\n';

        res.status = 400;

        json error;
        error["error"] = ex.what();

        res.set_content(
            error.dump(),
            "application/json");
    }
    catch (const std::exception &ex)
    {
        // Unexpected server-side failure (bad_alloc, etc.) — 500
        std::cerr
            << "Internal server error: "
            << ex.what()
            << '\n';

        res.status = 500;

        res.set_content(
            R"({"error":"Internal server error"})",
            "application/json");
    }
}
