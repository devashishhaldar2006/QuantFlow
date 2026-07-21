#pragma once

#include <vector>

#include "trade/Trade.hpp"
class Portfolio {
private:
    double cash_;
    int position_;
    double lastPrice_;
    std::vector<Trade> trades_;

public:
    explicit Portfolio(double initialCash);

    void buy(int quantity, double price, const std::string& timestamp);

    void sell(int quantity, double price, const std::string& timestamp);

    void updateMarketPrice(double price);
    
    double cash() const;

    int position() const;

    double totalValue() const;

    const std::vector<Trade>& getTrades() const;
};