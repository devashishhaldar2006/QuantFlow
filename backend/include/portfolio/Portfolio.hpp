#pragma once

#include <vector>
#include <string>

#include "trade/Trade.hpp"
#include "portfolio/EquityPoint.hpp"
class Portfolio
{
private:
    double initialCash_;
    double cash_;
    int position_;
    double lastPrice_;
    double commission_;

    double stopLossPercent_;
    double stopLossPrice_;

    double takeProfitPercent_;
    double takeProfitPrice_;

    std::vector<Trade> trades_;
    std::vector<EquityPoint> equityCurve_;

public:
    explicit Portfolio(double initialCash, double commission = 0.0, double stopLossPercent = 0.0, double takeProfitPercent = 0.0);

    void buy(int quantity, double price, const std::string &timestamp);

    void sell(int quantity, double price, const std::string &timestamp);

    void updateMarketPrice(double price);

    double cash() const;

    int position() const;

    double totalValue() const;

    double initialCash() const;

    double stopLossPrice() const;

    double takeProfitPrice() const;

    double commission() const;

    const std::vector<Trade> &getTrades() const;

    void recordEquity(const std::string &timestamp);

    const std::vector<EquityPoint> &getEquityCurve() const;
};