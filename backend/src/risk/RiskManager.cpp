#include "risk/RiskManager.hpp"

RiskManager::RiskManager(Portfolio& portfolio)
    : portfolio_(portfolio)
{
}

ExitDecision RiskManager::evaluate(const Candle& candle) const
{
    if (portfolio_.position() == 0)
    {
        return {};
    }

    const double stopLossPrice = portfolio_.stopLossPrice();
    const double takeProfitPrice = portfolio_.takeProfitPrice();

    if (stopLossPrice > 0.0 &&
        candle.getLow() <= stopLossPrice)
    {
        return {
            true,
            ExitReason::StopLoss,
            stopLossPrice
        };
    }

    if (takeProfitPrice > 0.0 &&
        candle.getHigh() >= takeProfitPrice)
    {
        return {
            true,
            ExitReason::TakeProfit,
            takeProfitPrice
        };
    }

    return {};
}