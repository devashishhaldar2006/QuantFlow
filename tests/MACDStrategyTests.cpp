#include "strategy/MACDStrategy.hpp"

#include <gtest/gtest.h>

TEST(MACDStrategyTest, ConstructorThrowsWhenFastPeriodIsGreaterThanSlowPeriod)
{
    EXPECT_THROW(
        MACDStrategy(26, 12, 9),
        std::invalid_argument);
}

TEST(MACDStrategyTest, ConstructorThrowsWhenPeriodsAreEqual)
{
    EXPECT_THROW(
        MACDStrategy(12, 12, 9),
        std::invalid_argument);
}

TEST(MACDStrategyTest, ConstructorThrowsWhenFastPeriodIsZero)
{
    EXPECT_THROW(
        MACDStrategy(0, 26, 9),
        std::invalid_argument);
}

TEST(MACDStrategyTest, ConstructorThrowsWhenSlowPeriodIsZero)
{
    EXPECT_THROW(
        MACDStrategy(12, 0, 9),
        std::invalid_argument);
}

TEST(MACDStrategyTest, ConstructorThrowsWhenSignalPeriodIsZero)
{
    EXPECT_THROW(
        MACDStrategy(12, 26, 0),
        std::invalid_argument);
}

TEST(MACDStrategyTest, HoldsUntilEnoughData)
{
    MACDStrategy strategy(12, 26, 9);

    for (int i = 0; i < 25; ++i)
    {
        Candle candle(
            "2024-01-01",
            100.0,
            100.0,
            100.0,
            100.0,
            1000.0);

        EXPECT_EQ(
            strategy.onCandle(candle),
            Signal::Hold);
    }
}

TEST(MACDStrategyTest, FlatPricesAlwaysReturnHold)
{
    MACDStrategy strategy;

    for (int i = 0; i < 100; ++i)
    {
        Candle candle(
            "2024-01-01",
            100.0,
            100.0,
            100.0,
            100.0,
            1000.0);

        EXPECT_EQ(
            strategy.onCandle(candle),
            Signal::Hold);
    }
}