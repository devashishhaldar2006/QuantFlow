# QuantFlow

> A production-quality quantitative trading engine built with Modern C++20.

QuantFlow is a modular backtesting engine designed to simulate and evaluate quantitative trading strategies while following modern C++ software engineering principles. The project focuses on clean architecture, extensibility, testing, and production-quality development practices.

---

## ✨ Features

### 📊 Market Data

- CSV market data loader
- OHLCV candle support
- Configuration-driven data loading

### 📈 Trading Engine

- Modular strategy interface
- Strategy Factory
- Backtesting engine
- Portfolio management
- Trade execution engine

### 💰 Risk Management

- Position sizing
- Commission simulation
- Slippage simulation
- Fixed Stop-Loss
- Fixed Take-Profit

### 📉 Performance Analytics

- Trade history
- Equity curve generation
- Performance report
- Annualized Return
- Annualized Volatility
- Sharpe Ratio

### 📊 Technical Indicators

- Simple Moving Average (SMA)
- Relative Strength Index (RSI)

### 🧪 Software Engineering

- Modern C++20
- CMake build system
- GoogleTest unit testing
- CTest integration
- GitHub Actions CI/CD
- Modular project architecture
- Feature branch Git workflow

---

# Project Architecture

```
                      QuantFlow

                 +----------------+
                 |   CSV Loader   |
                 +----------------+
                          |
                          ▼
                 +----------------+
                 |   Market Data  |
                 +----------------+
                          |
                          ▼
                 +----------------+
                 |   Indicators   |
                 +----------------+
                          |
                          ▼
                 +----------------+
                 |   Strategies   |
                 +----------------+
                          |
                          ▼
                 +----------------+
                 | Backtest Engine|
                 +----------------+
                          |
          +---------------+---------------+
          |                               |
          ▼                               ▼
+--------------------+          +------------------+
| Execution Engine   |          |  Risk Manager    |
+--------------------+          +------------------+
          |                               |
          +---------------+---------------+
                          |
                          ▼
                 +----------------+
                 |   Portfolio    |
                 +----------------+
                          |
                          ▼
                 +----------------+
                 | Performance    |
                 |   Analyzer     |
                 +----------------+
                          |
                          ▼
                 +----------------+
                 |  Statistics    |
                 +----------------+
```

---

# Intrabar Execution Assumption

When both the **Stop Loss** and **Take Profit** are reached within the same OHLC candle, QuantFlow **v1** assumes the **Stop Loss is executed first**.

This conservative assumption prevents overly optimistic backtest results and better reflects realistic execution uncertainty.

---

# Technology Stack

- C++20
- STL
- CMake
- GoogleTest
- CTest
- Git
- GitHub Actions

---

# Project Structure

```
QuantFlow/
│
├── include/
│   ├── analytics/
│   ├── backtest/
│   ├── config/
│   ├── execution/
│   ├── indicators/
│   ├── market/
│   ├── portfolio/
│   ├── risk/
│   ├── strategies/
│   └── utils/
│
├── src/
├── tests/
├── data/
├── config/
├── docs/
├── .github/
│   └── workflows/
│
├── CMakeLists.txt
└── README.md
```

---

# Build

Clone the repository

```bash
git clone https://github.com/<your-username>/QuantFlow.git
```

Enter the project

```bash
cd QuantFlow
```

Configure

```bash
cmake -S . -B build
```

Build

```bash
cmake --build build
```

---

# Run Tests

```bash
ctest --test-dir build --output-on-failure
```

---

# Implemented Components

- ✅ CSV Loader
- ✅ Configuration System
- ✅ Market Data
- ✅ Strategy Interface
- ✅ Strategy Factory
- ✅ Moving Average Crossover Strategy
- ✅ Portfolio
- ✅ Execution Engine
- ✅ Position Sizer
- ✅ Risk Manager
- ✅ Backtest Engine
- ✅ Performance Analyzer
- ✅ Statistics Module
- ✅ Simple Moving Average (SMA)
- ✅ Relative Strength Index (RSI)
- ✅ GoogleTest
- ✅ GitHub Actions CI/CD

---

# Roadmap

### Technical Indicators

- ✅ SMA
- ✅ RSI
- ✅ Bollinger Bands
- ✅ MACD
- ✅ ATR

### Strategies

- ✅ RSI Strategy
- ✅ Bollinger Bands Strategy
- ✅ MACD Strategy
- ⏳ Multi-Indicator Strategy

### Performance

- ⏳ Maximum Drawdown
- ⏳ Sortino Ratio
- ⏳ Calmar Ratio
- ⏳ Benchmark Comparison

### Engine Improvements

- ⏳ Multi-Asset Support
- ⏳ Portfolio Optimization
- ⏳ Parameter Optimization
- ⏳ Walk-Forward Analysis
- ⏳ Multi-threaded Backtesting

### Future

- ⏳ REST API
- ⏳ React Dashboard
- ⏳ Docker Support

---

# Learning Objectives

This project is being developed to gain hands-on experience with:

- Modern C++20
- Object-Oriented Design
- SOLID Principles
- Generic Programming
- CMake
- Unit Testing
- Continuous Integration
- Quantitative Finance
- Performance Optimization
- Large-Scale Software Architecture

---

# License

This project is licensed under the MIT License.