# QuantFlow

A production-grade quantitative trading backtesting engine, built with modern C++20.
QuantFlow lets traders and developers backtest trading strategies against historical market data, analyze performance with institutional-grade metrics, and simulate realistic trading conditions — via a CLI tool or a REST API for automated, programmatic strategy evaluation.

---

📌 Overview

QuantFlow is designed for anyone who wants to validate a trading idea before risking real capital. It replays historical price data through a configurable strategy engine and reports back exactly how that strategy would have performed — including realistic frictions like slippage and commissions.

Core capabilities:

Historical strategy backtesting with realistic execution modeling

Slippage & commission simulation

Risk management via stop-loss / take-profit rules

A library of built-in technical indicators

A pluggable, factory-based strategy engine

Both CLI and REST API workflows

Use it as a local CLI tool for one-off research, or run the REST API server to integrate backtesting into a larger pipeline, dashboard, or automated research workflow.

---

## Project Structure

```
QuantFlow/
├── backend/               # C++ engine + REST API server
│   ├── src/
│   │   ├── api/           # HTTP server, controllers, services, DTOs, validation
│   │   ├── analytics/     # Performance metrics & statistics
│   │   ├── config/        # JSON config parser
│   │   ├── engine/        # Backtest engine & market iterator
│   │   ├── execution/     # Order execution engine
│   │   ├── indicators/    # SMA, EMA, RSI, MACD, ATR, Bollinger Bands
│   │   ├── io/            # CSV parser
│   │   ├── market/        # Candle & market data types
│   │   ├── portfolio/     # Portfolio state management
│   │   ├── risk/          # Position sizer & risk manager
│   │   ├── strategy/      # Strategy implementations & factory
│   │   ├── trade/         # Trade record
│   │   ├── main.cpp       # CLI entry point
│   │   └── server_main.cpp # REST API server entry point
│   ├── include/           # Public headers (mirrors src/ layout)
│   ├── tests/             # GoogleTest unit & integration tests (197 tests)
│   ├── data/              # Sample CSV market data
│   ├── config/            # Default config.json
│   └── CMakeLists.txt
└── frontend/              # (in progress)
```

---

## Features
Category  |  Details
|--------|--------|
|Execution modeling	|  Commission and slippage applied per trade for realistic P&L|
|Risk management  |  Configurable stop-loss and take-profit thresholds|
|Indicators	|  SMA, EMA, RSI, MACD, ATR, Bollinger Bands|
|Strategies	 |  7 built-in strategies, extensible via factory pattern|
|Interfaces  |	CLI binary + REST API server|
|Performance analytics |  Return %, win rate, Sharpe ratio, and more|
|Validation & security  |  Input validation, path traversal protection, error sanitization|
|Testing |  197 unit and integration tests|

----

## Prerequisites

| Tool | Minimum Version |
|------|----------------|
| CMake | 3.20 |
| GCC or Clang | C++20 support |
| nlohmann/json | system-installed (`apt install nlohmann-json3-dev`) |
| Internet access (first build only) | Downloads GoogleTest & cpp-httplib via FetchContent |

---

## Building

```bash
cd backend

# Configure (Debug build by default — includes ASan + UBSan)
cmake -B build -S .

# Build everything
cmake --build build -j$(nproc)
```

This produces three binaries in `backend/build/`:

| Binary | Purpose |
|--------|---------|
| `QuantFlow` | CLI backtesting tool (reads `config/config.json`) |
| `QuantFlowServer` | REST API server (listens on port 8080) |
| `tests/QuantFlowTests` | Full unit + integration test suite |

---

## Running the CLI Tool

```bash
cd backend
./build/QuantFlow
```

Edit `config/config.json` to configure the run:

```json
{
    "strategy": "MovingAverageCross",
    "csvFile": "data/sample.csv",
    "initialCash": 10000,
    "commission": 0.001,
    "stopLossPercent": 0.05,
    "takeProfitPercent": 0.10,
    "slippage": 0.001,
    "shortMAPeriod": 10,
    "longMAPeriod": 20
}
```

---

## Running the REST API Server

```bash
cd backend
./build/QuantFlowServer
# QuantFlow REST API listening on http://localhost:8080
```

The server binds to `0.0.0.0:8080` by default (configurable via `Server::start(port)`).

---

## REST API Reference

### `GET /health`

Health check — always returns 200 when the server is up.

**Response**
```json
{ "status": "ok" }
```

---

### `POST /backtest`

Runs a full backtest and returns performance metrics.

**Headers**
```
Content-Type: application/json
```

**Request Body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `strategy` | string | ✅ | Strategy name (see supported strategies below) |
| `csvFile` | string | ✅ | Relative path to OHLCV CSV file (e.g. `data/sample.csv`) |
| `initialCash` | number | ✅ | Starting capital (must be > 0) |
| `commission` | number | ✅ | Commission per trade as decimal (e.g. `0.001` = 0.1%) |
| `stopLossPercent` | number | ✅ | Stop-loss as decimal (e.g. `0.05` = 5%), `0` to disable |
| `takeProfitPercent` | number | ✅ | Take-profit as decimal (e.g. `0.10` = 10%), `0` to disable |
| `shortMAPeriod` | integer | ❌ | Short MA period for `MovingAverageCross` (default: 10) |
| `longMAPeriod` | integer | ❌ | Long MA period for `MovingAverageCross` (default: 20) |

**Example Request**

```bash
curl -X POST http://localhost:8080/backtest \
  -H "Content-Type: application/json" \
  -d '{
    "strategy": "MovingAverageCross",
    "csvFile": "data/sample.csv",
    "initialCash": 10000,
    "commission": 0.001,
    "stopLossPercent": 0.05,
    "takeProfitPercent": 0.10,
    "shortMAPeriod": 10,
    "longMAPeriod": 20
  }'
```

**Response (200 OK)**

```json
{
    "initialCapital": 10000.0,
    "finalEquity": 9980.02,
    "netProfit": -19.98,
    "totalReturnPercent": -0.1998,
    "totalTrades": 1,
    "winningTrades": 0,
    "losingTrades": 1,
    "winRatePercent": 0.0,
    "averageWin": 0.0,
    "averageLoss": -19.98,
    "largestWin": 0.0,
    "largestLoss": -19.98,
    "maximumDrawdown": 8.36,
    "profitFactor": 0.0,
    "expectancy": -19.98,
    "annualizedReturn": -0.0063,
    "annualizedVolatility": 0.088,
    "sharpeRatio": -0.071
}
```

**Error Responses**

| Status | Condition |
|--------|-----------|
| 400 | Missing/invalid field, path traversal attempt, bad MA periods |
| 415 | `Content-Type` is not `application/json` |
| 500 | File not found, unknown strategy, engine failure |

---

## Supported Strategies

| Strategy name | Description | Key parameters (from `config.json`) |
|---------------|-------------|-------------------------------------|
| `MovingAverageCross` | Buy/sell on SMA crossover | `shortMAPeriod`, `longMAPeriod` |
| `AlwaysHold` | Never trades — benchmark baseline | — |
| `RSI` | Buy on oversold, sell on overbought | `rsiPeriod`, `oversold`, `overbought` |
| `EMACross` | EMA fast/slow crossover | `fastEMAPeriod`, `slowEMAPeriod` |
| `MACD` | MACD signal line crossover | `macdFastPeriod`, `macdSlowPeriod`, `macdSignalPeriod` |
| `Bollinger` | Trade on Bollinger Band breakouts | `bollingerPeriod`, `bollingerMultiplier` |
| `ATRFilter` | Signal filtered by ATR threshold | `atrPeriod`, `minimumATR` |

> **Note:** Only `MovingAverageCross` exposes its parameters through the API (`shortMAPeriod` / `longMAPeriod`). All other strategy parameters currently use the defaults defined in `Config.hpp` — this is a planned extension.

---

## CSV Data Format

The CSV file must have exactly 6 columns with a header row:

```
Timestamp,Open,High,Low,Close,Volume
2024-01-01 09:15,120,121,119,120,1000
2024-01-01 09:16,119,120,118,119,1000
...
```

- **Timestamp** — any string (currently unused by the engine)
- **Open, High, Low, Close** — floating-point prices
- **Volume** — integer

CSV files must be placed in a location accessible relative to the working directory from which the server is launched. Absolute paths and paths containing `..` are rejected for security.

---

## Running Tests

```bash
cd backend

# Run all 197 tests
cd build && ctest --output-on-failure -j$(nproc)

# Or run the test binary directly for verbose output
./build/tests/QuantFlowTests --gtest_color=yes
```

Test coverage includes:

- All 6 technical indicators (SMA, EMA, RSI, MACD, ATR, Bollinger Bands)
- All 7 strategy implementations
- Portfolio state management
- Execution engine (slippage, commissions)
- Risk manager (stop-loss, take-profit)
- Position sizer
- Config parser
- Market iterator
- Full end-to-end integration tests

---

## Security

The API enforces the following protections:

- **Content-Type validation** — rejects non-JSON bodies with `415`
- **Empty body detection** — returns `400` before attempting parse
- **Path traversal prevention** — `..` sequences and absolute paths in `csvFile` are rejected
- **Path length cap** — `csvFile` capped at 256 characters
- **Type safety** — all JSON fields are type-checked before extraction
- **Error message sanitisation** — internal file paths and stack details are not echoed to clients; `500` responses return only `{"error":"Internal server error"}`
- **CORS headers** — `Access-Control-Allow-Origin: *` set for browser frontend compatibility

---

## Architecture

```
Request
  │
  ▼
Server::start()        ← binds 0.0.0.0:8080, registers routes
  │
  ├── GET  /health     ← HealthController (inline lambda)
  │
  └── POST /backtest   ← BacktestController::handleBacktest()
        │
        ├── Phase 1: Parse + Validate (400 on failure)
        │     ├── json::parse(req.body)
        │     ├── RequestValidator::validateBacktestRequest()
        │     └── BacktestRequest::fromJson()
        │
        └── Phase 2: Execute (500 on failure)
              └── BacktestService::run()
                    ├── CSVParser::parse(csvFile)
                    ├── StrategyFactory::create(config)
                    ├── BacktestEngine::run()
                    ├── PerformanceAnalyzer::analyze()
                    └── BacktestResult::toJson()  ──► 200
```
