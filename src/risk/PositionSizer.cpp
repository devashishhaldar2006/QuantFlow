#include "risk/PositionSizer.hpp"

int PositionSizer::calculatePositionSize(const Portfolio &portfolio, double price) const
{
    if(price <= 0.0){
        return 0; 
    }

    return static_cast<int>(portfolio.cash() / price);
}