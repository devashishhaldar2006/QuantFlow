#include <iostream>
#include "io/CSVParser.hpp"
int main()
{
    try
    {
        MarketData marketData = CSVParser::parse("data/sample.csv");
        std::cout << "Candle count: " << marketData.size() << "\n";

        const Candle &firstCandle = marketData.getCandle(0);
        std::cout << "First Candle - Timestamp: " << firstCandle.getTimestamp()
                  << ", Open: " << firstCandle.getOpen()
                  << ", High: " << firstCandle.getHigh()
                  << ", Low: " << firstCandle.getLow()
                  << ", Close: " << firstCandle.getClose()
                  << ", Volume: " << firstCandle.getVolume() << "\n";
    }
    catch (const std::exception &e)
    {
        std::cerr << "Error: " << e.what() << "\n";
        return 1;
    }

    return 0;
}