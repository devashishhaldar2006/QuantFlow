#include "execution/ExecutionEngine.hpp"

#include <gtest/gtest.h>

TEST(ExecutionEngineTest, HoldDoesNothing)
{
    Portfolio portfolio(1000.0);
    PositionSizer sizer;

    ExecutionEngine engine(
        portfolio,
        sizer,
        0.0);

    Candle candle(
        "2024-01-01",
        100,
        100,
        100,
        100,
        1000);

    engine.execute(
        Signal::Hold,
        candle);

    EXPECT_EQ(portfolio.position(), 0);
    EXPECT_DOUBLE_EQ(portfolio.cash(), 1000.0);
    EXPECT_TRUE(portfolio.getTrades().empty());
}

TEST(ExecutionEngineTest, BuyCreatesPosition)
{
    Portfolio portfolio(1000.0);
    PositionSizer sizer;

    ExecutionEngine engine(
        portfolio,
        sizer,
        0.0);

    Candle candle(
        "2024-01-01",
        100,
        100,
        100,
        100,
        1000);

    engine.execute(
        Signal::Buy,
        candle);

    EXPECT_GT(portfolio.position(), 0);
    EXPECT_EQ(portfolio.getTrades().size(), 1u);
}

TEST(ExecutionEngineTest, SellClosesPosition)
{
    Portfolio portfolio(1000.0);
    PositionSizer sizer;

    ExecutionEngine engine(
        portfolio,
        sizer,
        0.0);

    Candle candle(
        "2024-01-01",
        100,
        100,
        100,
        100,
        1000);

    engine.execute(Signal::Buy, candle);
    engine.execute(Signal::Sell, candle);

    EXPECT_EQ(portfolio.position(), 0);
    EXPECT_EQ(portfolio.getTrades().size(), 2u);
}

TEST(ExecutionEngineTest, CannotBuyTwice)
{
    Portfolio portfolio(1000.0);
    PositionSizer sizer;

    ExecutionEngine engine(
        portfolio,
        sizer,
        0.0);

    Candle candle(
        "2024-01-01",
        100,
        100,
        100,
        100,
        1000);

    engine.execute(Signal::Buy, candle);
    engine.execute(Signal::Buy, candle);

    EXPECT_EQ(
        portfolio.getTrades().size(),
        1u);
}

TEST(ExecutionEngineTest, CannotSellWithoutPosition)
{
    Portfolio portfolio(1000.0);
    PositionSizer sizer;

    ExecutionEngine engine(
        portfolio,
        sizer,
        0.0);

    Candle candle(
        "2024-01-01",
        100,
        100,
        100,
        100,
        1000);

    engine.execute(
        Signal::Sell,
        candle);

    EXPECT_TRUE(
        portfolio.getTrades().empty());
}

TEST(ExecutionEngineTest, BuyUsesSlippage)
{
    Portfolio portfolio(1000.0);
    PositionSizer sizer;

    ExecutionEngine engine(
        portfolio,
        sizer,
        0.01);

    Candle candle(
        "2024-01-01",
        100,
        100,
        100,
        100,
        1000);

    engine.execute(
        Signal::Buy,
        candle);

    EXPECT_LT(
        portfolio.cash(),
        1000.0);
}

TEST(ExecutionEngineTest, SellUsesSlippage)
{
    Portfolio portfolio(1000.0);
    PositionSizer sizer;

    ExecutionEngine engine(
        portfolio,
        sizer,
        0.01);

    Candle candle(
        "2024-01-01",
        100,
        100,
        100,
        100,
        1000);

    engine.execute(Signal::Buy, candle);
    engine.execute(Signal::Sell, candle);

    EXPECT_GT(
        portfolio.cash(),
        0.0);
}

TEST(ExecutionEngineTest, ExitDecisionExecutesSell)
{
    Portfolio portfolio(1000.0);
    PositionSizer sizer;

    ExecutionEngine engine(
        portfolio,
        sizer,
        0.0);

    Candle candle(
        "2024-01-01",
        100,
        100,
        100,
        100,
        1000);

    engine.execute(
        Signal::Buy,
        candle);

    ExitDecision decision{
        true,
        ExitReason::StopLoss,
        95.0
    };

    engine.execute(
        decision,
        candle);

    EXPECT_EQ(
        portfolio.position(),
        0);
}

TEST(ExecutionEngineTest, ExitDecisionIgnoredWhenFalse)
{
    Portfolio portfolio(1000.0);
    PositionSizer sizer;

    ExecutionEngine engine(
        portfolio,
        sizer,
        0.0);

    Candle candle(
        "2024-01-01",
        100,
        100,
        100,
        100,
        1000);

    ExitDecision decision{};

    engine.execute(
        decision,
        candle);

    EXPECT_TRUE(
        portfolio.getTrades().empty());
}

TEST(ExecutionEngineTest, ExitDecisionIgnoredWithoutPosition)
{
    Portfolio portfolio(1000.0);
    PositionSizer sizer;

    ExecutionEngine engine(
        portfolio,
        sizer,
        0.0);

    Candle candle(
        "2024-01-01",
        100,
        100,
        100,
        100,
        1000);

    ExitDecision decision{
        true,
        ExitReason::StopLoss,
        95.0
    };

    engine.execute(
        decision,
        candle);

    EXPECT_TRUE(
        portfolio.getTrades().empty());
}