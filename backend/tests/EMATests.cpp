#include "indicators/EMA.hpp"

#include <gtest/gtest.h>

#include <cmath>
#include <limits>
#include <stdexcept>
#include <vector>
TEST(EMATest, ConstructorThrowsForZeroPeriod)
{
    EXPECT_THROW(
        EMA(0),
        std::invalid_argument);
}

TEST(EMATest, EmptyInputReturnsEmptyVector)
{
    EMA ema;

    std::vector<double> prices;

    auto result = ema.calculate(prices);

    EXPECT_TRUE(result.empty());
}

TEST(EMATest, NotEnoughPricesReturnsNaNVector)
{
    EMA ema(5);

    std::vector<double> prices = {1, 2, 3};

    auto result = ema.calculate(prices);

    ASSERT_EQ(result.size(), prices.size());

    for (double value : result)
    {
        EXPECT_TRUE(std::isnan(value));
    }
}

TEST(EMATest, OutputSizeMatchesInputSize)
{
    EMA ema(5);

    std::vector<double> prices(100, 100.0);

    auto result = ema.calculate(prices);

    EXPECT_EQ(result.size(), prices.size());
}

TEST(EMATest, InitialValuesAreNaN)
{
    EMA ema(5);

    std::vector<double> prices(20, 100.0);

    auto result = ema.calculate(prices);

    for (std::size_t i = 0; i < 4; ++i)
    {
        EXPECT_TRUE(std::isnan(result[i]));
    }

    EXPECT_FALSE(std::isnan(result[4]));
}

TEST(EMATest, ConstantPricesProduceConstantEMA)
{
    EMA ema(5);

    std::vector<double> prices(50, 100.0);

    auto result = ema.calculate(prices);

    for (std::size_t i = 4; i < prices.size(); ++i)
    {
        EXPECT_DOUBLE_EQ(result[i], 100.0);
    }
}

TEST(EMATest, IncreasingPricesProduceIncreasingEMA)
{
    EMA ema(5);

    std::vector<double> prices;

    for (int i = 1; i <= 50; ++i)
    {
        prices.push_back(static_cast<double>(i));
    }

    auto result = ema.calculate(prices);

    for (std::size_t i = 5; i < result.size(); ++i)
    {
        EXPECT_GT(result[i], result[i - 1]);
    }
}

TEST(EMATest, FirstEMAEqualsSMA)
{
    EMA ema(5);

    std::vector<double> prices =
    {
        10,
        20,
        30,
        40,
        50
    };

    auto result = ema.calculate(prices);

    EXPECT_DOUBLE_EQ(result[4], 30.0);
}