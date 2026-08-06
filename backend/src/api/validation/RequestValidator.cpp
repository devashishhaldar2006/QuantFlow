#include "api/validation/RequestValidator.hpp"

#include <stdexcept>
#include <string>


void RequestValidator::validateBacktestRequest(
    const nlohmann::json& body)
{
    // ── Required field presence check ────────────────────────────────────
    const std::vector<std::string> requiredFields =
    {
        "strategy",
        "csvFile",
        "initialCash",
        "commission",
        "stopLossPercent",
        "takeProfitPercent"
    };

    for (const auto& field : requiredFields)
    {
        if (!body.contains(field))
        {
            throw std::runtime_error(
                "Missing required field: " + field);
        }
    }

    // ── Type checks (accept both int and float JSON numbers) ─────────────
    const std::vector<std::string> numericFields =
    {
        "initialCash",
        "commission",
        "stopLossPercent",
        "takeProfitPercent"
    };

    for (const auto& field : numericFields)
    {
        if (!body.at(field).is_number())
        {
            throw std::runtime_error(
                "Field '" + field + "' must be a number");
        }
    }

    if (body.contains("shortMAPeriod") &&
        !body.at("shortMAPeriod").is_number_integer())
    {
        throw std::runtime_error(
            "Field 'shortMAPeriod' must be an integer");
    }

    if (body.contains("longMAPeriod") &&
        !body.at("longMAPeriod").is_number_integer())
    {
        throw std::runtime_error(
            "Field 'longMAPeriod' must be an integer");
    }

    // ── Numeric range checks ─────────────────────────────────────────────
    const double initialCash =
        body.at("initialCash").get<double>();

    if (initialCash <= 0.0)
    {
        throw std::runtime_error(
            "initialCash must be greater than zero");
    }

    const double commission =
        body.at("commission").get<double>();

    if (commission < 0.0)
    {
        throw std::runtime_error(
            "commission cannot be negative");
    }

    const double stopLoss =
        body.at("stopLossPercent").get<double>();

    if (stopLoss < 0.0)
    {
        throw std::runtime_error(
            "stopLossPercent cannot be negative");
    }

    const double takeProfit =
        body.at("takeProfitPercent").get<double>();

    if (takeProfit < 0.0)
    {
        throw std::runtime_error(
            "takeProfitPercent cannot be negative");
    }

    // MA period cross-check (only when both are provided)
    if (body.contains("shortMAPeriod") && body.contains("longMAPeriod"))
    {
        const int shortMA = body.at("shortMAPeriod").get<int>();
        const int longMA  = body.at("longMAPeriod").get<int>();

        if (shortMA <= 0 || longMA <= 0)
        {
            throw std::runtime_error(
                "MA periods must be greater than zero");
        }

        if (shortMA >= longMA)
        {
            throw std::runtime_error(
                "shortMAPeriod must be less than longMAPeriod");
        }
    }

    // ── Security: reject path traversal in csvFile ───────────────────────
    if (!body.at("csvFile").is_string())
    {
        throw std::runtime_error(
            "Field 'csvFile' must be a string");
    }

    const std::string csvFile =
        body.at("csvFile").get<std::string>();

    if (csvFile.empty())
    {
        throw std::runtime_error(
            "csvFile path cannot be empty");
    }

    if (csvFile.size() > 256)
    {
        throw std::runtime_error(
            "csvFile path is too long (max 256 characters)");
    }

    if (csvFile.find("..") != std::string::npos)
    {
        throw std::runtime_error(
            "csvFile path must not contain '..'");
    }

    if (csvFile.front() == '/')
    {
        throw std::runtime_error(
            "csvFile must be a relative path");
    }

    // ── Strategy name must be a non-empty string ─────────────────────────
    if (!body.at("strategy").is_string())
    {
        throw std::runtime_error(
            "Field 'strategy' must be a string");
    }

    const std::string strategy =
        body.at("strategy").get<std::string>();

    if (strategy.empty())
    {
        throw std::runtime_error(
            "strategy name cannot be empty");
    }
}