#pragma once

#include <string>

enum class TradeSide
{
    Buy,
    Sell,
};

class Trade
{
private:
    TradeSide side_;
    int quantity_;
    double executionPrice_;
    double commission_;
    double cashFlow_;
    std::string timestamp_;

public:
    Trade(TradeSide side, int quantity, double executionPrice, double commission, double cashFlow, const std::string &timestamp);

    TradeSide getSide() const;

    int getQuantity() const;

    double getExecutionPrice() const;

    double getCommission() const;

    double getCashFlow() const;

    const std::string &getTimestamp() const;
};