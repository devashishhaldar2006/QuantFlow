#include "portfolio/Portfolio.hpp"

#include <stdexcept>

Portfolio::Portfolio(double initialCash, double commission, double stopLossPercent)
    : initialCash_(initialCash), cash_(initialCash), position_(0), lastPrice_(0.0), commission_(commission), stopLossPercent_(stopLossPercent), stopLossPrice_(0.0)
{
    if (stopLossPercent < 0.0 || stopLossPercent >= 1.0)
    {
        throw std::invalid_argument(
            "Stop loss percentage must be between 0 and 1.");
    }
}

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
    const double totalCost = (quantity * price) + commission_;
    if (totalCost > cash_)
    {
        throw std::runtime_error("Insufficient funds.");
    }
    cash_ -= totalCost;
    position_ += quantity;
    lastPrice_ = price;
    stopLossPrice_ = price * (1.0 - stopLossPercent_);

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
    const double totalRevenue = (quantity * price) - commission_;
    cash_ += totalRevenue;
    position_ -= quantity;
    lastPrice_ = price;
    if (position_ == 0)
    {
        stopLossPrice_ = 0.0; // Reset stop loss price if no position
    }

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

void Portfolio::recordEquity()
{
    equityCurve_.push_back(totalValue());
}

const std::vector<double> &Portfolio::getEquityCurve() const
{
    return equityCurve_;
}

double Portfolio::stopLossPrice() const
{
    return stopLossPrice_;
}