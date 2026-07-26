#include <iostream>

#include "io/CSVParser.hpp"

#include "market/MarketData.hpp"

#include "portfolio/Portfolio.hpp"

#include "engine/BacktestEngine.hpp"

#include "strategy/MovingAverageCrossStrategy.hpp"

#include "analytics/PerformanceAnalyzer.hpp"
#include "analytics/PerformanceReport.hpp"

#include "reporting/ConsoleReporter.hpp"

int main()
{
    try
    {
        MarketData marketData =
            CSVParser::parse("data/sample.csv");

        Portfolio portfolio(10000.0);

        MovingAverageCrossStrategy strategy(10, 20);

        BacktestEngine engine(
            marketData,
            strategy,
            portfolio);

        engine.run();

        PerformanceAnalyzer analyzer(portfolio);

        PerformanceReport report = analyzer.analyze();

        ConsoleReporter::print(report);
    }
    catch (const std::exception& e)
    {
        std::cerr << "Error: " << e.what() << '\n';
        return 1;
    }

    return 0;
}