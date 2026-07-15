#include <iostream>
#include "market/MarketData.hpp"
int main()
{
    std::cout << "Welcome to QuantFlow!\n";
    MarketData marketData;
    marketData.addCandle(Candle("2023-01-01T00:00:00Z", 100.0, 110.0, 90.0, 105.0, 1000));
    marketData.addCandle(Candle("2023-01-02T00:00:00Z", 105.0, 115.0, 95.0, 110.0, 1500));
    std::cout << "Candle count: " << marketData.size() << "\n";
    return 0;
}