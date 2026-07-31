#include <gtest/gtest.h>
#include <cmath>

#include "indicators/RSI.hpp"

TEST(RSITest, ConstructorThrowsForZeroPeriod)
{
    EXPECT_THROW(RSI(0), std::invalid_argument);
}

TEST(RSITest, EmptyInputReturnsEmptyVector)
{
    RSI rsi;

    std::vector<double> prices;

    auto result = rsi.calculate(prices);

    EXPECT_TRUE(result.empty());
}

TEST(RSITest, NotEnoughPricesReturnsNaNVector)
{
    RSI rsi(14);

    std::vector<double> prices = {1.0, 2.0, 3.0};

    auto result = rsi.calculate(prices);

    EXPECT_EQ(result.size(), prices.size());

    for (double value : result)
    {
        EXPECT_TRUE(std::isnan(value));
    }
}

TEST(RSITest, OutputSizeMatchesInputSize)
{
    RSI rsi(14);

    std::vector<double> prices;

    for (int i = 0; i < 20; ++i)
    {
        prices.push_back(100.0 + i);
    }

    auto result = rsi.calculate(prices);

    EXPECT_EQ(result.size(), prices.size());
}

TEST(RSITest, InitialValuesAreNaN)
{
    RSI rsi(14);

    std::vector<double> prices;

    for (int i = 0; i < 20; ++i)
    {
        prices.push_back(100.0 + i);
    }

    auto result = rsi.calculate(prices);

    for (std::size_t i = 0; i < 14; ++i)
    {
        EXPECT_TRUE(std::isnan(result[i]));
    }
}

TEST(RSITest, IncreasingPricesProduceHighRSI)
{
    RSI rsi(14);

    std::vector<double> prices;

    for (int i = 0; i < 30; ++i)
    {
        prices.push_back(100.0 + i);
    }

    auto result = rsi.calculate(prices);

    EXPECT_GT(result.back(), 95.0);
}

TEST(RSITest, DecreasingPricesProduceLowRSI)
{
    RSI rsi(14);

    std::vector<double> prices;

    for (int i = 0; i < 30; ++i)
    {
        prices.push_back(100.0 - i);
    }

    auto result = rsi.calculate(prices);

    EXPECT_LT(result.back(), 5.0);
}

TEST(RSITest, RSIValuesRemainWithinBounds)
{
    RSI rsi(14);

    std::vector<double> prices =
    {
        100, 102, 101, 105, 103,
        107, 104, 108, 106, 110,
        109, 111, 108, 112, 110,
        115, 113, 117, 116, 120
    };

    auto result = rsi.calculate(prices);

    for (double value : result)
    {
        if (!std::isnan(value))
        {
            EXPECT_GE(value, 0.0);
            EXPECT_LE(value, 100.0);
        }
    }
}