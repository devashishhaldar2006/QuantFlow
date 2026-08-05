#include "api/services/BacktestService.hpp"

#include "api/dto/BacktestRequest.hpp"
#include "config/Config.hpp"
#include "io/CSVParser.hpp"
#include "market/MarketData.hpp"
#include "strategy/StrategyFactory.hpp"
#include "execution/ExecutionEngine.hpp"
#include "portfolio/Portfolio.hpp"
#include "risk/PositionSizer.hpp"
#include "risk/RiskManager.hpp"
#include "engine/BacktestEngine.hpp"

#include <iostream>

BacktestResult BacktestService::run(
    const BacktestRequest &request)
{
    Config config;

    config.csvFile = request.csvFile;
    config.strategy = request.strategy;
    config.initialCash = request.initialCash;
    config.commission = request.commission;
    config.stopLossPercent = request.stopLossPercent;
    config.takeProfitPercent = request.takeProfitPercent;
    config.shortMAPeriod =
    request.shortMAPeriod;
    config.longMAPeriod =
    request.longMAPeriod;

    MarketData marketData =
        CSVParser::parse(config.csvFile);

    auto strategy = StrategyFactory::create(config);

    Portfolio portfolio(
        config.initialCash,
        config.commission,
        config.stopLossPercent,
        config.takeProfitPercent);

    PositionSizer positionSizer;

    ExecutionEngine executionEngine(
        portfolio,
        positionSizer,
        config.slippage);

    RiskManager riskManager(
        portfolio);

    BacktestEngine engine(
        marketData,
        *strategy,
        executionEngine,
        portfolio,
        riskManager);
    engine.run();

    BacktestResult result;

    result.initialCash =
        config.initialCash;

    result.finalValue =
        portfolio.totalValue();

    result.trades =
        static_cast<int>(
            portfolio.getTrades().size());

    return result;
}
