#include "io/CSVParser.hpp"
#include <fstream>
#include <sstream>
#include <stdexcept>

MarketData CSVParser::parse(const std::string& filePath) {
    std::ifstream file(filePath);
    if (!file.is_open()) {
        throw std::runtime_error("Could not open file: " + filePath);
    }
    MarketData marketData;
    return marketData;
}