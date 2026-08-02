#include "indicators/SMA.hpp"

#include <gtest/gtest.h>

#include <cmath>
#include <limits>
#include <stdexcept>
#include <vector>

TEST(SMATests, ConstructorThrowsForZeroPeriod)
{
    EXPECT_THROW(
        SMA(0),
        std::invalid_argument);
}
TEST(SMATests, EmptyInputReturnsEmptyVector)
{
    SMA sma;

    std::vector<double> prices;

    auto result = sma.calculate(prices);

    EXPECT_TRUE(result.empty());
}

TEST(SMATests, NotEnoughPricesReturnsNaNVector)
{
    SMA sma(5);

    std::vector<double> prices =
    {
        1,
        2,
        3
    };

    auto result =
        sma.calculate(prices);

    ASSERT_EQ(result.size(), prices.size());

    for (double value : result)
    {
        EXPECT_TRUE(std::isnan(value));
    }
}

TEST(SMATests, OutputSizeMatchesInputSize)
{
    SMA sma(5);

    std::vector<double> prices(
        100,
        100.0);

    auto result =
        sma.calculate(prices);

    EXPECT_EQ(
        result.size(),
        prices.size());
}
TEST(SMATests, InitialValuesAreNaN)
{
    SMA sma(5);

    std::vector<double> prices(
        20,
        100.0);

    auto result =
        sma.calculate(prices);

    for (std::size_t i = 0; i < 4; ++i)
    {
        EXPECT_TRUE(
            std::isnan(result[i]));
    }

    EXPECT_FALSE(
        std::isnan(result[4]));
}

TEST(SMATests, ConstantPricesProduceConstantAverage)
{
    SMA sma(5);

    std::vector<double> prices(
        50,
        100.0);

    auto result =
        sma.calculate(prices);

    for (std::size_t i = 4;
         i < prices.size();
         ++i)
    {
        EXPECT_DOUBLE_EQ(
            result[i],
            100.0);
    }
}

TEST(SMATests, ComputesCorrectMovingAverage)
{
    SMA sma(3);

    std::vector<double> prices =
    {
        1,
        2,
        3,
        4,
        5
    };

    auto result =
        sma.calculate(prices);

    EXPECT_TRUE(std::isnan(result[0]));
    EXPECT_TRUE(std::isnan(result[1]));

    EXPECT_DOUBLE_EQ(result[2], 2.0);
    EXPECT_DOUBLE_EQ(result[3], 3.0);
    EXPECT_DOUBLE_EQ(result[4], 4.0);
}

TEST(SMATests, IncreasingPricesProduceIncreasingAverage)
{
    SMA sma(5);

    std::vector<double> prices;

    for (int i = 1; i <= 50; ++i)
    {
        prices.push_back(i);
    }

    auto result =
        sma.calculate(prices);

    for (std::size_t i = 5;
         i < result.size();
         ++i)
    {
        EXPECT_GT(
            result[i],
            result[i - 1]);
    }
}