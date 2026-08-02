#include "strategy/BollingerStrategy.hpp"

#include <gtest/gtest.h>

TEST(BollingerStrategyTest, ConstructorThrowsWhenPeriodIsZero)
{
    EXPECT_THROW(
        BollingerStrategy(0, 2.0),
        std::invalid_argument);
}

TEST(BollingerStrategyTest, ConstructorThrowsWhenMultiplierIsZero)
{
    EXPECT_THROW(
        BollingerStrategy(20, 0.0),
        std::invalid_argument);
}

TEST(BollingerStrategyTest, ConstructorThrowsWhenMultiplierIsNegative)
{
    EXPECT_THROW(
        BollingerStrategy(20, -2.0),
        std::invalid_argument);
}

TEST(BollingerStrategyTest, HoldsUntilEnoughData)
{
    BollingerStrategy strategy(20, 2.0);

    for (int i = 0; i < 19; ++i)
    {
        Candle candle(
            "2024-01-01",
            100,
            100,
            100,
            100,
            1000);

        EXPECT_EQ(
            strategy.onCandle(candle),
            Signal::Hold);
    }
}

TEST(BollingerStrategyTest, FlatPricesAlwaysReturnHold)
{
    BollingerStrategy strategy;

    for (int i = 0; i < 100; ++i)
    {
        Candle candle(
            "2024-01-01",
            100,
            100,
            100,
            100,
            1000);

        EXPECT_EQ(
            strategy.onCandle(candle),
            Signal::Hold);
    }
}