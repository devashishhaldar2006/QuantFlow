#pragma once

#include <string>
#include "market/MarketData.hpp"

class CSVParser{
public:
    static MarketData parse(const std::string& filePath);

};