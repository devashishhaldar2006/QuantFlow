#pragma once

#include "analytics/PerformanceReport.hpp"
#include "portfolio/Portfolio.hpp"

class PerformanceAnalyzer
{
public:
    explicit PerformanceAnalyzer(const Portfolio& portfolio);

    PerformanceReport analyze() const;

private:
    const Portfolio& portfolio_;

    double maximumDrawdown() const;
};