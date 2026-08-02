#include "strategy/ATRFilterStrategy.hpp"

#include <gtest/gtest.h>

TEST(ATRFilterStrategyTest, ConstructorThrowsWhenPeriodIsZero)
{
    EXPECT_THROW(
        ATRFilterStrategy(0, 1.0),
        std::invalid_argument);
}

TEST(ATRFilterStrategyTest, ConstructorThrowsWhenMinimumATRIsZero)
{
    EXPECT_THROW(
        ATRFilterStrategy(14, 0.0),
        std::invalid_argument);
}

TEST(ATRFilterStrategyTest, ConstructorThrowsWhenMinimumATRIsNegative)
{
    EXPECT_THROW(
        ATRFilterStrategy(14, -1.0),
        std::invalid_argument);
}

TEST(ATRFilterStrategyTest, HoldsUntilEnoughCandles)
{
    ATRFilterStrategy strategy(14, 1.0);

    for (int i = 0; i < 14; ++i)
    {
        Candle candle(
            "2024-01-01",
            101.0,
            101.0,
            100.0,
            100.5,
            1000.0);

        EXPECT_EQ(
            strategy.onCandle(candle),
            Signal::Hold);
    }
}

TEST(ATRFilterStrategyTest, HoldsWhenATRIsBelowThreshold)
{
    ATRFilterStrategy strategy(14, 5.0);

    for (int i = 0; i < 40; ++i)
    {
        Candle candle(
            "2024-01-01",
            100.1,
            100.1,
            100.0,
            100.05,
            1000.0);

        EXPECT_EQ(
            strategy.onCandle(candle),
            Signal::Hold);
    }
}

TEST(ATRFilterStrategyTest, ReturnsBuyWhenATRExceedsThreshold)
{
    ATRFilterStrategy strategy(14, 1.0);

    bool buySeen = false;

    for (int i = 0; i < 40; ++i)
    {
        Candle candle(
            "2024-01-01",
            110.0,
            110.0,
            90.0,
            100.0,
            1000.0);

        if (strategy.onCandle(candle) == Signal::Buy)
        {
            buySeen = true;
        }
    }

    EXPECT_TRUE(buySeen);
}