#include <iostream>

#include "config/ConfigParser.hpp"

#include "io/CSVParser.hpp"

#include "market/MarketData.hpp"

#include "portfolio/Portfolio.hpp"

#include "engine/BacktestEngine.hpp"

#include "strategy/StrategyFactory.hpp"

#include "execution/ExecutionEngine.hpp"

#include "risk/PositionSizer.hpp"
#include "risk/RiskManager.hpp"

#include "analytics/PerformanceAnalyzer.hpp"
#include "analytics/PerformanceReport.hpp"

#include "reporting/ConsoleReporter.hpp"


int main()
{
    try
    {
        Config config =
            ConfigParser::parse("config/config.json");


        MarketData marketData =
            CSVParser::parse(config.csvFile);


        Portfolio portfolio(
            config.initialCash,
            config.commission,
            config.stopLossPercent,
            config.takeProfitPercent);


        auto strategy =
            StrategyFactory::create(config);


        PositionSizer positionSizer;


        ExecutionEngine executionEngine(
            portfolio,
            positionSizer,
            config.slippage
        );


        RiskManager riskManager(
            portfolio
        );


        BacktestEngine engine(
            marketData,
            *strategy,
            executionEngine,
            portfolio,
            riskManager
        );


        engine.run();


        PerformanceAnalyzer analyzer(portfolio);

        PerformanceReport report =
            analyzer.analyze();


        ConsoleReporter::print(report);
    }
    catch (const std::exception& e)
    {
        std::cerr
            << "Error: "
            << e.what()
            << '\n';

        return 1;
    }


    return 0;
}