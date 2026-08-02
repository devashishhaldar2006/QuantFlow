#include "indicators/MACD.hpp"

#include <gtest/gtest.h>

#include <cmath>
#include <stdexcept>
#include <vector>

TEST(MACDTest, ThrowsForZeroFastPeriod)
{
    EXPECT_THROW(
        MACD(0, 26, 9),
        std::invalid_argument);
}

TEST(MACDTest, ThrowsForZeroSlowPeriod)
{
    EXPECT_THROW(
        MACD(12, 0, 9),
        std::invalid_argument);
}

TEST(MACDTest, ThrowsForZeroSignalPeriod)
{
    EXPECT_THROW(
        MACD(12, 26, 0),
        std::invalid_argument);
}

TEST(MACDTest, ThrowsWhenFastPeriodGreaterThanSlowPeriod)
{
    EXPECT_THROW(
        MACD(30, 20, 9),
        std::invalid_argument);
}

TEST(MACDTest, EmptyInputReturnsEmptyVectors)
{
    MACD macd;

    std::vector<double> prices;

    auto result =
        macd.calculate(prices);

    EXPECT_TRUE(result.macd.empty());
    EXPECT_TRUE(result.signal.empty());
    EXPECT_TRUE(result.histogram.empty());
}

TEST(MACDTest, OutputSizeMatchesInputSize)
{
    MACD macd;

    std::vector<double> prices(100, 100.0);

    auto result =
        macd.calculate(prices);

    EXPECT_EQ(result.macd.size(), prices.size());
    EXPECT_EQ(result.signal.size(), prices.size());
    EXPECT_EQ(result.histogram.size(), prices.size());
}

TEST(MACDTest, InitialValuesAreNaN)
{
    MACD macd;

    std::vector<double> prices(100, 100.0);

    auto result =
        macd.calculate(prices);

    EXPECT_TRUE(std::isnan(result.macd[0]));
}

TEST(MACDTest, ConstantPricesProduceZeroMACD)
{
    MACD macd;

    std::vector<double> prices(100, 100.0);

    auto result =
        macd.calculate(prices);

    for (std::size_t i = 35; i < prices.size(); ++i)
    {
        EXPECT_NEAR(result.macd[i], 0.0, 1e-9);
    }
}

TEST(MACDTest, HistogramEqualsMACDMinusSignal)
{
    MACD macd;

    std::vector<double> prices;

    for (int i = 1; i <= 100; ++i)
    {
        prices.push_back(static_cast<double>(i));
    }

    auto result =
        macd.calculate(prices);

    for (std::size_t i = 35; i < prices.size(); ++i)
    {
        EXPECT_NEAR(
            result.histogram[i],
            result.macd[i] - result.signal[i],
            1e-9);
    }
}

TEST(MACDTest, IncreasingPricesProduceFiniteValues)
{
    MACD macd;

    std::vector<double> prices;

    for (int i = 1; i <= 100; ++i)
    {
        prices.push_back(static_cast<double>(i));
    }

    auto result =
        macd.calculate(prices);

    for (std::size_t i = 35; i < prices.size(); ++i)
    {
        EXPECT_TRUE(std::isfinite(result.macd[i]));
        EXPECT_TRUE(std::isfinite(result.signal[i]));
        EXPECT_TRUE(std::isfinite(result.histogram[i]));
    }
}