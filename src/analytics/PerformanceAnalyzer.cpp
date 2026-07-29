#include "analytics/PerformanceAnalyzer.hpp"

#include <cmath>

PerformanceAnalyzer::PerformanceAnalyzer(
    const Portfolio &portfolio)
    : portfolio_(portfolio)
{
}

PerformanceReport PerformanceAnalyzer::analyze() const
{
    PerformanceReport report;

    report.initialCapital = portfolio_.initialCash();
    report.finalEquity = portfolio_.totalValue();

    report.netProfit =
        report.finalEquity - report.initialCapital;

    if (report.initialCapital > 0.0)
    {
        report.totalReturnPercent =
            (report.netProfit / report.initialCapital) * 100.0;
    }

    const auto &trades = portfolio_.getTrades();

    const Trade *buyTrade = nullptr;

    double totalWins = 0.0;
    double totalLosses = 0.0;

    for (const auto &trade : trades)
    {
        if (trade.getSide() == TradeSide::Buy)
        {
            buyTrade = &trade;
        }
        else if (buyTrade != nullptr)
        {
            double pnl =
                buyTrade->getCashFlow() +
                trade.getCashFlow();

            if (pnl > 0.0)
            {
                report.winningTrades++;

                totalWins += pnl;

                if (pnl > report.largestWin)
                {
                    report.largestWin = pnl;
                }
            }
            else
            {
                report.losingTrades++;

                totalLosses += pnl;

                if (pnl < report.largestLoss)
                {
                    report.largestLoss = pnl;
                }
            }

            buyTrade = nullptr;
        }
    }

    const int completedTrades =
        report.winningTrades +
        report.losingTrades;

    report.totalTrades = completedTrades;

    if (completedTrades > 0)
    {
        report.winRatePercent =
            static_cast<double>(report.winningTrades) /
            completedTrades * 100.0;
    }

    if (report.winningTrades > 0)
    {
        report.averageWin =
            totalWins / report.winningTrades;
    }

    if (report.losingTrades > 0)
    {
        report.averageLoss =
            totalLosses / report.losingTrades;
    }

    if (totalLosses != 0.0)
    {
        report.profitFactor =
            totalWins / std::abs(totalLosses);
    }

    if (completedTrades > 0)
    {
        const double winProbability =
            static_cast<double>(report.winningTrades) /
            completedTrades;

        const double lossProbability =
            static_cast<double>(report.losingTrades) /
            completedTrades;

        report.expectancy =
            (winProbability * report.averageWin) -
            (lossProbability * std::abs(report.averageLoss));
    }

    report.maximumDrawdown =
        maximumDrawdown();

    return report;
}

double PerformanceAnalyzer::maximumDrawdown() const
{
    const auto &equityCurve =
        portfolio_.getEquityCurve();

    if (equityCurve.empty())
    {
        return 0.0;
    }

    double peak = equityCurve.front();
    double maxDrawdown = 0.0;

    for (double equity : equityCurve)
    {
        if (equity > peak)
        {
            peak = equity;
        }

        double drawdown =
            (peak - equity) / peak;

        if (drawdown > maxDrawdown)
        {
            maxDrawdown = drawdown;
        }
    }

    return maxDrawdown * 100.0;
}