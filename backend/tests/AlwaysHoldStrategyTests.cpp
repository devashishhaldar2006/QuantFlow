#include "strategy/AlwaysHoldStrategy.hpp"
#include "market/Candle.hpp"

#include <gtest/gtest.h>

TEST(AlwaysHoldStrategyTest, AlwaysReturnsHold)
{
    AlwaysHoldStrategy strategy;

    Candle candle(
        "2024-01-01",
        100.0,
        105.0,
        95.0,
        102.0,
        1000.0);

    EXPECT_EQ(
        strategy.onCandle(candle),
        Signal::Hold);
}

TEST(AlwaysHoldStrategyTest, MultipleCandlesAlwaysReturnHold)
{
    AlwaysHoldStrategy strategy;

    for (int i = 0; i < 100; ++i)
    {
        Candle candle(
            "2024-01-01",
            100.0 + i,
            105.0 + i,
            95.0 + i,
            102.0 + i,
            1000.0);

        EXPECT_EQ(
            strategy.onCandle(candle),
            Signal::Hold);
    }
}