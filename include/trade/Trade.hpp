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
    double price_;
    std::string timestamp_;

public:
    Trade(TradeSide side, int quantity, double price, const std::string& timestamp);

    TradeSide getSide() const;

    int getQuantity() const;

    double getPrice() const;

    const std::string& getTimestamp() const;

};