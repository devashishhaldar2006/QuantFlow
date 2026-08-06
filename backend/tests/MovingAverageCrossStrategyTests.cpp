#include "strategy/MovingAverageCrossStrategy.hpp"

#include <gtest/gtest.h>

TEST(MovingAverageCrossStrategyTest, ConstructorThrowsWhenFastPeriodIsGreaterThanSlowPeriod)
{
    EXPECT_THROW(
        MovingAverageCrossStrategy(20, 10),
        std::invalid_argument);
}

TEST(MovingAverageCrossStrategyTest, ConstructorThrowsWhenPeriodsAreEqual)
{
    EXPECT_THROW(
        MovingAverageCrossStrategy(10, 10),
        std::invalid_argument);
}

TEST(MovingAverageCrossStrategyTest, HoldsUntilEnoughData)
{
    MovingAverageCrossStrategy strategy(3, 5);

    for (int i = 0; i < 4; ++i)
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

TEST(MovingAverageCrossStrategyTest, FlatPricesAlwaysReturnHold)
{
    MovingAverageCrossStrategy strategy(3, 5);

    for (int i = 0; i < 20; ++i)
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

TEST(MovingAverageCrossStrategyTest, GeneratesBuySignalOnBullishCrossover)
{
    MovingAverageCrossStrategy strategy(3, 5);

    std::vector<double> closes =
        {
            10,
            10,
            10,
            10,
            10,
            11,
            12,
            13,
            14,
            15};

    bool buySeen = false;

    for (double close : closes)
    {
        Candle candle(
            "2024-01-01",
            close,
            close,
            close,
            close,
            1000.0);

        if (strategy.onCandle(candle) == Signal::Buy)
        {
            buySeen = true;
        }
    }

    EXPECT_TRUE(buySeen);
}

TEST(MovingAverageCrossStrategyTest, GeneratesSellSignalOnBearishCrossover)
{
    MovingAverageCrossStrategy strategy(3, 5);

    std::vector<double> closes =
        {
            10,
            11,
            12,
            13,
            14,
            15,
            14,
            13,
            12,
            11,
            10,
            9,
            8};

    bool sellSeen = false;

    for (double close : closes)
    {
        Candle candle(
            "2024-01-01",
            close,
            close,
            close,
            close,
            1000.0);

        if (strategy.onCandle(candle) == Signal::Sell)
        {
            sellSeen = true;
        }
    }

    EXPECT_TRUE(sellSeen);
}