#include <iostream>

#include <iomanip>

#include "analytics/PerformanceAnalyzer.hpp"

PerformanceAnalyzer::PerformanceAnalyzer(const Portfolio &portfolio) : portfolio_(portfolio)
{
}

double PerformanceAnalyzer::finalPortfolioValue() const
{
    return portfolio_.totalValue();
}

double PerformanceAnalyzer::netProfit() const
{
    return finalPortfolioValue() - portfolio_.initialCash();
}

int PerformanceAnalyzer::totalTrades() const
{
    return static_cast<int>(portfolio_.getTrades().size());
}

int PerformanceAnalyzer::winningTrades() const
{
    const auto &trades = portfolio_.getTrades();

    int winners = 0;
    const Trade *buyTrade = nullptr;

    for (const auto &trade : trades)
    {
        if (trade.getSide() == TradeSide::Buy)
        {
            buyTrade = &trade;
        }
        else if (trade.getSide() == TradeSide::Sell && buyTrade != nullptr)
        {
            double profit =
                (trade.getPrice() - buyTrade->getPrice()) *
                buyTrade->getQuantity();

            if (profit > 0)
            {
                winners++;
            }

            buyTrade = nullptr;
        }
    }

    return winners;
}

int PerformanceAnalyzer::losingTrades() const
{
    const auto &trades = portfolio_.getTrades();

    int losers = 0;
    const Trade *buyTrade = nullptr;

    for (const auto &trade : trades)
    {
        if (trade.getSide() == TradeSide::Buy)
        {
            buyTrade = &trade;
        }
        else if (trade.getSide() == TradeSide::Sell && buyTrade != nullptr)
        {
            double profit =
                (trade.getPrice() - buyTrade->getPrice()) *
                buyTrade->getQuantity();

            if (profit < 0)
            {
                losers++;
            }

            buyTrade = nullptr;
        }
    }

    return losers;
}

double PerformanceAnalyzer::winRate() const
{
    int winners = winningTrades();
    int losers = losingTrades();

    int completedTrades = winners + losers;

    if (completedTrades == 0)
    {
        return 0.0;
    }

    return (static_cast<double>(winners) / completedTrades) * 100.0;
}

double PerformanceAnalyzer::totalReturnPercent() const
{
    double initialCash = portfolio_.initialCash();
    double finalValue = finalPortfolioValue();

    if (initialCash == 0.0)
    {
        return 0.0;
    }

    return ((finalValue - initialCash) / initialCash) * 100.0;
}

void PerformanceAnalyzer::printReport() const
{

    std::cout << std::fixed << std::setprecision(2);
    std::cout << "========== BACKTEST REPORT ==========\n";
    std::cout << "Initial Cash      : " << portfolio_.initialCash() << '\n';
    std::cout << "Final Value       : " << finalPortfolioValue() << '\n';
    std::cout << "Net Profit        : " << netProfit() << '\n';
    std::cout << "Return (%)        : " << totalReturnPercent() << "%\n";
    std::cout << "Winning Trades    : " << winningTrades() << '\n';
    std::cout << "Losing Trades     : " << losingTrades() << '\n';
    std::cout << "Win Rate (%)      : " << winRate() << "%\n";
    std::cout << "=====================================\n";
}