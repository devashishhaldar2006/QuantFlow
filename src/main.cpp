#include <iostream>

#include "io/CSVParser.hpp"
#include "engine/BacktestEngine.hpp"
#include "portfolio/Portfolio.hpp"
#include "strategy/MovingAverageStrategy.hpp"
#include "analytics/PerformanceAnalyzer.hpp"

int main()
{
    try
    {
        // Load market data from CSV file
        MarketData marketData = CSVParser::parse("data/sample.csv");

        // Create strategy
        MovingAverageStrategy strategy(5, 20);

        // Create portfolio with ₹100,000 initial cash
        Portfolio portfolio(100000.0, 20.0);

        // Create backtest engine
        BacktestEngine engine(
            marketData,
            strategy,
            portfolio,
            0.001);
        // Run the backtest
        engine.run();

        // Analyze and print performance
        PerformanceAnalyzer analyzer(portfolio);
        analyzer.printReport();

        // Print trade history
        std::cout << "\n========== TRADE HISTORY ==========\n";

        for (const Trade& trade : portfolio.getTrades())
        {
            std::cout
                << trade.getTimestamp()
                << " | "
                << (trade.getSide() == TradeSide::Buy ? "BUY " : "SELL")
                << " | Qty: " << trade.getQuantity()
                << " | Price: " << trade.getPrice()
                << '\n';
        }
    }
    catch (const std::exception& e)
    {
        std::cerr << "Error: " << e.what() << '\n';
        return 1;
    }

    return 0;
}