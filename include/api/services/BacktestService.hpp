#pragma once

#include "api/dto/BacktestRequest.hpp"

class BacktestService
{
public:
    void run(const BacktestRequest& request);
};