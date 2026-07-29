#include "risk/PositionSizer.hpp"

int PositionSizer::calculatePositionSize(
    const Portfolio& portfolio,
    double price) const
{
    if (price <= 0.0)
    {
        return 0;
    }

    const double availableCash =
        portfolio.cash();

    const double commissionRate =
        portfolio.commission();

    const double costPerUnit =
        price * (1.0 + commissionRate);

    return static_cast<int>(
        availableCash / costPerUnit);
}