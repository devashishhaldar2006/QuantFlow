#pragma once

#include <string>

class Candle
{
private:
    std::string timestamp_;
    double open_;
    double high_;
    double low_;
    double close_;
    long long volume_;

    void validate() const;

public:
    Candle(const std::string& timestamp,
           double open,
           double high,
           double low,
           double close,
           long long volume);

    const std::string& getTimestamp() const;

    double getOpen() const;
    double getHigh() const;
    double getLow() const;
    double getClose() const;

    long long getVolume() const;
};