#include "trade/Trade.hpp"

Trade::Trade(TradeSide side, int quantity, double executionPrice, double commission, double cashFlow, const std::string &timestamp)
    : side_(side), quantity_(quantity), executionPrice_(executionPrice), commission_(commission), cashFlow_(cashFlow), timestamp_(timestamp) {}

TradeSide Trade::getSide() const
{

    return side_;
}

int Trade::getQuantity() const
{

    return quantity_;
}

double Trade::getExecutionPrice() const
{

    return executionPrice_;
}

const std::string &Trade::getTimestamp() const
{

    return timestamp_;
}

double Trade::getCommission() const
{

    return commission_;
}

double Trade::getCashFlow() const
{

    return cashFlow_;
}