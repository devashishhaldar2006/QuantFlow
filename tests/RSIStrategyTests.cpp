#include "strategy/RSIStrategy.hpp"

#include <gtest/gtest.h>

TEST(RSIStrategyTest, ConstructorAcceptsValidParameters)
{
    EXPECT_NO_THROW(
        RSIStrategy(14, 30.0, 70.0));
}

TEST(RSIStrategyTest, HoldsUntilEnoughCandles)
{
    RSIStrategy strategy(14);

    for (int i = 0; i < 14; ++i)
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

TEST(RSIStrategyTest, IncreasingPricesEventuallyGenerateSellSignal)
{
    RSIStrategy strategy(14);

    bool sellSeen = false;

    for (int i = 0; i < 50; ++i)
    {
        double price = 100.0 + i;

        Candle candle(
            "2024-01-01",
            price,
            price,
            price,
            price,
            1000.0);

        if (strategy.onCandle(candle) == Signal::Sell)
        {
            sellSeen = true;
        }
    }

    EXPECT_TRUE(sellSeen);
}

TEST(RSIStrategyTest, DecreasingPricesEventuallyGenerateBuySignal)
{
    RSIStrategy strategy(14);

    bool buySeen = false;

    for (int i = 0; i < 50; ++i)
    {
        double price = 100.0 - i;

        Candle candle(
            "2024-01-01",
            price,
            price,
            price,
            price,
            1000.0);

        if (strategy.onCandle(candle) == Signal::Buy)
        {
            buySeen = true;
        }
    }

    EXPECT_TRUE(buySeen);
}

TEST(RSIStrategyTest, FlatPricesAlwaysReturnHold)
{
    RSIStrategy strategy(14);

    for (int i = 0; i < 50; ++i)
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