#include "reporting/ConsoleReporter.hpp"

#include <iomanip>
#include <iostream>

void ConsoleReporter::print(const PerformanceReport &report)
{
    std::cout << std::fixed << std::setprecision(2);

    std::cout << "========== BACKTEST REPORT ==========\n";

    std::cout << "Initial Capital : " << report.initialCapital << '\n';
    std::cout << "Final Equity    : " << report.finalEquity << '\n';
    std::cout << "Net Profit      : " << report.netProfit << '\n';
    std::cout << "Return (%)      : " << report.totalReturnPercent << "%\n";

    std::cout << '\n';

    std::cout << "Total Trades    : " << report.totalTrades << '\n';
    std::cout << "Winning Trades  : " << report.winningTrades << '\n';
    std::cout << "Losing Trades   : " << report.losingTrades << '\n';
    std::cout << "Win Rate (%)    : " << report.winRatePercent << "%\n";
    std::cout << "Profit Factor   : "
              << report.profitFactor
              << '\n';
    std::cout << "Expectancy      : "
              << report.expectancy
              << '\n';

    std::cout << '\n';

    std::cout << "Average Win     : " << report.averageWin << '\n';
    std::cout << "Average Loss    : " << report.averageLoss << '\n';
    std::cout << "Largest Win     : " << report.largestWin << '\n';
    std::cout << "Largest Loss    : " << report.largestLoss << '\n';

    std::cout << '\n';

    std::cout << "Max Drawdown    : " << report.maximumDrawdown << "%\n";

    std::cout << "=====================================\n";
}