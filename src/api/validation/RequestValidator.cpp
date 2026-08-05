#include "api/validation/RequestValidator.hpp"

#include <stdexcept>


void RequestValidator::validateBacktestRequest(
    const nlohmann::json& body)
{
    const std::vector<std::string> requiredFields =
    {
        "strategy",
        "csvFile",
        "initialCash",
        "commission",
        "stopLossPercent",
        "takeProfitPercent"
    };


    for(const auto& field : requiredFields)
    {
        if(!body.contains(field))
        {
            throw std::runtime_error(
                "Missing field: " + field);
        }
    }


    if(body.at("initialCash").get<double>() <= 0)
    {
        throw std::runtime_error(
            "Initial cash must be greater than zero");
    }


    if(body.at("commission").get<double>() < 0)
    {
        throw std::runtime_error(
            "Commission cannot be negative");
    }
}