#pragma once

#include <string>

#include "config/Config.hpp"

class ConfigParser
{
public:
    static Config parse(const std::string &filePath);
};