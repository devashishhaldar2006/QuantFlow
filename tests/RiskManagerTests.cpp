#include "risk/RiskManager.hpp"

#include <gtest/gtest.h>

TEST(RiskManagerTest, ReturnsNoExitWhenNoPosition)
{
    Portfolio portfolio(1000.0);

    RiskManager manager(portfolio);

    Candle candle(
        "2024-01-02",
        100,
        105,
        95,
        100,
        1000);

    ExitDecision decision =
        manager.evaluate(candle);

    EXPECT_FALSE(decision.shouldExit);
}

TEST(RiskManagerTest, TriggersStopLoss)
{
    Portfolio portfolio(
        1000.0,
        0.0,
        0.05);

    portfolio.buy(
        5,
        100.0,
        "2024-01-01");

    RiskManager manager(portfolio);

    Candle candle(
        "2024-01-02",
        100,
        101,
        94,
        95,
        1000);

    ExitDecision decision =
        manager.evaluate(candle);

    EXPECT_TRUE(decision.shouldExit);
    EXPECT_EQ(
        decision.reason,
        ExitReason::StopLoss);

    EXPECT_DOUBLE_EQ(
        decision.exitPrice,
        95.0);
}

TEST(RiskManagerTest, TriggersTakeProfit)
{
    Portfolio portfolio(
        1000.0,
        0.0,
        0.0,
        0.10);

    portfolio.buy(
        5,
        100.0,
        "2024-01-01");

    RiskManager manager(portfolio);

    Candle candle(
        "2024-01-02",
        100,
        112,
        99,
        105,
        1000);

    ExitDecision decision =
        manager.evaluate(candle);

    ASSERT_TRUE(decision.shouldExit);

    EXPECT_EQ(
        decision.reason,
        ExitReason::TakeProfit);

    EXPECT_DOUBLE_EQ(
        decision.exitPrice,
        110.0);
}

TEST(RiskManagerTest, StopLossHasPriorityOverTakeProfit)
{
    Portfolio portfolio(
        1000.0,
        0.0,
        0.05,
        0.10);

    portfolio.buy(
        5,
        100.0,
        "2024-01-01");

    RiskManager manager(portfolio);

    Candle candle(
        "2024-01-02",
        100,
        120,
        90,
        105,
        1000);

    ExitDecision decision =
        manager.evaluate(candle);

    EXPECT_TRUE(decision.shouldExit);
    EXPECT_EQ(
        decision.reason,
        ExitReason::StopLoss);
}

TEST(RiskManagerTest, NoExitWhenPriceInsideRange)
{
    Portfolio portfolio(
        1000.0,
        0.0,
        0.05,
        0.10);

    portfolio.buy(
        5,
        100.0,
        "2024-01-01");

    RiskManager manager(portfolio);

    Candle candle(
        "2024-01-02",
        100,
        108,
        96,
        102,
        1000);

    ExitDecision decision =
        manager.evaluate(candle);

    EXPECT_FALSE(decision.shouldExit);
}

TEST(RiskManagerTest, IgnoresStopLossWhenDisabled)
{
    Portfolio portfolio(
        1000.0,
        0.0,
        0.0,
        0.0);

    portfolio.buy(
        5,
        100.0,
        "2024-01-01");

    RiskManager manager(portfolio);

    Candle candle(
        "2024-01-02",
        100,
        100,
        100,
        100,
        1000);

    ExitDecision decision =
        manager.evaluate(candle);

    EXPECT_FALSE(decision.shouldExit);
}

TEST(RiskManagerTest, IgnoresTakeProfitWhenDisabled)
{
    Portfolio portfolio(
        1000.0,
        0.0,
        0.0,
        0.0);

    portfolio.buy(
        5,
        100.0,
        "2024-01-01");

    RiskManager manager(portfolio);

    Candle candle(
        "2024-01-02",
        100,
        100,
        100,
        100,
        1000);

    ExitDecision decision =
        manager.evaluate(candle);

    EXPECT_FALSE(decision.shouldExit);
}

TEST(RiskManagerTest, ReturnsCorrectExitPrice)
{
    Portfolio portfolio(
        1000.0,
        0.0,
        0.05);

    portfolio.buy(
        5,
        100.0,
        "2024-01-01");

    RiskManager manager(portfolio);

    Candle candle(
        "2024-01-02",
        100,
        101,
        94,
        95,
        1000);

    ExitDecision decision =
        manager.evaluate(candle);

    EXPECT_TRUE(decision.shouldExit);

    EXPECT_DOUBLE_EQ(
        decision.exitPrice,
        portfolio.stopLossPrice());
}