#include "portfolio/Portfolio.hpp"

#include <stdexcept>

Portfolio::Portfolio(double initialCash)
    : initialCash_(initialCash), cash_(initialCash), position_(0), lastPrice_(0.0) {}

double Portfolio::initialCash() const
{
    return initialCash_;
}

void Portfolio::updateMarketPrice(double price)
{
    lastPrice_ = price;
}

double Portfolio::cash() const
{
    return cash_;
}

int Portfolio::position() const
{
    return position_;
}
double Portfolio::totalValue() const
{
    return cash_ + (position_ * lastPrice_);
}

void Portfolio::buy(int quantity, double price, const std::string &timestamp)
{
    if (quantity <= 0)
    {
        throw std::runtime_error("Quantity must be positive.");
    }
    if (price <= 0.0)
    {
        throw std::runtime_error("Price must be positive.");
    }
    const double totalCost = quantity * price;
    if (totalCost > cash_)
    {
        throw std::runtime_error("Insufficient funds.");
    }
    cash_ -= totalCost;
    position_ += quantity;
    lastPrice_ = price;

    trades_.emplace_back(
        TradeSide::Buy,
        quantity,
        price,
        timestamp);
}

void Portfolio::sell(int quantity, double price, const std::string &timestamp)
{
    if (quantity <= 0)
    {
        throw std::runtime_error("Quantity must be positive.");
    }
    if (price <= 0.0)
    {
        throw std::runtime_error("Price must be positive.");
    }
    if (quantity > position_)
    {
        throw std::runtime_error("Insufficient position to sell.");
    }
    const double totalRevenue = quantity * price;
    cash_ += totalRevenue;
    position_ -= quantity;
    lastPrice_ = price;

    trades_.emplace_back(
        TradeSide::Sell,
        quantity,
        price,
        timestamp);
}

const std::vector<Trade> &Portfolio::getTrades() const
{
    return trades_;
}