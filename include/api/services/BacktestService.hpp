#pragma once

#include "api/dto/BacktestRequest.hpp"
#include "api/dto/BacktestResult.hpp"

class BacktestService
{
public:
    BacktestResult run(
    const BacktestRequest& request);
};