#include "config/ConfigParser.hpp"

#include <gtest/gtest.h>

#include <cstdio>
#include <fstream>
#include <stdexcept>

TEST(ConfigParserTest, ThrowsWhenFileDoesNotExist)
{
    EXPECT_THROW(
        ConfigParser::parse("does_not_exist.json"),
        std::runtime_error);
}

TEST(ConfigParserTest, ThrowsForInvalidJson)
{
    const std::string filename = "invalid_config.json";

    std::ofstream file(filename);
    file << "{ invalid json ";
    file.close();

    EXPECT_THROW(
        ConfigParser::parse(filename),
        std::runtime_error);

    std::remove(filename.c_str());
}

TEST(ConfigParserTest, ParsesValidConfiguration)
{
    const std::string filename = "config.json";

    std::ofstream file(filename);

    file <<
R"({
    "csvFile":"btc.csv",
    "strategy":"RSI",
    "initialCash":10000,
    "commission":0.001,
    "stopLossPercent":0.05,
    "takeProfitPercent":0.10,
    "slippage":0.0005,
    "shortMAPeriod":10,
    "longMAPeriod":20,
    "rsiPeriod":14,
    "oversold":30,
    "overbought":70,
    "fastEMAPeriod":10,
    "slowEMAPeriod":20,
    "macdFastPeriod":12,
    "macdSlowPeriod":26,
    "macdSignalPeriod":9,
    "bollingerPeriod":20,
    "bollingerMultiplier":2.0,
    "atrPeriod":14,
    "minimumATR":1.0
})";

    file.close();

    Config config =
        ConfigParser::parse(filename);

    EXPECT_EQ(config.csvFile, "btc.csv");
    EXPECT_EQ(config.strategy, "RSI");
    EXPECT_DOUBLE_EQ(config.initialCash, 10000);
    EXPECT_DOUBLE_EQ(config.commission, 0.001);
    EXPECT_DOUBLE_EQ(config.stopLossPercent, 0.05);
    EXPECT_DOUBLE_EQ(config.takeProfitPercent, 0.10);
    EXPECT_DOUBLE_EQ(config.slippage, 0.0005);

    EXPECT_EQ(config.shortMAPeriod, 10);
    EXPECT_EQ(config.longMAPeriod, 20);

    EXPECT_EQ(config.rsiPeriod, 14);
    EXPECT_DOUBLE_EQ(config.oversold, 30);
    EXPECT_DOUBLE_EQ(config.overbought, 70);

    EXPECT_EQ(config.fastEMAPeriod, 10);
    EXPECT_EQ(config.slowEMAPeriod, 20);

    EXPECT_EQ(config.macdFastPeriod, 12);
    EXPECT_EQ(config.macdSlowPeriod, 26);
    EXPECT_EQ(config.macdSignalPeriod, 9);

    EXPECT_EQ(config.bollingerPeriod, 20);
    EXPECT_DOUBLE_EQ(config.bollingerMultiplier, 2.0);

    EXPECT_EQ(config.atrPeriod, 14);
    EXPECT_DOUBLE_EQ(config.minimumATR, 1.0);

    std::remove(filename.c_str());
}

TEST(ConfigParserTest, ThrowsWhenRequiredFieldIsMissing)
{
    const std::string filename = "missing.json";

    std::ofstream file(filename);

    file <<
R"({
    "strategy":"RSI"
})";

    file.close();

    EXPECT_THROW(
        ConfigParser::parse(filename),
        std::exception);

    std::remove(filename.c_str());
}

TEST(ConfigParserTest, ThrowsWhenFieldHasWrongType)
{
    const std::string filename = "wrong_type.json";

    std::ofstream file(filename);

    file <<
R"({
    "csvFile":"btc.csv",
    "strategy":"RSI",
    "initialCash":"abc",
    "commission":0.001,
    "stopLossPercent":0.05,
    "takeProfitPercent":0.10,
    "slippage":0.0005,
    "shortMAPeriod":10,
    "longMAPeriod":20
})";

    file.close();

    EXPECT_THROW(
        ConfigParser::parse(filename),
        std::exception);

    std::remove(filename.c_str());
}

TEST(ConfigParserTest, UsesDefaultValuesForOptionalFields)
{
    const std::string filename = "defaults.json";

    std::ofstream file(filename);

    file <<
R"({
    "csvFile":"btc.csv",
    "strategy":"AlwaysHold",
    "initialCash":10000,
    "commission":0.001,
    "stopLossPercent":0.05,
    "takeProfitPercent":0.10,
    "slippage":0.0005,
    "shortMAPeriod":10,
    "longMAPeriod":20
})";

    file.close();

    Config config =
        ConfigParser::parse(filename);

    EXPECT_EQ(config.rsiPeriod, 14);
    EXPECT_DOUBLE_EQ(config.oversold, 30.0);
    EXPECT_DOUBLE_EQ(config.overbought, 70.0);

    EXPECT_EQ(config.fastEMAPeriod, 10);
    EXPECT_EQ(config.slowEMAPeriod, 20);

    EXPECT_EQ(config.macdFastPeriod, 12);
    EXPECT_EQ(config.macdSlowPeriod, 26);
    EXPECT_EQ(config.macdSignalPeriod, 9);

    EXPECT_EQ(config.bollingerPeriod, 20);
    EXPECT_DOUBLE_EQ(config.bollingerMultiplier, 2.0);

    EXPECT_EQ(config.atrPeriod, 14);
    EXPECT_DOUBLE_EQ(config.minimumATR, 1.0);

    std::remove(filename.c_str());
}