#include <gtest/gtest.h>

#include "analytics/Statistics.hpp"

#include <cmath>
#include <stdexcept>
#include <vector>

//
// calculateReturns()
//

TEST(StatisticsTest, CalculateReturnsIncreasingPrices)
{
    std::vector<double> prices = {100.0, 105.0, 110.0, 120.0};

    std::vector<double> expectedReturns = {
        0.05,
        0.047619047619047616,
        0.09090909090909091};

    const auto calculatedReturns =
        Statistics::calculateReturns(prices);

    ASSERT_EQ(calculatedReturns.size(), expectedReturns.size());

    for (size_t i = 0; i < calculatedReturns.size(); ++i)
    {
        EXPECT_NEAR(
            calculatedReturns[i],
            expectedReturns[i],
            1e-9);
    }
}

TEST(StatisticsTest, CalculateReturnsEmptyVectorReturnsEmpty)
{
    std::vector<double> prices;

    const auto returns =
        Statistics::calculateReturns(prices);

    EXPECT_TRUE(returns.empty());
}

TEST(StatisticsTest, CalculateReturnsSinglePriceReturnsEmpty)
{
    std::vector<double> prices = {100.0};

    const auto returns =
        Statistics::calculateReturns(prices);

    EXPECT_TRUE(returns.empty());
}

//
// mean()
//

TEST(StatisticsTest, MeanCalculatesCorrectly)
{
    std::vector<double> data = {
        1.0,
        2.0,
        3.0,
        4.0,
        5.0};

    EXPECT_DOUBLE_EQ(
        Statistics::mean(data),
        3.0);
}

TEST(StatisticsTest, MeanThrowsOnEmptyVector)
{
    std::vector<double> data;

    EXPECT_THROW(
        Statistics::mean(data),
        std::invalid_argument);
}

//
// standardDeviation()
//

TEST(StatisticsTest, StandardDeviationCalculatesCorrectly)
{
    std::vector<double> data = {
        1.0,
        2.0,
        3.0,
        4.0,
        5.0};

    // Sample standard deviation:
    // sqrt(10 / 4) = sqrt(2.5)

    constexpr double expected =
        1.5811388300841898;

    EXPECT_NEAR(
        Statistics::standardDeviation(data),
        expected,
        1e-9);
}

TEST(StatisticsTest, StandardDeviationThrowsOnEmptyVector)
{
    std::vector<double> data;

    EXPECT_THROW(
        Statistics::standardDeviation(data),
        std::invalid_argument);
}

TEST(StatisticsTest, StandardDeviationThrowsOnSingleValue)
{
    std::vector<double> data = {10.0};

    EXPECT_THROW(
        Statistics::standardDeviation(data),
        std::invalid_argument);
}

//
// annualizedReturn()
//

TEST(StatisticsTest, AnnualizedReturnCalculatesCorrectly)
{
    std::vector<double> returns = {
        0.01,
        0.02,
        -0.01,
        0.03};

    constexpr int tradingDays = 252;

    const double expected =
        Statistics::mean(returns) *
        tradingDays;

    EXPECT_NEAR(
        Statistics::annualizedReturn(
            returns,
            tradingDays),
        expected,
        1e-9);
}

TEST(StatisticsTest, AnnualizedReturnThrowsForInvalidTradingDays)
{
    std::vector<double> returns = {
        0.01,
        0.02};

    EXPECT_THROW(
        Statistics::annualizedReturn(
            returns,
            0),
        std::invalid_argument);
}

//
// annualizedVolatility()
//

TEST(StatisticsTest, AnnualizedVolatilityCalculatesCorrectly)
{
    std::vector<double> returns = {
        0.01,
        0.02,
        -0.01,
        0.03};

    constexpr int tradingDays = 252;

    const double expected =
        Statistics::standardDeviation(returns) *
        std::sqrt(
            static_cast<double>(tradingDays));

    EXPECT_NEAR(
        Statistics::annualizedVolatility(
            returns,
            tradingDays),
        expected,
        1e-9);
}

TEST(StatisticsTest, AnnualizedVolatilityThrowsForInvalidTradingDays)
{
    std::vector<double> returns = {
        0.01,
        0.02};

    EXPECT_THROW(
        Statistics::annualizedVolatility(
            returns,
            0),
        std::invalid_argument);
}

//
// sharpeRatio()
//

TEST(StatisticsTest, SharpeRatioCalculatesCorrectly)
{
    std::vector<double> returns = {
        0.01,
        0.02,
        -0.01,
        0.03};

    constexpr double riskFreeRate = 0.005;
    constexpr int tradingDays = 252;

    const double expected =
        (
            Statistics::annualizedReturn(
                returns,
                tradingDays)
            - riskFreeRate
        )
        /
        Statistics::annualizedVolatility(
            returns,
            tradingDays);

    EXPECT_NEAR(
        Statistics::sharpeRatio(
            returns,
            riskFreeRate,
            tradingDays),
        expected,
        1e-9);
}

TEST(StatisticsTest, SharpeRatioThrowsOnZeroVolatility)
{
    std::vector<double> returns = {
        0.01,
        0.01,
        0.01,
        0.01};

    EXPECT_THROW(
        Statistics::sharpeRatio(
            returns,
            0.0,
            252),
        std::runtime_error);
}

TEST(StatisticsTest, SharpeRatioThrowsForInvalidTradingDays)
{
    std::vector<double> returns = {
        0.01,
        0.02};

    EXPECT_THROW(
        Statistics::sharpeRatio(
            returns,
            0.0,
            0),
        std::invalid_argument);
}
TEST(StatisticsTest, CalculateReturnsDecreasingPrices)
{
    std::vector<double> prices = {
        120.0,
        110.0,
        100.0
    };

    std::vector<double> expected = {
        -0.08333333333333333,
        -0.09090909090909091
    };

    const auto returns =
        Statistics::calculateReturns(prices);

    ASSERT_EQ(returns.size(), expected.size());

    for (size_t i = 0; i < returns.size(); ++i)
    {
        EXPECT_NEAR(
            returns[i],
            expected[i],
            1e-9);
    }
}
TEST(StatisticsTest, CalculateReturnsFlatPrices)
{
    std::vector<double> prices = {
        100.0,
        100.0,
        100.0
    };

    const auto returns =
        Statistics::calculateReturns(prices);

    ASSERT_EQ(returns.size(), 2);

    EXPECT_DOUBLE_EQ(returns[0], 0.0);
    EXPECT_DOUBLE_EQ(returns[1], 0.0);
}

TEST(StatisticsTest, AnnualizedVolatilityThrowsOnSingleReturn)
{
    std::vector<double> returns = {0.01};

    EXPECT_THROW(
        Statistics::annualizedVolatility(
            returns,
            252),
        std::invalid_argument);
}

TEST(StatisticsTest, AnnualizedReturnThrowsOnEmptyReturns)
{
    std::vector<double> returns;

    EXPECT_THROW(
        Statistics::annualizedReturn(
            returns,
            252),
        std::invalid_argument);
}

TEST(StatisticsTest, SharpeRatioThrowsOnSingleReturn)
{
    std::vector<double> returns = {0.01};

    EXPECT_THROW(
        Statistics::sharpeRatio(
            returns,
            0.0,
            252),
        std::invalid_argument);
}