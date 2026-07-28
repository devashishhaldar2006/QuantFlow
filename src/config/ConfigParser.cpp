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

    file >> j;

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

    return config;
}