#include "indicators/ATR.hpp"

#include <gtest/gtest.h>

#include <cmath>
#include <stdexcept>
#include <vector>

TEST(ATRTest, ConstructorThrowsForZeroPeriod)
{
    EXPECT_THROW(
        ATR(0),
        std::invalid_argument);
}

TEST(ATRTest, ThrowsForDifferentInputSizes)
{
    ATR atr(14);

    std::vector<double> highs = {10, 11, 12};
    std::vector<double> lows = {9, 10};
    std::vector<double> closes = {9, 10, 11};

    EXPECT_THROW(
        atr.calculate(highs, lows, closes),
        std::invalid_argument);
}

TEST(ATRTest, EmptyInputReturnsEmptyVector)
{
    ATR atr;

    std::vector<double> highs;
    std::vector<double> lows;
    std::vector<double> closes;

    auto result =
        atr.calculate(highs, lows, closes);

    EXPECT_TRUE(result.empty());
}

TEST(ATRTest, NotEnoughCandlesReturnsNaNVector)
{
    ATR atr(14);

    std::vector<double> highs(10, 100.0);
    std::vector<double> lows(10, 99.0);
    std::vector<double> closes(10, 99.5);

    auto result =
        atr.calculate(highs, lows, closes);

    ASSERT_EQ(result.size(), highs.size());

    for (double value : result)
    {
        EXPECT_TRUE(std::isnan(value));
    }
}

TEST(ATRTest, OutputSizeMatchesInputSize)
{
    ATR atr(14);

    std::vector<double> highs(30, 101.0);
    std::vector<double> lows(30, 99.0);
    std::vector<double> closes(30, 100.0);

    auto result =
        atr.calculate(highs, lows, closes);

    EXPECT_EQ(result.size(), highs.size());
}

TEST(ATRTest, InitialValuesAreNaN)
{
    ATR atr(14);

    std::vector<double> highs(30, 101.0);
    std::vector<double> lows(30, 99.0);
    std::vector<double> closes(30, 100.0);

    auto result =
        atr.calculate(highs, lows, closes);

    for (std::size_t i = 0; i < 14; ++i)
    {
        EXPECT_TRUE(std::isnan(result[i]));
    }

    EXPECT_FALSE(std::isnan(result[14]));
}

TEST(ATRTest, ConstantCandlesProduceConstantATR)
{
    ATR atr(14);

    std::vector<double> highs(40, 101.0);
    std::vector<double> lows(40, 99.0);
    std::vector<double> closes(40, 100.0);

    auto result =
        atr.calculate(highs, lows, closes);

    for (std::size_t i = 14; i < result.size(); ++i)
    {
        EXPECT_DOUBLE_EQ(result[i], 2.0);
    }
}

TEST(ATRTest, ATRValuesAreNeverNegative)
{
    ATR atr(14);

    std::vector<double> highs;
    std::vector<double> lows;
    std::vector<double> closes;

    for (int i = 0; i < 40; ++i)
    {
        highs.push_back(100 + i);
        lows.push_back(99 + i);
        closes.push_back(99.5 + i);
    }

    auto result =
        atr.calculate(highs, lows, closes);

    for (double value : result)
    {
        if (!std::isnan(value))
        {
            EXPECT_GE(value, 0.0);
        }
    }
}