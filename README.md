# QuantFlow

A production-quality quantitative trading engine built with Modern C++20.

## Goals

- Learn large-scale C++ software engineering
- Build a modular trading engine
- Learn CMake
- Learn testing
- Learn performance optimization
- Learn multithreading


## Features

- CSV market data loader
- Strategy interface
- Portfolio management
- Position sizing
- Trade history
- Equity curve
- Commission simulation
- Slippage simulation
- Fixed stop-loss execution

Intrabar execution: When both stop loss and take profit are reached within the same OHLC candle, QuantFlow v1 assumes the stop loss is executed first. This conservative assumption avoids overstating strategy performance