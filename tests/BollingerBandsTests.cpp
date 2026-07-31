#include "indicators/BollingerBands.hpp"

#include <gtest/gtest.h>

#include <cmath>
#include <limits>
#include <stdexcept>
#include <vector>

TEST(BollingerBandsTest, ThrowsForZeroPeriod)
{
    EXPECT_THROW(
        BollingerBands(0, 2.0),
        std::invalid_argument);
}

TEST(BollingerBandsTest, ThrowsForZeroMultiplier)
{
    EXPECT_THROW(
        BollingerBands(20, 0.0),
        std::invalid_argument);
}

TEST(BollingerBandsTest, ThrowsForNegativeMultiplier)
{
    EXPECT_THROW(
        BollingerBands(20, -2.0),
        std::invalid_argument);
}

TEST(BollingerBandsTest, EmptyInputReturnsEmptyVectors)
{
    BollingerBands bands;

    std::vector<double> prices;

    auto result = bands.calculate(prices);

    EXPECT_TRUE(result.upper.empty());
    EXPECT_TRUE(result.middle.empty());
    EXPECT_TRUE(result.lower.empty());
}

TEST(BollingerBandsTest, NotEnoughPricesReturnsNaNVectors)
{
    BollingerBands bands(20);

    std::vector<double> prices = {1,2,3,4,5};

    auto result = bands.calculate(prices);

    ASSERT_EQ(result.upper.size(), prices.size());
    ASSERT_EQ(result.middle.size(), prices.size());
    ASSERT_EQ(result.lower.size(), prices.size());

    for (std::size_t i = 0; i < prices.size(); ++i)
    {
        EXPECT_TRUE(std::isnan(result.upper[i]));
        EXPECT_TRUE(std::isnan(result.middle[i]));
        EXPECT_TRUE(std::isnan(result.lower[i]));
    }
}

TEST(BollingerBandsTest, OutputSizeMatchesInputSize)
{
    BollingerBands bands;

    std::vector<double> prices(100, 100.0);

    auto result = bands.calculate(prices);

    EXPECT_EQ(result.upper.size(), prices.size());
    EXPECT_EQ(result.middle.size(), prices.size());
    EXPECT_EQ(result.lower.size(), prices.size());
}

TEST(BollingerBandsTest, InitialValuesAreNaN)
{
    BollingerBands bands(20);

    std::vector<double> prices(100, 100.0);

    auto result = bands.calculate(prices);

    for (std::size_t i = 0; i < 19; ++i)
    {
        EXPECT_TRUE(std::isnan(result.upper[i]));
        EXPECT_TRUE(std::isnan(result.middle[i]));
        EXPECT_TRUE(std::isnan(result.lower[i]));
    }

    EXPECT_FALSE(std::isnan(result.upper[19]));
    EXPECT_FALSE(std::isnan(result.middle[19]));
    EXPECT_FALSE(std::isnan(result.lower[19]));
}

TEST(BollingerBandsTest, ConstantPricesProduceEqualBands)
{
    BollingerBands bands(20);

    std::vector<double> prices(50, 100.0);

    auto result = bands.calculate(prices);

    for (std::size_t i = 19; i < prices.size(); ++i)
    {
        EXPECT_DOUBLE_EQ(result.middle[i], 100.0);
        EXPECT_DOUBLE_EQ(result.upper[i], 100.0);
        EXPECT_DOUBLE_EQ(result.lower[i], 100.0);
    }
}

TEST(BollingerBandsTest, UpperBandIsGreaterThanOrEqualToMiddleBand)
{
    BollingerBands bands(20);

    std::vector<double> prices;

    for (int i = 1; i <= 100; ++i)
    {
        prices.push_back(static_cast<double>(i));
    }

    auto result = bands.calculate(prices);

    for (std::size_t i = 19; i < prices.size(); ++i)
    {
        EXPECT_GE(result.upper[i], result.middle[i]);
    }
}

TEST(BollingerBandsTest, MiddleBandIsGreaterThanOrEqualToLowerBand)
{
    BollingerBands bands(20);

    std::vector<double> prices;

    for (int i = 1; i <= 100; ++i)
    {
        prices.push_back(static_cast<double>(i));
    }

    auto result = bands.calculate(prices);

    for (std::size_t i = 19; i < prices.size(); ++i)
    {
        EXPECT_GE(result.middle[i], result.lower[i]);
    }
}

TEST(BollingerBandsTest, IncreasingPricesProduceValidBands)
{
    BollingerBands bands(20);

    std::vector<double> prices;

    for (int i = 1; i <= 50; ++i)
    {
        prices.push_back(static_cast<double>(i));
    }

    auto result = bands.calculate(prices);

    for (std::size_t i = 19; i < prices.size(); ++i)
    {
        EXPECT_TRUE(std::isfinite(result.upper[i]));
        EXPECT_TRUE(std::isfinite(result.middle[i]));
        EXPECT_TRUE(std::isfinite(result.lower[i]));

        EXPECT_GT(result.upper[i], result.middle[i]);
        EXPECT_GT(result.middle[i], result.lower[i]);
    }
}

TEST(BollingerBandsTest, CustomMultiplierProducesWiderBands)
{
    BollingerBands bands1(20, 1.0);
    BollingerBands bands2(20, 3.0);

    std::vector<double> prices;

    for (int i = 1; i <= 50; ++i)
    {
        prices.push_back(static_cast<double>(i));
    }

    auto result1 = bands1.calculate(prices);
    auto result2 = bands2.calculate(prices);

    for (std::size_t i = 19; i < prices.size(); ++i)
    {
        double width1 = result1.upper[i] - result1.lower[i];
        double width2 = result2.upper[i] - result2.lower[i];

        EXPECT_GT(width2, width1);
    }
}