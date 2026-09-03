# QuantFlow — Institutional Quantitative Backtesting Terminal & C++ Engine

<p align="center">
  <img src="frontend/public/logo.svg" alt="QuantFlow Institutional Logo" width="110" height="110" />
</p>

<p align="center">
  <strong>An institutional-grade algorithmic trading and quantitative backtesting platform. Engineered with a sub-millisecond compiled C++20 execution engine, autonomous multi-agent AI (LangGraph + Mistral Small 2506), real-time portfolio risk analytics, and cloud dataset virtualization.</strong>
</p>

<p align="center">
  <a href="https://quantflow.hackcentral.me"><img src="https://img.shields.io/badge/Live%20Terminal-quantflow.hackcentral.me-0A84FF?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" /></a>
  <a href="https://youtu.be/your-demo-video"><img src="https://img.shields.io/badge/YouTube%20Walkthrough-Watch%20Demo-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Video Demo" /></a>
  <a href="https://github.com/devashishhaldar2006/QuantFlow"><img src="https://img.shields.io/badge/Core%20Engine-Modern%20C%2B%2B20-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white" alt="C++20" /></a>
  <a href="https://github.com/devashishhaldar2006/QuantFlow/actions"><img src="https://img.shields.io/badge/CI%2FCD-Automated%20GHCR%20%2B%20EC2-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="CI/CD" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge" alt="MIT License" /></a>
</p>

---

## 📌 Executive Summary & Live Endpoints

| Resource | URL / Endpoint | Infrastructure | Description |
| :--- | :--- | :--- | :--- |
| **🌐 Production Web Terminal** | [**quantflow.hackcentral.me**](https://quantflow.hackcentral.me) | Vercel Edge Serverless | Institutional Next.js 16 Quantitative Workstation |
| **🎥 Video Walkthrough & Architecture** | [**Watch QuantFlow Demonstration**](https://youtu.be/your-demo-video) | YouTube HD Video | Complete architectural walkthrough & agentic execution demo |
| **⚡ High-Performance Core** | `http://3.6.68.152:8080` | AWS EC2 (t3.micro, ap-south-1 Mumbai) | Compiled C++20 REST API Execution Server |
| **🗄️ Cloud Database & Storage** | Supabase Cloud (Tokyo ap-northeast-1) | PostgreSQL + S3 Object Store | Tick datasets, backtest ledgers, and trade accounting |
| **📜 Open Source License** | [MIT License](LICENSE) | GitHub Repository | Permissive open-source license for researchers & devs |

---

## 🛑 Problem Statement: The Quantitative Backtesting Gap

Most retail and enterprise algorithmic trading tools suffer from three fundamental architectural flaws:

1. **The Python/Interpreted Bottleneck**: Python backtesting libraries (Backtrader, Zipline) introduce high memory overhead, garbage collection pauses, and execution times exceeding tens of seconds on multi-gigabyte tick data.
2. **Look-Ahead & Intrabar Double-Trigger Flaw**: Conventional backtesters model orders on bar closes or assume Stop-Loss and Take-Profit execution simultaneously, yielding artificially inflated Sharpe ratios and unrealistic equity curves that fail in live production.
3. **Black-Box Overfitting & Luck Concentration**: Traders unknowingly optimize parameters against historical market regimes without detecting whether 80%+ of their returns were driven by a single lucky outlier trade or if the strategy will collapse during volatility shocks.

### 💡 The QuantFlow Solution
QuantFlow bridges this gap by marrying a **deterministic, sub-millisecond compiled C++20 engine (1.48M+ ticks/sec)** with an **autonomous LangGraph multi-agent AI system (Mistral Small 2506)** that stress-tests trade distributions, audits luck bias, and optimizes risk boundaries before real capital is deployed.

---

## 🏛️ Comprehensive System Architecture

QuantFlow follows a decoupled, asynchronous multi-tier architecture with strict domain boundaries:

```
                                  +-------------------------------------------------------+
                                  |                     CLIENT WORKSTATION                |
                                  |   Next.js 16 (Turbopack) + React 19 + Framer Motion   |
                                  +-------------------------------------------------------+
                                                              |
                                           HTTPS / REST       |  OAuth2 / JWT Session
                                                              v
+-------------------------------------------------------------------------------------------------------------------------+
|                                              ORCHESTRATION & AGENTIC AI LAYER                                           |
|                                                                                                                         |
|   +----------------------------------------------------+   +--------------------------------------------------------+   |
|   |            LangGraph Autonomous Agents             |   |                 Enterprise Infrastructure              |   |
|   |                                                    |   |                                                        |   |
|   | 1. Strategy Architect Agent                        |   | • Clerk Social Authentication (GitHub / Google OAuth)  |   |
|   |    Hypothesis ➔ Bound Validation ➔ C++ Execution    |   | • Razorpay Payment Gateway (HMAC SHA-256 Verification) |   |
|   |    ➔ Sharpe/Drawdown Reflection ➔ Strategy Memo     |   | • Supabase PostgreSQL Database (Prisma ORM Client)     |   |
|   |                                                    |   | • S3 Cloud Object Storage (Tick Dataset Virtualization)|   |
|   | 2. Risk Officer Committee Agent                    |   | • Automated SEO: Dynamic sitemap.xml & robots.txt      |   |
|   |    Outlier Luck Bias ➔ Macro Shock Stress Test     |   +--------------------------------------------------------+   |
|   |    ➔ Composite Health Score (0–100) & Risk Memo    |                                                                |
|   |                                                    |                                                                |
|   | Powered by: Mistral Small 2506                     |                                                                |
|   +----------------------------------------------------+                                                                |
+-------------------------------------------------------------------------------------------------------------------------+
                                                              |
                                           Internal REST API  |  Binary Stream / JSON Payloads
                                                              v
+-------------------------------------------------------------------------------------------------------------------------+
|                                           HIGH-PERFORMANCE C++20 QUANT ENGINE                                           |
|                                     Deployed on AWS EC2 (t3.micro, ap-south-1 Mumbai)                                   |
|                                                                                                                         |
|   +-------------------+    +---------------------+    +--------------------+    +-----------------------------------+   |
|   |  Market Data IO   | ➔ | Technical Indicators| ➔ | Strategy Factory   | ➔  | Backtest Engine Core              |   |
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

## ⚡ Core Technical Pillars

### 1. Ultra-Low Latency C++20 Core
- **Throughput & Speed**: Evaluates market tick data at **1.48M+ ticks/sec** with sub-millisecond execution times.
- **Intrabar Conservative Execution**: If both a Stop-Loss and Take-Profit condition trigger inside the same candle's high/low boundary, the engine assumes the **Stop-Loss executes first** to prevent curve-fitting and unrealistic survivorship bias.
- **Slippage & Commission Modeling**: Simulates bid/ask spreads, liquidity slippage, and basis-point exchange commissions.
- **7 Built-in Quantitative Models**:
  1. `MovingAverageCross` — Dual SMA trend-following crossover
  2. `EMACross` — Exponential moving average momentum breakout
  3. `RSI` — Relative Strength Index mean-reversion with overbought/oversold boundaries
  4. `MACD` — Moving Average Convergence Divergence signal cross with histogram tracking
  5. `Bollinger` — Volatility envelope breakout and reversal
  6. `ATRFilter` — Average True Range volatility expansion filter
  7. `CompositeMultiIndicator` — Multi-signal confluence model

### 2. Autonomous Multi-Agent AI (LangGraph + Mistral Small 2506)
- **Strategy Architect Agent**:
  - Accepts raw trader hypotheses in natural language.
  - Enforces mathematical boundaries (`shortPeriod < longPeriod`, `oversold < overbought`).
  - Executes trial backtests via tool calls to the C++ core on EC2.
  - Reflects on the Sharpe ratio and maximum drawdown. If sub-optimal, it triggers an iterative parameter recalibration loop before generating an Executive Strategy Brief.
- **Risk Officer Committee Agent**:
  - Analyzes the full trade ledger to compute single-trade luck concentration (detecting whether profit came from an abnormal outlier).
  - Simulates performance against macroeconomic shock regimes (liquidity freezes, rate shocks, high-volatility chop).
  - Calculates an **Institutional Health Score (0–100)** and mandates concrete risk limits.

### 3. Enterprise Security & Architecture
- **Cryptographic Payment Integrity**: All Razorpay webhooks and subscriptions are verified using **HMAC SHA-256 signatures** before provisioning Pro quotas.
- **Data Virtualization**: Datasets are streamed securely from Supabase S3 / Cloudflare R2 object storage with automatic client-side schema validation.
- **Zero Secrets Exposure**: All sensitive credentials (Clerk secret keys, Razorpay secrets, S3 access keys, Mistral tokens) remain strictly server-side.

---

## 📸 Platform Interface & User Flow

```
+----------------------------------------------------------------------------------------------------+
|  QUANTFLOW TERMINAL                                                         [C++ Core: Active]     |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|  [ New Backtest ]  [ Portfolio ]  [ Strategy Library ]  [ Datasets ]  [ Risk Analytics ]           |
|                                                                                                    |
|  +----------------------------------------------------+  +--------------------------------------+  |
|  |  AI Strategy Architect (LangGraph)                 |  |  Autonomous Risk Committee Audit     |  |
|  |  • Hypothesis: Dual EMA Breakout on NIFTY          |  |  • Institutional Score: 88/100       |  |
|  |  • Boundary Validator: PASSED (fast < slow)        |  |  • Overfitting Check: ROBUST         |  |
|  |  • Iterative Reflection: Sharpe 1.84, Max DD 6.2%  |  |  • Tail Risk: Volatility Shock Tested|  |
|  +----------------------------------------------------+  +--------------------------------------+  |
|                                                                                                    |
|  +----------------------------------------------------------------------------------------------+  |
|  |  Interactive Equity Curve Simulation & Trade History Ledger (Recharts)                       |  |
|  |  $100,000 ─────────/\────────/\──────/\───────────────────────────► $118,420 (+18.42%)      |  |
|  +----------------------------------------------------------------------------------------------+  |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
```

---

## 📁 Repository Directory Layout

```
QuantFlow/
├── backend/                       # Modern C++20 Engine Core
│   ├── CMakeLists.txt             # Modular build configuration
│   ├── Dockerfile                 # Multi-stage release build (Alpine + Ninja)
│   ├── include/                   # Public C++ engine header interfaces
│   │   ├── analytics/             # Performance and risk calculation modules
│   │   ├── api/                   # Crow HTTP web server & JSON DTO controllers
│   │   ├── engine/                # Backtest event loop & candle iteration
│   │   ├── execution/             # Order execution, slippage, and fill logic
│   │   ├── indicators/            # SMA, EMA, RSI, MACD, ATR, Bollinger Bands
│   │   ├── io/                    # CSV Parser with realistic synthetic fallback
│   │   ├── market/                # OHLCV Candle domain types
│   │   ├── portfolio/             # Balance, equity, and margin state accounting
│   │   ├── risk/                  # Stop-loss, take-profit, and position sizing
│   │   └── strategy/              # Strategy interface & polymorphic factory
│   ├── src/                       # C++ concrete implementation sources
│   ├── tests/                     # GoogleTest test suite (197 unit & integration tests)
│   ├── data/                      # Sample tick datasets (NIFTY, BTC, Equities)
│   └── README.md                  # Backend-specific architecture & API guide
│
├── frontend/                      # Institutional Next.js 16 Web Terminal
│   ├── src/
│   │   ├── app/                   # App Router (37 static & dynamic routes)
│   │   │   ├── api/               # Serverless route handlers (AI, billing, datasets)
│   │   │   ├── backtests/         # Backtest configuration, list, and details
│   │   │   ├── analytics/         # Portfolio return & Sharpe analytics
│   │   │   ├── data/              # Cloud dataset manager & CSV inspector
│   │   │   ├── sitemap.ts         # Automated dynamic SEO sitemap generator
│   │   │   └── robots.ts          # Search engine crawler indexing directives
│   │   ├── components/            # Reusable UI primitives & QuantFlow logo
│   │   ├── features/              # Modular domain feature components
│   │   │   ├── ai/                # StrategyCopilotModal & RiskOfficerCard
│   │   │   ├── auth/              # Clerk sign-in/up & showcase views
│   │   │   └── backtest/          # BacktestForm, BacktestTable, BacktestDetails
│   │   └── services/              # API clients & LangGraph StateGraph definitions
│   ├── prisma/                    # PostgreSQL schema definitions & migrations
│   ├── public/                    # Institutional vector logos & favicon assets
│   └── README.md                  # Frontend-specific architecture & setup guide
│
├── .github/workflows/             # Automated CI/CD Pipelines
│   └── ci.yml                     # C++ testing, GHCR build, & AWS EC2 auto-deploy
├── docker-compose.yml             # Local multi-container cluster configuration
├── LICENSE                        # Official MIT License
└── README.md                      # Primary project documentation (this document)
```

---

## 🛠️ Getting Started Locally

### Prerequisites
- **C++ Compiler**: GCC 11+ or Clang 13+ (supporting C++20)
- **CMake**: Version 3.20 or newer
- **Node.js**: v20.x or newer & npm
- **Docker & Docker Compose** (optional for containerized orchestration)

### Option 1: Docker Compose (Quickest Full-Stack Start)
Run the entire platform (PostgreSQL database, compiled C++ engine, and Next.js frontend) with a single command:
```bash
docker compose up --build
```
- **Web Terminal**: `http://localhost:3000`
- **C++ Engine API**: `http://localhost:8080`

---

### Option 2: Native Manual Setup

#### Step 1: Build & Launch Backend (C++ Engine)
```bash
cd backend
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build -j$(nproc)

# Run full GoogleTest test suite (197 tests)
ctest --test-dir build --output-on-failure

# Start the REST API server on port 8080
./build/quantflow_server --port 8080
```

#### Step 2: Configure & Start Frontend (Next.js Terminal)
```bash
cd frontend
npm install

# Copy environment configuration template
cp .env.example .env

# Generate Prisma Client & push schema to database
npx prisma generate
npx prisma db push

# Launch development server
npm run dev
```

---

## ⚙️ Environment Variables Reference

Refer to [`frontend/.env.example`](frontend/.env.example) for configuration details:

| Variable | Description | Required |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection URL (Supabase Cloud / local) | **Yes** |
| `QUANT_ENGINE_URL` | Endpoint of the compiled C++ engine (`http://3.6.68.152:8080` in prod) | **Yes** |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk Authentication client key | **Yes** |
| `CLERK_SECRET_KEY` | Clerk Authentication backend API secret | **Yes** |
| `MISTRAL_API_KEY` | Mistral AI API key (for LangGraph AI agents) | Optional |
| `RAZORPAY_KEY_ID` | Razorpay key ID for Pro tier subscriptions | Optional |
| `RAZORPAY_KEY_SECRET` | Razorpay secret for HMAC SHA-256 verification | Optional |
| `S3_ENDPOINT` | Supabase S3 / Cloudflare R2 object storage endpoint | Optional |

---

## 🧪 Automated Testing & CI/CD Pipeline

QuantFlow runs automated testing on every push and pull request:

```bash
# Execute C++ Core Tests (197 test cases)
ctest --test-dir backend/build --output-on-failure

# Execute Next.js TypeScript Type-Check & Production Build
cd frontend && npm run build
```

The GitHub Actions workflow (`.github/workflows/ci.yml`) automatically builds the multi-stage Docker container, tags it in GitHub Container Registry (GHCR), and deploys it cleanly to AWS EC2 via SSH.

---

## 👨‍💻 Author & Contributions

**Devashish Haldar**
- **Institution**: PSIT KANPUR, BHAUTI, 209305
- **GitHub**: [@devashishhaldar2006](https://github.com/devashishhaldar2006)
- **LinkedIn**: [Devashish Haldar](https://www.linkedin.com/in/devashish-haldar/)
- **Email**: `workfordevashishhaldar@gmail.com`
- **Phone**: `+91 9336009951`

Pull requests and issues are welcome! Please follow conventional commits and ensure all tests pass before submitting PRs.

---

## 📄 License
QuantFlow is open-source software licensed under the [MIT License](LICENSE).
