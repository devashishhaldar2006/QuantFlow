#pragma once

#include <vector>

#include "trade/Trade.hpp"
class Portfolio {
private:
    double initialCash_;
    double cash_;
    int position_;
    double lastPrice_;
    double commission_;
    std::vector<Trade> trades_;
    std::vector<double> equityCurve_;

public:
    explicit Portfolio(double initialCash, double commission = 0.0);

    void buy(int quantity, double price, const std::string& timestamp);

    void sell(int quantity, double price, const std::string& timestamp);

    void updateMarketPrice(double price);
    
    double cash() const;

    int position() const;

    double totalValue() const;

    double initialCash() const;

    const std::vector<Trade>& getTrades() const;

    void recordEquity();

    const std::vector<double>& getEquityCurve() const;
};