#pragma once

#include "risk/ExitReason.hpp"

struct ExitDecision
{
    bool shouldExit=false;

    ExitReason reason=ExitReason::None;

    double exitPrice=0.0;
};