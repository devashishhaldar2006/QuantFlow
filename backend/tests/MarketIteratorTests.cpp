#include "engine/MarketIterator.hpp"

#include <gtest/gtest.h>

TEST(MarketIteratorTest, StartsAtIndexZero)
{
    MarketData data;

    data.addCandle(
        Candle(
    "2024-01-01",
    100,
    105,
    95,
    103,
    1000));

    MarketIterator iterator(data);

    EXPECT_EQ(
        iterator.currentIndex(),
        0u);
}

TEST(MarketIteratorTest, HasNextInitially)
{
    MarketData data;

    data.addCandle(
        Candle(
    "2024-01-01",
    100,
    105,
    95,
    103,
    1000));

    MarketIterator iterator(data);

    EXPECT_TRUE(
        iterator.hasNext());
}

TEST(MarketIteratorTest, CurrentReturnsFirstCandle)
{
    MarketData data;

    data.addCandle(
        Candle(
            "2024-01-01",
            100,
            105,
            95,
            103,
            1000));

    MarketIterator iterator(data);

    EXPECT_DOUBLE_EQ(
        iterator.current().getClose(),
        103.0);
}

TEST(MarketIteratorTest, NextAdvancesIterator)
{
    MarketData data;

    data.addCandle(
        Candle(
            "2024-01-01",
            100,
            105,
            95,
            103,
            1000));

    data.addCandle(
        Candle(
            "2024-01-02",
            110,
            115,
            108,
            112,
            1000));

    MarketIterator iterator(data);

    iterator.next();

    EXPECT_EQ(
        iterator.currentIndex(),
        1u);

    EXPECT_DOUBLE_EQ(
        iterator.current().getClose(),
        112.0);
}

TEST(MarketIteratorTest, ResetReturnsIteratorToBeginning)
{
    MarketData data;

    data.addCandle(
        Candle(
            "2024-01-01",
            100,
            105,
            95,
            103,
            1000));

    data.addCandle(
        Candle(
            "2024-01-02",
            110,
            115,
            108,
            112,
            1000));

    MarketIterator iterator(data);

    iterator.next();
    iterator.reset();

    EXPECT_EQ(
        iterator.currentIndex(),
        0u);

    EXPECT_DOUBLE_EQ(
        iterator.current().getClose(),
        103.0);
}

TEST(MarketIteratorTest, HasNextReturnsFalseAtEnd)
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

    MarketIterator iterator(data);

    iterator.next();

    EXPECT_FALSE(
        iterator.hasNext());
}

TEST(MarketIteratorTest, CurrentThrowsPastEnd)
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

    MarketIterator iterator(data);

    iterator.next();

    EXPECT_THROW(
        iterator.current(),
        std::out_of_range);
}

TEST(MarketIteratorTest, NextPastEndDoesNotAdvanceFurther)
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

    MarketIterator iterator(data);

    iterator.next();
    iterator.next();
    iterator.next();

    EXPECT_EQ(
        iterator.currentIndex(),
        1u);

    EXPECT_FALSE(
        iterator.hasNext());
}