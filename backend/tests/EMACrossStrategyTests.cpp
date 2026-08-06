#include "strategy/EMACrossStrategy.hpp"

#include <gtest/gtest.h>

TEST(EMACrossStrategyTest, ConstructorThrowsWhenFastPeriodIsGreaterThanSlowPeriod)
{
    EXPECT_THROW(
        EMACrossStrategy(20, 10),
        std::invalid_argument);
}

TEST(EMACrossStrategyTest, ConstructorThrowsWhenPeriodsAreEqual)
{
    EXPECT_THROW(
        EMACrossStrategy(10, 10),
        std::invalid_argument);
}

TEST(EMACrossStrategyTest, HoldsUntilEnoughData)
{
    EMACrossStrategy strategy(3, 5);

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

TEST(EMACrossStrategyTest, FlatPricesAlwaysReturnHold)
{
    EMACrossStrategy strategy(3, 5);

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

TEST(EMACrossStrategyTest, GeneratesBuySignalOnBullishCrossover)
{
    EMACrossStrategy strategy(3, 5);

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
        15
    };

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

TEST(EMACrossStrategyTest, GeneratesSellSignalOnBearishCrossover)
{
    EMACrossStrategy strategy(3, 5);

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
        8
    };

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