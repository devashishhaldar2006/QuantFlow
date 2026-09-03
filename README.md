# QuantFlow — Institutional Quantitative Backtesting Terminal & C++ Engine

<p align="center">
  <img src="frontend/public/logo.svg" alt="QuantFlow Institutional Logo" width="100" height="100" />
</p>

<p align="center">
  <strong>An institutional-grade algorithmic trading and quantitative backtesting platform. Engineered with a sub-millisecond compiled C++20 execution engine, autonomous multi-agent AI (LangGraph + Mistral Small 2506), real-time portfolio risk analytics, and cloud dataset virtualization.</strong>
</p>

<p align="center">
  <a href="https://quantflow-jade.vercel.app"><img src="https://img.shields.io/badge/Live%20Terminal-quantflow.is--a.dev-0A84FF?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" /></a>
  <a href="https://youtu.be/your-demo-video"><img src="https://img.shields.io/badge/YouTube%20Walkthrough-Watch%20Demo-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Video Demo" /></a>
  <a href="https://github.com/devashishhaldar2006/QuantFlow"><img src="https://img.shields.io/badge/Core%20Engine-Modern%20C%2B%2B20-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white" alt="C++20" /></a>
  <a href="https://github.com/devashishhaldar2006/QuantFlow/actions"><img src="https://img.shields.io/badge/CI%2FCD-Automated%20GHCR%20%2B%20EC2-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="CI/CD" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge" alt="MIT License" /></a>
</p>

---

## 📌 Executive Summary & Live Links

| Resource | Direct Link | Description |
| :--- | :--- | :--- |
| **🌐 Production Web Terminal** | [**quantflow-jade.vercel.app**](https://quantflow-jade.vercel.app) *(Pending DNS: `quantflow.is-a.dev`)* | Institutional Next.js 16 Quantitative Workstation |
| **🎥 Video Walkthrough & Demo** | [**Watch QuantFlow Demonstration**](https://youtu.be/your-demo-video) | End-to-end walkthrough of C++ engine & LangGraph AI agents |
| **⚡ High-Performance Core** | `http://3.6.68.152:8080` (AWS EC2, ap-south-1 Mumbai) | Compiled C++20 REST API Execution Server |
| **📜 Open Source License** | [MIT License](LICENSE) | Permissive open-source license for developers & researchers |

---

## 🏛️ System Architecture

QuantFlow decouples heavy numerical execution from client orchestration. The C++20 core runs on dedicated cloud compute, while the web terminal handles interactive visualizations, agentic reasoning, and authenticated data pipelines:

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

## ⚡ Technical Capabilities Breakdown

### 1. High-Performance C++20 Execution Core
- **Sub-Millisecond Latency**: Processes **1.48M+ ticks/sec** with zero runtime heap fragmentation during evaluation loops.
- **Conservative Intrabar Execution**: Solves the classic backtest look-ahead flaw. When both a **Stop-Loss** and a **Take-Profit** target fall inside the same candle's high/low range, QuantFlow executes the Stop-Loss first to prevent artificially inflated returns.
- **Realistic Friction Simulation**: Incorporates proportional basis-point broker commissions and customizable bid/ask slippage modeling.
- **7 Native Algorithmic Strategies**:
  1. `MovingAverageCross` — Dual SMA trend-following crossover
  2. `EMACross` — Exponential moving average momentum breakout
  3. `RSI` — Relative Strength Index mean-reversion with overbought/oversold boundaries
  4. `MACD` — Moving Average Convergence Divergence signal cross with histogram tracking
  5. `Bollinger` — Volatility envelope breakout and reversal
  6. `ATRFilter` — Average True Range volatility expansion filter
  7. `CompositeMultiIndicator` — Multi-signal confluence model

### 2. Autonomous Multi-Agent AI (LangGraph + Mistral Small 2506)
- **Autonomous Strategy Architect Agent**:
  - Accepts raw trader hypotheses in natural language (e.g. *"Design an intraday momentum breakout on NIFTY with low drawdown"*).
  - Validates mathematical constraints and engine boundaries (`shortPeriod < longPeriod`, `oversold < overbought`).
  - Calls the compiled C++ engine tool to run trial backtests.
  - Inspects the Sharpe ratio and maximum drawdown. If sub-optimal, it triggers an iterative parameter recalibration loop (up to 2 iterations).
  - Synthesizes an **Executive Quantitative Strategy Brief** for the user.
- **Autonomous Risk Officer Committee Agent**:
  - Analyzes the full trade ledger to compute single-trade luck concentration (detecting whether 80%+ of profit came from a single lucky outlier).
  - Simulates performance against macroeconomic shock regimes (liquidity freezes, rate shocks, high-volatility chop).
  - Calculates an **Institutional Health Score (0–100)** and mandates concrete risk limits (maximum capital allocation, kill-switches).

### 3. Institutional Workstation & Cloud Data Fabric
- **Interactive Recharts Visualizations**: Time-series equity curve simulation and trade ledger inspection with side, price, and net cash flow attribution.
- **Dataset Virtualization**: Upload, inspect, and sync multi-megabyte CSV tick files directly to Supabase S3 / Cloudflare R2 object storage with automatic client-side schema validation.
- **Payment & Entitlement Infrastructure**: Tiered subscription model (Free vs. Pro) verified using cryptographic HMAC SHA-256 signatures via Razorpay.

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

