#include "trade/Trade.hpp"

Trade::Trade(TradeSide side, int quantity, double price, const std::string &timestamp)
    : side_(side), quantity_(quantity), price_(price), timestamp_(timestamp) {}

TradeSide Trade::getSide() const
{

    return side_;
}

int Trade::getQuantity() const
{

    return quantity_;
}

double Trade::getPrice() const
{

    return price_;
}

const std::string &Trade::getTimestamp() const
{

    return timestamp_;
}