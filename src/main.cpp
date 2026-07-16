#include <iostream>
#include "io/CSVParser.hpp"
#include "engine/MarketIterator.hpp"

int main()
{
    MarketData marketData = CSVParser::parse("data/sample.csv");

    MarketIterator iterator(marketData);

    while (iterator.hasNext())
    {
    const Candle& candle = iterator.current();

    std::cout << candle.getTimestamp() << '\n';

    iterator.next();
    }
}