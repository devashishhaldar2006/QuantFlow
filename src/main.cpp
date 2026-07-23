#include <iostream>

#include "io/CSVParser.hpp"
#include "engine/BacktestEngine.hpp"
#include "portfolio/Portfolio.hpp"
#include "strategy/MovingAverageStrategy.hpp"

int main()
{
    try
    {
        // Load market data from CSV file
        MarketData marketData = CSVParser::parse("data/sample.csv");

        // create strategy
        MovingAverageStrategy strategy(5, 20);

        // create portfolio with 100,000 cash
        Portfolio portfolio(100000.0);

        // create backtest engine
        BacktestEngine engine(
            marketData,
            strategy,
            portfolio);

        engine.run();

        // Print summary
        std::cout << "\n========== BACKTEST SUMMARY ==========\n";
        std::cout << "Initial Cash : " << portfolio.initialCash() << '\n';
        std::cout << "Cash         : " << portfolio.cash() << '\n';
        std::cout << "Position     : " << portfolio.position() << '\n';
        std::cout << "Total Value  : " << portfolio.totalValue() << '\n';
        std::cout << "Trades       : " << portfolio.getTrades().size() << '\n';

        std::cout << "\n========== TRADES ==========\n";

        for (const Trade &trade : portfolio.getTrades())
        {
            std::cout
                << trade.getTimestamp()
                << " | "
                << (trade.getSide() == TradeSide::Buy ? "BUY " : "SELL")
                << " | Qty: " << trade.getQuantity()
                << " | Price: " << trade.getPrice()
                << '\n';
        }
        std::cout << "Profit/Loss  : "
                  << portfolio.totalValue() - portfolio.initialCash()
                  << '\n';
        }
    catch (const std::exception &e)
    {
        std::cerr << "Error: " << e.what() << '\n';
        return 1;
    }
    return 0;
}