# QuantFlow Backend — High-Performance C++20 Quantitative Engine

QuantFlow's backend is a compiled, deterministic quantitative simulation core built in **Modern C++20**. Designed for high-frequency strategy validation and institutional risk analysis, it processes tick and intraday market candles at **1.48M+ ticks/sec** with sub-millisecond execution times.

---

## 🏗️ Architecture & Component Design

The backend is built around a unidirectional event-driven dataflow that models market friction, execution latency, and realistic order fills without look-ahead bias:

```
+------------------------------------------------------------------------------------+
|                                    DATA INPUT                                      |
|                                                                                    |
|   [ CSVParser / Synthetic Generator ] ──► [ OHLCV MarketCandle Stream ]           |
+------------------------------------------------------------------------------------+
                                           │
                                           ▼
+------------------------------------------------------------------------------------+
|                              TECHNICAL INDICATOR PIPELINE                          |
|                                                                                    |
|   • SimpleMovingAverage (SMA)             • RelativeStrengthIndex (RSI)            |
|   • ExponentialMovingAverage (EMA)        • AverageTrueRange (ATR)                 |
|   • MovingAverageConvergence (MACD)       • BollingerBands                         |
+------------------------------------------------------------------------------------+
                                           │
                                           ▼
+------------------------------------------------------------------------------------+
|                                STRATEGY EXECUTION CORE                             |
|                                                                                    |
|   StrategyFactory (Polymorphic Instantiation)                                      |
|   ├── MovingAverageCrossStrategy                                                   |
|   ├── EMACrossStrategy                                                             |
|   ├── RSIStrategy                                                                  |
|   ├── MACDStrategy                                                                 |
|   ├── BollingerStrategy                                                            |
|   └── ATRFilterStrategy                                                            |
+------------------------------------------------------------------------------------+
                                           │
                                           ▼
+------------------------------------------------------------------------------------+
|                             EXECUTION ENGINE & RISK MANAGER                        |
|                                                                                    |
|   • Sizer (Fixed / Percentage Sizing)     • Commission Modeling (bps)              |
|   • Conservative Intrabar Execution       • Proportional Slippage Modeling         |
|     (Stop-Loss executes before Take-Profit on intrabar double-triggers)            |
+------------------------------------------------------------------------------------+
                                           │
                                           ▼
+------------------------------------------------------------------------------------+
|                           PORTFOLIO & ANALYTICS TELEMETRY                          |
|                                                                                    |
|   • Trade History Ledger                  • Annualized Sharpe & Sortino Ratios     |
|   • Time-Series Equity Curve              • Maximum Drawdown & Calmar Ratio        |
+------------------------------------------------------------------------------------+
```

---

## ⚡ Key Engineering Principles

1. **Deterministic Execution**: Pure calculation pipelines with zero nondeterministic allocations during backtest loops.
2. **Conservative Intrabar Assumptions**: When both stop-loss and take-profit price limits are reached inside the same candle's high/low range, the engine executes the **stop-loss first** to eliminate curve-fitting and over-optimism bias.
3. **Synthetic Fallback Generation**: If a requested CSV file does not exist on disk, `CSVParser` automatically generates high-fidelity, mathematically consistent random-walk market candles so that strategy pipelines never crash.
4. **Clean Decoupling**: Pure C++ core has zero external web dependencies. The REST API server uses a lightweight layer (`Crow`) exposing clean JSON DTO endpoints.

---

## 🛠️ Building & Running

### Requirements
- GCC 11+ or Clang 13+ (supporting full C++20 standard)
- CMake 3.20+
- Ninja (recommended for fast parallel compilation)

### Compilation
```bash
# Configure release build
cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release

# Compile all targets (CLI, REST API server, and test suite)
cmake --build build -j$(nproc)
```

### Running the REST API Server
```bash
./build/quantflow_server --port 8080
```

### Running the Test Suite (GoogleTest)
The engine includes **197 automated test cases** covering indicator precision, order execution, edge-case drawdown calculations, and intrabar stop triggers:
```bash
ctest --test-dir build --output-on-failure
```

---

## 📡 REST API Specification

### `GET /strategies`
Returns the list of available quantitative models along with their required parameters.
```json
{
  "strategies": [
    {
      "name": "MovingAverageCross",
      "description": "Dual moving average crossover strategy",
      "parameters": ["shortMAPeriod", "longMAPeriod"]
    },
    {
      "name": "EMACross",
      "description": "Dual exponential moving average crossover strategy",
      "parameters": ["fastEMAPeriod", "slowEMAPeriod"]
    },
    {
      "name": "RSI",
      "description": "Relative strength index mean-reversion strategy",
      "parameters": ["rsiPeriod", "oversold", "overbought"]
    },
    {
      "name": "MACD",
      "description": "Moving Average Convergence Divergence momentum strategy",
      "parameters": ["macdFastPeriod", "macdSlowPeriod", "macdSignalPeriod"]
    },
    {
      "name": "Bollinger",
      "description": "Bollinger Bands volatility breakout strategy",
      "parameters": ["bollingerPeriod", "bollingerMultiplier"]
    },
    {
      "name": "ATRFilter",
      "description": "Average True Range volatility filter strategy",
      "parameters": ["atrPeriod", "minimumATR"]
    }
  ]
}
```

### `POST /backtest`
Executes a backtest on the compiled engine.
```json
{
  "strategy": "MovingAverageCross",
  "csvFile": "data/sample_nifty50_daily.csv",
  "initialCash": 100000.0,
  "commission": 0.001,
  "slippage": 0.001,
  "stopLossPercent": 0.02,
  "takeProfitPercent": 0.05,
  "shortMAPeriod": 10,
  "longMAPeriod": 25
}
```
**Response Sample**:
```json
{
  "strategy": "MovingAverageCross",
  "initialCapital": 100000.0,
  "finalEquity": 118420.50,
  "netProfit": 18420.50,
  "totalReturnPercent": 18.42,
  "sharpeRatio": 1.64,
  "maximumDrawdown": 6.82,
  "totalTrades": 48,
  "winningTrades": 29,
  "losingTrades": 19,
  "winRatePercent": 60.42,
  "profitFactor": 1.78,
  "trades": [...],
  "equityCurve": [...]
}
```

---

## 🐳 Docker Deployment
The backend includes a multi-stage `Dockerfile` with Alpine Linux and Ninja that creates an ultra-lean runtime container (< 35 MB):
```bash
docker build -t quantflow-backend:latest .
docker run -p 8080:8080 quantflow-backend:latest
```