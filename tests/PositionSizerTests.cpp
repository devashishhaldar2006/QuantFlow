#include "risk/PositionSizer.hpp"
#include "portfolio/Portfolio.hpp"

#include <gtest/gtest.h>

TEST(PositionSizerTest, ReturnsZeroWhenPriceIsZero)
{
    Portfolio portfolio(1000.0);
    PositionSizer sizer;

    EXPECT_EQ(
        sizer.calculatePositionSize(
            portfolio,
            0.0),
        0);
}

TEST(PositionSizerTest, ReturnsZeroWhenPriceIsNegative)
{
    Portfolio portfolio(1000.0);
    PositionSizer sizer;

    EXPECT_EQ(
        sizer.calculatePositionSize(
            portfolio,
            -100.0),
        0);
}

TEST(PositionSizerTest, CalculatesQuantityWithoutCommission)
{
    Portfolio portfolio(1000.0);
    PositionSizer sizer;

    EXPECT_EQ(
        sizer.calculatePositionSize(
            portfolio,
            100.0),
        10);
}

TEST(PositionSizerTest, CalculatesQuantityWithCommission)
{
    Portfolio portfolio(
        1000.0,
        0.01);

    PositionSizer sizer;

    EXPECT_EQ(
        sizer.calculatePositionSize(
            portfolio,
            100.0),
        9);
}

TEST(PositionSizerTest, ReturnsZeroWhenCashIsInsufficient)
{
    Portfolio portfolio(50.0);

    PositionSizer sizer;

    EXPECT_EQ(
        sizer.calculatePositionSize(
            portfolio,
            100.0),
        0);
}

TEST(PositionSizerTest, UsesRemainingCash)
{
    Portfolio portfolio(1000.0);

    portfolio.buy(
        5,
        100.0,
        "2024-01-01");

    PositionSizer sizer;

    EXPECT_EQ(
        sizer.calculatePositionSize(
            portfolio,
            100.0),
        5);
}