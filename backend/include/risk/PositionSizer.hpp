#pragma once

#include "portfolio/Portfolio.hpp"

class PositionSizer
{
public:
    int calculatePositionSize(const Portfolio &portfolio, double price) const;
};