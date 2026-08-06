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
    std::string extra;

    if (!std::getline(ss, timestamp, ',') ||
        !std::getline(ss, openStr, ',') ||
        !std::getline(ss, highStr, ',') ||
        !std::getline(ss, lowStr, ',') ||
        !std::getline(ss, closeStr, ',') ||
        !std::getline(ss, volumeStr, ','))
    {
        throw std::runtime_error("Malformed CSV row: " + line);
    }

    // Ensure there are exactly 6 columns
    if (std::getline(ss, extra, ','))
    {
        throw std::runtime_error("Too many columns in CSV row: " + line);
    }

    try
    {
        return Candle(
            timestamp,
            std::stod(openStr),
            std::stod(highStr),
            std::stod(lowStr),
            std::stod(closeStr),
            std::stoll(volumeStr));
    }
    catch (const std::exception&)
    {
        throw std::runtime_error("Failed to parse CSV row: " + line);
    }
}

MarketData CSVParser::parse(const std::string& filePath)
{
    std::ifstream file(filePath);

    if (!file.is_open())
    {
        throw std::runtime_error(
            "Could not open the specified CSV file");
    }

    std::string line;

    // Read and discard header
    if (!std::getline(file, line))
    {
        throw std::runtime_error("CSV file is empty.");
    }

    MarketData marketData;

    while (std::getline(file, line))
    {
        if (line.empty())
        {
            continue;
        }

        marketData.addCandle(parseRow(line));
    }

    return marketData;
}