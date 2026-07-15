#include "io/CSVParser.hpp"

#include <fstream>
#include <sstream>
#include <stdexcept>

Candle CSVParser::parseRow(const std::string& line)
{
    std::stringstream ss(line);

    std::string timestamp;
    std::string openStr;
    std::string highStr;
    std::string lowStr;
    std::string closeStr;
    std::string volumeStr;

    if (!std::getline(ss, timestamp, ',') ||
        !std::getline(ss, openStr, ',') ||
        !std::getline(ss, highStr, ',') ||
        !std::getline(ss, lowStr, ',') ||
        !std::getline(ss, closeStr, ',') ||
        !std::getline(ss, volumeStr, ','))
    {
        throw std::runtime_error("Malformed CSV row.");
    }

    return Candle(
        timestamp,
        std::stod(openStr),
        std::stod(highStr),
        std::stod(lowStr),
        std::stod(closeStr),
        std::stoll(volumeStr));
}

MarketData CSVParser::parse(const std::string& filePath)
{
    std::ifstream file(filePath);

    if (!file)
    {
        throw std::runtime_error("Could not open file: " + filePath);
    }

    std::string line;

    // Read and discard the CSV header row.
    if (!std::getline(file, line))
    {
        throw std::runtime_error("CSV file is empty.");
    }

    MarketData marketData;

    while (std::getline(file, line))
    {
        marketData.addCandle(parseRow(line));
    }

    return marketData;
}