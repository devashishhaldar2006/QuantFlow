#include "config/ConfigParser.hpp"

#include <fstream>
#include <stdexcept>

#include <nlohmann/json.hpp>

using json = nlohmann::json;

Config ConfigParser::parse(const std::string &filePath)
{
    std::ifstream file(filePath);

    if (!file.is_open())
    {
        throw std::runtime_error(
            "Could not open config file: " + filePath);
    }
    json j;

    try
    {
        file >> j;
    }
    catch (const json::exception &e)
    {
        throw std::runtime_error(
            "Invalid JSON in config file: " +
            filePath +
            " (" +
            std::string(e.what()) +
            ")");
    }

    Config config;

    config.csvFile = j.at("csvFile").get<std::string>();

    config.initialCash = j.at("initialCash").get<double>();

    config.commission = j.at("commission").get<double>();

    config.stopLossPercent = j.at("stopLossPercent").get<double>();

    config.takeProfitPercent = j.at("takeProfitPercent").get<double>();

    config.shortMAPeriod = j.at("shortMAPeriod").get<int>();

    config.longMAPeriod = j.at("longMAPeriod").get<int>();

    config.strategy =
        j.at("strategy").get<std::string>();

    config.slippage =
        j.at("slippage").get<double>();

    config.rsiPeriod =
        j.value("rsiPeriod", 14);

    config.oversold =
        j.value("oversold", 30.0);

    config.overbought =
        j.value("overbought", 70.0);

    config.fastEMAPeriod =
        j.value("fastEMAPeriod", 10);

    config.slowEMAPeriod =
        j.value("slowEMAPeriod", 20);

    config.macdFastPeriod =
        j.value("macdFastPeriod", 12);

    config.macdSlowPeriod =
        j.value("macdSlowPeriod", 26);

    config.macdSignalPeriod =
        j.value("macdSignalPeriod", 9);

    config.bollingerPeriod =
        j.value("bollingerPeriod", 20);

    config.bollingerMultiplier =
        j.value("bollingerMultiplier", 2.0);

    config.atrPeriod =
        j.value("atrPeriod", 14);

    config.minimumATR =
        j.value("minimumATR", 1.0);

    return config;
}