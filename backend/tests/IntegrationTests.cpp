#include <gtest/gtest.h>

#include "engine/BacktestEngine.hpp"
#include "execution/ExecutionEngine.hpp"
#include "market/MarketData.hpp"
#include "portfolio/Portfolio.hpp"
#include "risk/PositionSizer.hpp"
#include "risk/RiskManager.hpp"
#include "strategy/AlwaysHoldStrategy.hpp"

TEST(IntegrationTest, AlwaysHoldProducesNoTrades)
{
    MarketData data;

    for (int i = 0; i < 20; ++i)
    {
        data.addCandle(
            Candle(
                "2024-01-01",
                100,
                101,
                99,
                100,
                1000));
    }

    Portfolio portfolio(1000.0);

    PositionSizer sizer;

    ExecutionEngine execution(
        portfolio,
        sizer,
        0.0);

    RiskManager risk(portfolio);

    AlwaysHoldStrategy strategy;

    BacktestEngine engine(
        data,
        strategy,
        execution,
        portfolio,
        risk);

    engine.run();

    EXPECT_TRUE(
        portfolio.getTrades().empty());

    EXPECT_EQ(
        portfolio.position(),
        0);

    EXPECT_DOUBLE_EQ(
        portfolio.cash(),
        1000.0);

    EXPECT_EQ(
        portfolio.getEquityCurve().size(),
        data.size());
}

TEST(IntegrationTest, EquityCurveRecordedEveryCandle)
{
    MarketData data;

    for (int i = 0; i < 50; ++i)
    {
        data.addCandle(
            Candle(
                "2024-01-01",
                100,
                101,
                99,
                100,
                1000));
    }

    Portfolio portfolio(1000.0);

    PositionSizer sizer;

    ExecutionEngine execution(
        portfolio,
        sizer,
        0.0);

    RiskManager risk(portfolio);

    AlwaysHoldStrategy strategy;

    BacktestEngine engine(
        data,
        strategy,
        execution,
        portfolio,
        risk);

    engine.run();

    EXPECT_EQ(
        portfolio.getEquityCurve().size(),
        50u);
}

TEST(IntegrationTest, EmptyMarketDataDoesNothing)
{
    MarketData data;

    Portfolio portfolio(1000.0);

    PositionSizer sizer;

    ExecutionEngine execution(
        portfolio,
        sizer,
        0.0);

    RiskManager risk(portfolio);

    AlwaysHoldStrategy strategy;

    BacktestEngine engine(
        data,
        strategy,
        execution,
        portfolio,
        risk);

    engine.run();

    EXPECT_TRUE(
        portfolio.getTrades().empty());

    EXPECT_TRUE(
        portfolio.getEquityCurve().empty());
}

TEST(IntegrationTest, SingleCandleWorks)
{
    MarketData data;

    data.addCandle(
        Candle(
            "2024-01-01",
            100,
            101,
            99,
            100,
            1000));

    Portfolio portfolio(1000.0);

    PositionSizer sizer;

    ExecutionEngine execution(
        portfolio,
        sizer,
        0.0);

    RiskManager risk(portfolio);

    AlwaysHoldStrategy strategy;

    BacktestEngine engine(
        data,
        strategy,
        execution,
        portfolio,
        risk);

    engine.run();

    EXPECT_EQ(
        portfolio.getEquityCurve().size(),
        1u);
}

TEST(IntegrationTest, PortfolioValueRemainsConstantWithoutTrades)
{
    MarketData data;

    for (int i = 0; i < 20; ++i)
    {
        data.addCandle(
            Candle(
                "2024-01-01",
                100,
                101,
                99,
                100,
                1000));
    }

    Portfolio portfolio(1000.0);

    PositionSizer sizer;

    ExecutionEngine execution(
        portfolio,
        sizer,
        0.0);

    RiskManager risk(portfolio);

    AlwaysHoldStrategy strategy;

    BacktestEngine engine(
        data,
        strategy,
        execution,
        portfolio,
        risk);

    engine.run();

    EXPECT_DOUBLE_EQ(
        portfolio.totalValue(),
        1000.0);
}