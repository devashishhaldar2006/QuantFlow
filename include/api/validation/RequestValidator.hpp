#pragma once

#include <nlohmann/json.hpp>

class RequestValidator {
public:
    static void validateBacktestRequest(const nlohmann::json& body);
};