#pragma once

#include "analytics/PerformanceReport.hpp"

class ConsoleReporter
{
public:
    static void print(const PerformanceReport& report);
};