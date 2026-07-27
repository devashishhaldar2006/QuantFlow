#include <gtest/gtest.h>
#include "portfolio/Portfolio.hpp"

TEST(PortfolioTests, InitialCashIsSetCorrectly)
{
    Portfolio portfolio(1000.0);

    EXPECT_DOUBLE_EQ(portfolio.cash(), 1000.0);
}

TEST(PortfolioTests, InitialPositionIsZero)
{
    Portfolio portfolio(1000.0);

    EXPECT_EQ(portfolio.position(), 0);
}

TEST(PortfolioTests, InitialTotalValueEqualsCash)
{
    Portfolio portfolio(1000.0);

    EXPECT_DOUBLE_EQ(portfolio.totalValue(), 1000.0);
}

TEST(PortfolioTests, InitialCashGetterReturnsCorrectValue)
{
    Portfolio portfolio(1000.0);

    EXPECT_DOUBLE_EQ(portfolio.initialCash(), 1000.0);
}

TEST(PortfolioTests, StopLossPriceInitiallyZero)
{
    Portfolio portfolio(1000.0);

    EXPECT_DOUBLE_EQ(portfolio.stopLossPrice(), 0.0);
}

TEST(PortfolioTests, TakeProfitPriceInitiallyZero)
{
    Portfolio portfolio(1000.0);

    EXPECT_DOUBLE_EQ(portfolio.takeProfitPrice(), 0.0);
}

TEST(PortfolioTests, NoTradesInitially)
{
    Portfolio portfolio(1000.0);

    EXPECT_TRUE(portfolio.getTrades().empty());
}

TEST(PortfolioTests, EquityCurveStartsEmpty)
{
    Portfolio portfolio(1000.0);

    EXPECT_TRUE(portfolio.getEquityCurve().empty());
}

// ============================================================
// Buy Validation Tests
// ============================================================

TEST(PortfolioTests, BuyThrowsWhenQuantityIsZero)
{
    Portfolio portfolio(1000.0);

    EXPECT_THROW(
        portfolio.buy(0, 100.0, "2026-07-27"),
        std::runtime_error
    );
}

TEST(PortfolioTests, BuyThrowsWhenQuantityIsNegative)
{
    Portfolio portfolio(1000.0);

    EXPECT_THROW(
        portfolio.buy(-5, 100.0, "2026-07-27"),
        std::runtime_error
    );
}

TEST(PortfolioTests, BuyThrowsWhenPriceIsZero)
{
    Portfolio portfolio(1000.0);

    EXPECT_THROW(
        portfolio.buy(5, 0.0, "2026-07-27"),
        std::runtime_error
    );
}

TEST(PortfolioTests, BuyThrowsWhenPriceIsNegative)
{
    Portfolio portfolio(1000.0);

    EXPECT_THROW(
        portfolio.buy(5, -100.0, "2026-07-27"),
        std::runtime_error
    );
}

TEST(PortfolioTests, BuyThrowsWhenInsufficientFunds)
{
    Portfolio portfolio(1000.0);

    EXPECT_THROW(
        portfolio.buy(20, 100.0, "2026-07-27"),
        std::runtime_error
    );
}

// ============================================================
// Buy Behavior Tests
// ============================================================

TEST(PortfolioTests, BuyReducesCash)
{
    Portfolio portfolio(1000.0);

    portfolio.buy(5, 100.0, "2026-07-27");

    EXPECT_DOUBLE_EQ(portfolio.cash(), 500.0);
}

TEST(PortfolioTests, BuyIncreasesPosition)
{
    Portfolio portfolio(1000.0);

    portfolio.buy(5, 100.0, "2026-07-27");

    EXPECT_EQ(portfolio.position(), 5);
}

TEST(PortfolioTests, BuyRecordsTrade)
{
    Portfolio portfolio(1000.0);

    portfolio.buy(5, 100.0, "2026-07-27");

    EXPECT_EQ(portfolio.getTrades().size(), 1u);
}

TEST(PortfolioTests, BuyUpdatesTotalValue)
{
    Portfolio portfolio(1000.0);

    portfolio.buy(5, 100.0, "2026-07-27");

    EXPECT_DOUBLE_EQ(portfolio.totalValue(), 1000.0);
}

TEST(PortfolioTests, BuyCalculatesStopLossPrice)
{
    Portfolio portfolio(1000.0, 0.0, 0.05);

    portfolio.buy(5, 100.0, "2026-07-27");

    EXPECT_DOUBLE_EQ(portfolio.stopLossPrice(), 95.0);
}

TEST(PortfolioTests, BuyCalculatesTakeProfitPrice)
{
    Portfolio portfolio(1000.0, 0.0, 0.0, 0.10);

    portfolio.buy(5, 100.0, "2026-07-27");

    EXPECT_DOUBLE_EQ(portfolio.takeProfitPrice(), 110.0);
}