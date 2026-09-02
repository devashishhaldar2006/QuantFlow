# QuantFlow — Institutional Quantitative Backtesting Terminal & C++ Engine

<p align="center">
  <img src="frontend/public/logo.svg" alt="QuantFlow Logo" width="90" height="90" />
</p>

<p align="center">
  <strong>An institutional-grade algorithmic backtesting platform with sub-millisecond compiled C++20 execution, multi-agent AI (LangGraph + Mistral Small 2506), real-time portfolio risk analytics, and cloud dataset virtualization.</strong>
</p>

<p align="center">
  <a href="https://quantflow-jade.vercel.app"><img src="https://img.shields.io/badge/Live%20Terminal-quantflow.is--a.dev-blue?style=for-the-badge&logo=vercel" alt="Live Demo" /></a>
  <a href="https://github.com/devashishhaldar2006/QuantFlow"><img src="https://img.shields.io/badge/Engine-Modern%20C%2B%2B20-00599C?style=for-the-badge&logo=c%2B%2B" alt="C++20" /></a>
  <a href="https://github.com/devashishhaldar2006/QuantFlow/actions"><img src="https://img.shields.io/badge/CI%2FCD-Automated%20EC2%20%2B%20GHCR-2088FF?style=for-the-badge&logo=github-actions" alt="CI/CD" /></a>
  <a href="https://github.com/devashishhaldar2006/QuantFlow/blob/master/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License" /></a>
</p>

---

## 🏛️ Executive Architecture Overview

QuantFlow is engineered with strict separation of concerns, decoupling ultra-high-throughput deterministic numerical processing from modern web orchestration:

```
                                  +-------------------------------------------------------+
                                  |                     CLIENT LAYER                      |
                                  |   Next.js 16 (Turbopack) + React 19 + Framer Motion   |
                                  +-------------------------------------------------------+
                                                              |
                                           HTTPS / REST       |  OAuth2 / JWT Sessions
                                                              v
+-------------------------------------------------------------------------------------------------------------------------+
|                                                   ORCHESTRATION & AGENTIC AI                                            |
|                                                                                                                         |
|   +--------------------------------------------+                   +------------------------------------------------+   |
|   |         Agentic AI (LangGraph)             |                   |            Platform Infrastructure             |   |
|   | • Strategy Architect (Hypothesis ➔ Config) |                   | • Clerk Authentication & RBAC Tiering          |   |
|   | • Risk Officer (Outlier & Regime Audit)    |                   | • Razorpay Payment Verification (HMAC SHA-256) |   |
|   | • Model: Mistral Small 2506 (Serverless)   |                   | • Prisma ORM + Supabase PostgreSQL Cloud       |   |
|   +--------------------------------------------+                   | • S3 Object Storage (Tick Dataset Syncing)     |   |
|                                                                    +------------------------------------------------+   |
+-------------------------------------------------------------------------------------------------------------------------+
                                                              |
                                           Internal REST API  |  Binary Stream / JSON DTOs
                                                              v
+-------------------------------------------------------------------------------------------------------------------------+
|                                           HIGH-PERFORMANCE C++20 QUANT ENGINE                                           |
|                                       Deployed on AWS EC2 (t3.micro, ap-south-1)                                        |
|                                                                                                                         |
|   +-------------------+    +---------------------+    +--------------------+    +-----------------------------------+   |
|   |  Market Data IO   | ➔ | Technical Indicators| ➔ | Strategy Factory   | ➔  | Backtesting Engine                |   |
|   |  Fast CSV Parser  |    | SMA, EMA, RSI, MACD |    | 7 Execution Models |    | Intrabar Slips & Conservative SL  |   |
|   +-------------------+    +---------------------+    +--------------------+    +-----------------------------------+   |
|                                                                                           |                             |
|                                                                                           v                             |
|                                                                                 +-----------------------------------+   |
|                                                                                 | Risk Management & Analytics Core  |   |
|                                                                                 | Sharpe, Sortino, Drawdown, Equity |   |
|                                                                                 +-----------------------------------+   |
+-------------------------------------------------------------------------------------------------------------------------+
```

---

## ✨ Key Platform Highlights

### 1. ⚡ Compiled C++20 Execution Engine
- **Deterministic Throughput**: Evaluates tick-level and minute OHLCV price series at **1.48M+ ticks/sec** with sub-millisecond execution times.
- **Realistic Friction Simulation**: Models user-defined broker commission structures and proportional tick-level bid/ask slippage.
- **Intrabar Risk Execution**: Enforces conservative execution assumptions — when both Stop-Loss and Take-Profit bounds are breached within the same candle, the Stop-Loss executes first to eliminate survivorship and over-optimism bias.
- **7 Built-in Strategy Paradigms**:
  1. `MovingAverageCross` (Dual SMA crossover)
  2. `EMACross` (Exponential moving average breakout)
  3. `RSI` (Mean-reversion momentum)
  4. `MACD` (Moving Average Convergence Divergence)
  5. `Bollinger` (Volatility envelope breakout/mean-reversion)
  6. `ATRFilter` (Average True Range volatility expansion)
  7. `CompositeMultiIndicator` (Confluence model)

### 2. 🤖 Autonomous Multi-Agent AI (LangGraph + Mistral Small 2506)
- **Strategy Architect Agent**:
  - Translates unstructured trader hypotheses into strict mathematical parameter matrices.
  - Formally validates engine boundaries (`fast < slow`, `oversold < overbought`).
  - Autonomously executes trial backtests via tool calling, reflects on the Sharpe and Drawdown metrics, and performs iterative parameter recalibrations before outputting an Executive Strategy Brief.
- **Risk Officer Committee Agent**:
  - Performs post-backtest anomaly audits detecting curve-fitting and single-trade profit concentration.
  - Stress-tests strategy performance against simulated macroeconomic shocks (flash crashes, volatility whipsaws, liquidity squeezes).
  - Synthesizes an Institutional Health Score (0–100) and mandates concrete portfolio risk limits.

### 3. 🛡️ Production Security & Cloud Data Fabric
- **Full Cloud S3 Virtualization**: Datasets are stored and streamed securely from Supabase S3 / Cloudflare R2 object storage with local filesystem fallbacks.
- **Zero Secrets Drift**: All sensitive cryptographic keys (Razorpay HMAC secrets, S3 access keys, Clerk tokens, Mistral keys) are shielded behind server-side Next.js route handlers.
- **Dynamic SEO & Compliance**: Automated `sitemap.xml`, `robots.txt`, and OpenGraph metadata formatted for institutional presentation.

---

## 📁 Repository Structure

```
QuantFlow/
├── backend/                  # Compiled Modern C++20 Core
│   ├── CMakeLists.txt        # Modular CMake build specification
│   ├── Dockerfile            # Multi-stage release build (Alpine + Ninja)
│   ├── include/              # Public engine header interfaces
│   │   ├── analytics/        # Performance, drawdown, and statistical metrics
│   │   ├── api/              # Crow-based HTTP controllers & JSON DTOs
│   │   ├── engine/           # Backtest iteration loop & event dispatch
│   │   ├── execution/        # Order book fill simulation & slippage
│   │   ├── indicators/       # SMA, EMA, RSI, MACD, ATR, Bollinger
│   │   ├── io/               # Streaming CSV parser & synthetic candle fallback
│   │   ├── market/           # OHLCV Market candle abstractions
│   │   ├── portfolio/        # Cash balance, position accounting, and margin
│   │   ├── risk/             # Stop-loss, take-profit, and position sizing
│   │   └── strategy/         # Strategy interface and polymorphic factory
│   ├── src/                  # Concrete implementation source files
│   └── tests/                # Comprehensive GoogleTest suite (197 unit & integration tests)
│
├── frontend/                 # Institutional Quantitative Workstation
│   ├── src/
│   │   ├── app/              # Next.js 16 App Router (37 static & dynamic routes)
│   │   │   ├── api/          # Serverless route handlers (AI agents, billing, datasets)
│   │   │   ├── backtests/    # Backtest configuration, lists, and tear-sheets
│   │   │   ├── analytics/    # Portfolio return and alpha attribution charts
│   │   │   └── data/         # Cloud dataset manager & CSV inspector
│   │   ├── features/         # Feature-first modular UI domains
│   │   │   ├── ai/           # Strategy Architect Copilot & Risk Officer Card
│   │   │   ├── auth/         # Institutional Clerk auth screens & OAuth callbacks
│   │   │   └── backtest/     # Backtest form, interactive tables, and charts
│   │   └── services/         # Decoupled backend clients and data adapters
│   │       ├── ai/           # LangGraph workflows and Mistral AI client
│   │       ├── backtest/     # Backtest execution and summary queries
│   │       └── quantEngine/  # Resilient HTTP client for C++ engine on EC2
│   ├── prisma/               # PostgreSQL schema definitions & migrations
│   └── public/               # Institutional vector assets & brand logo
│
├── .github/workflows/        # Automated CI/CD Pipelines
│   └── ci.yml                # Automated test verification, GHCR build, & AWS EC2 CD
└── docker-compose.yml        # Local full-stack cluster orchestration
```

---

## 🚀 Quickstart Guide

### Prerequisites
- **C++ Compiler**: GCC 11+ or Clang 13+ (supporting C++20)
- **CMake**: Version 3.20 or newer
- **Node.js**: v20.x or newer & npm
- **Docker & Docker Compose** (optional for containerized deployment)

### 1. Running the Full Stack with Docker Compose
To launch the entire platform (PostgreSQL database, compiled C++ engine, and Next.js frontend) locally:
```bash
docker compose up --build
```
- Frontend: `http://localhost:3000`
- C++ Engine API: `http://localhost:8080`

### 2. Manual Native Setup

#### Backend (C++ Engine)
```bash
cd backend
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build -j$(nproc)

# Run full test suite (197 tests)
ctest --test-dir build --output-on-failure

# Launch the REST API server on port 8080
./build/quantflow_server --port 8080
```

#### Frontend (Next.js Terminal)
```bash
cd frontend
npm install

# Configure environment variables
cp .env.example .env

# Generate Prisma database client & run migrations
npx prisma generate
npx prisma db push

# Start development workstation
npm run dev
```

---

## ⚙️ Environment Configuration

Refer to [`frontend/.env.example`](frontend/.env.example) for the complete reference:

| Key | Description | Required |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string (Supabase / local) | **Yes** |
| `QUANT_ENGINE_URL` | URL of the C++ Quant Engine (`http://3.6.68.152:8080` in prod) | **Yes** |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk Authentication publishable key | **Yes** |
| `CLERK_SECRET_KEY` | Clerk Authentication secret key | **Yes** |
| `MISTRAL_API_KEY` | Mistral AI API key (for LangGraph Strategy & Risk Agents) | Optional |
| `RAZORPAY_KEY_ID` | Razorpay Merchant key ID for Pro subscriptions | Optional |
| `RAZORPAY_KEY_SECRET` | Razorpay Merchant secret for HMAC verification | Optional |
| `S3_ENDPOINT` | Supabase / AWS S3 endpoint for dataset storage | Optional |

---

## 🧪 Testing & Verification

QuantFlow maintains rigorous automated testing across both application tiers:

```bash
# C++ Core Unit & Integration Tests (197 automated test cases)
ctest --test-dir backend/build --output-on-failure

# Next.js TypeScript Type-Check & Production Build Validation
cd frontend && npm run build
```

---

## 📄 License
QuantFlow is released under the [MIT License](LICENSE). Built for quantitative researchers and algorithmic traders.
