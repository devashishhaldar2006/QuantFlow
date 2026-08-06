#pragma once

#include <string>

#include "order/OrderSide.hpp"

struct Order
{
    OrderSide side;

    int quantity;

    double price;

    std::string timestamp;
};