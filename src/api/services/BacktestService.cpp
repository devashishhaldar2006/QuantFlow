#include "api/services/BacktestService.hpp"

#include "api/dto/BacktestRequest.hpp"
#include "config/Config.hpp"
#include "io/CSVParser.hpp"
#include "market/MarketData.hpp"

#include <iostream>

void BacktestService::run(
    const BacktestRequest &request)
{
    Config config;

    config.csvFile = request.csvFile;
    config.strategy = request.strategy;
    config.initialCash = request.initialCash;
    config.commission = request.commission;
    config.stopLossPercent = request.stopLossPercent;
    config.takeProfitPercent = request.takeProfitPercent;

    MarketData marketData =
        CSVParser::parse(config.csvFile);
    std::cout
        << "Loaded "
        << marketData.size()
        << " candles\n";
}