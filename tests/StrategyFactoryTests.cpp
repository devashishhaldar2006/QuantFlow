#include "strategy/StrategyFactory.hpp"

#include <gtest/gtest.h>

TEST(StrategyFactoryTest, CreatesAlwaysHoldStrategy)
{
    Config config;
    config.strategy = "AlwaysHold";

    auto strategy =
        StrategyFactory::create(config);

    EXPECT_NE(strategy, nullptr);
}

TEST(StrategyFactoryTest, CreatesMovingAverageCrossStrategy)
{
    Config config;
    config.strategy = "MovingAverageCross";
    config.shortMAPeriod = 10;
    config.longMAPeriod = 20;

    auto strategy =
        StrategyFactory::create(config);

    EXPECT_NE(strategy, nullptr);
}

TEST(StrategyFactoryTest, CreatesRSIStrategy)
{
    Config config;
    config.strategy = "RSI";
    config.rsiPeriod = 14;
    config.oversold = 30.0;
    config.overbought = 70.0;

    auto strategy =
        StrategyFactory::create(config);

    EXPECT_NE(strategy, nullptr);
}

TEST(StrategyFactoryTest, CreatesEMACrossStrategy)
{
    Config config;
    config.strategy = "EMACross";
    config.fastEMAPeriod = 10;
    config.slowEMAPeriod = 20;

    auto strategy =
        StrategyFactory::create(config);

    EXPECT_NE(strategy, nullptr);
}

TEST(StrategyFactoryTest, CreatesMACDStrategy)
{
    Config config;
    config.strategy = "MACD";
    config.macdFastPeriod = 12;
    config.macdSlowPeriod = 26;
    config.macdSignalPeriod = 9;

    auto strategy =
        StrategyFactory::create(config);

    EXPECT_NE(strategy, nullptr);
}

TEST(StrategyFactoryTest, CreatesBollingerStrategy)
{
    Config config;
    config.strategy = "Bollinger";
    config.bollingerPeriod = 20;
    config.bollingerMultiplier = 2.0;

    auto strategy =
        StrategyFactory::create(config);

    EXPECT_NE(strategy, nullptr);
}

TEST(StrategyFactoryTest, CreatesATRFilterStrategy)
{
    Config config;
    config.strategy = "ATRFilter";
    config.atrPeriod = 14;
    config.minimumATR = 1.0;

    auto strategy =
        StrategyFactory::create(config);

    EXPECT_NE(strategy, nullptr);
}

TEST(StrategyFactoryTest, ThrowsForUnknownStrategy)
{
    Config config;
    config.strategy = "UnknownStrategy";

    EXPECT_THROW(
        StrategyFactory::create(config),
        std::runtime_error);
}