# QuantFlow Frontend — Institutional Quantitative Terminal

The QuantFlow frontend is an institutional quantitative research and strategy evaluation workstation built with **Next.js 16 (Turbopack)**, **React 19**, **LangGraph**, and **Vanilla CSS / Tailwind v4**.

---

## 🏛️ Workstation Features

### 1. 🤖 Autonomous AI Agents (LangGraph + Mistral Small 2506)
- **AI Strategy Architect**:
  - Located directly inside `/backtests/new`.
  - Parses freeform English investment theses (e.g., *"Design an intraday momentum breakout on NIFTY with low drawdown"*).
  - Enforces mathematical boundary constraints and parameter validation.
  - Automatically executes a trial backtest against the C++ engine, reflects on the Sharpe and Drawdown, iteratively tunes parameters if needed, and writes an Executive Strategy Memo.
- **AI Risk Officer Committee Audit**:
  - Located on the backtest results tear-sheet (`/backtests/[id]`).
  - Evaluates trade logs for curve-fitting, statistical significance (< 30 trades warning), and single-trade profit outlier concentration.
  - Simulates macroeconomic regime shocks (flash crashes, liquidity freezes, volatile chop).
  - Produces an Institutional Health Score (0–100) and mandates concrete execution risk limits.

### 2. 📊 Interactive Visualizations & Tear-Sheets
- **Equity Curve & Drawdown Charts**: Built with Recharts for responsive, high-fidelity time-series inspection.
- **Trade History Ledger**: Interactive tables displaying entry timestamp, execution price, side (BUY/SELL), commission paid, and net cash flow.
- **Institutional Metric Gauges**: Annualized Return, Sharpe Ratio, Sortino Ratio, Maximum Drawdown, Win Rate, and Profit Factor.

### 3. 🛡️ Data Virtualization & Security
- **Cloud S3 Dataset Manager**: Upload and manage CSV tick datasets synced to Supabase S3 / Cloudflare R2 object storage with automatic client-side schema validation.
- **Clerk Authentication**: Secure session persistence with enterprise Social OAuth (Google, GitHub) and email magic links.
- **Razorpay Subscription Engine**: Tiered membership access (Free vs. Pro) verified via cryptographic HMAC SHA-256 webhook signatures.

---

## 🏗️ Architecture & Directory Layout

```
frontend/
├── src/
│   ├── app/                      # Next.js App Router (37 static & dynamic routes)
│   │   ├── api/                  # Secure serverless API route handlers
│   │   │   ├── ai/               # /api/ai/strategy-architect & /api/ai/risk-officer
│   │   │   ├── backtests/        # Backtest persistence and execution routes
│   │   │   ├── billing/          # Razorpay checkout & webhook verification
│   │   │   ├── datasets/         # S3 sync and dataset validation
│   │   │   └── strategies/       # C++ engine strategy proxy
│   │   ├── backtests/            # /backtests, /backtests/new, /backtests/[id]
│   │   ├── analytics/            # Portfolio-level performance attribution
│   │   ├── data/                 # Market data library and file management
│   │   ├── robots.ts             # Dynamic search engine crawler directives
│   │   └── sitemap.ts            # Dynamic SEO sitemap generator
│   ├── components/               # Universal design system primitives
│   │   ├── common/               # QuantFlowLogo, AnimatedPage, PageHeader
│   │   ├── layout/               # TopNavbar, Sidebar, Navigation
│   │   └── charts/               # PerformanceChart, EquityCurveChart
│   ├── features/                 # Domain-driven modular feature components
│   │   ├── ai/                   # StrategyCopilotModal, RiskOfficerCard
│   │   ├── auth/                 # AuthLayout, CustomSignInForm, CustomSignUpForm
│   │   ├── backtest/             # BacktestForm, BacktestTable, BacktestDetails
│   │   └── billing/              # PricingCards, SubscriptionStatus
│   ├── services/                 # Decoupled backend integrations
│   │   ├── ai/                   # LangGraph StateGraph definitions & Mistral client
│   │   ├── backtest/             # Backtest service & Prisma database queries
│   │   └── quantEngine/          # Resilient HTTP client for C++ engine on EC2
│   └── lib/                      # Utilities, formatters, export utilities (CSV/PDF)
├── prisma/                       # PostgreSQL schema (Backtests, Trades, Notifications)
└── public/                       # Institutional SVGs, icons, and logo assets
```

---

## 🚀 Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure you have:
- `DATABASE_URL` (Supabase PostgreSQL)
- `QUANT_ENGINE_URL` (`http://3.6.68.152:8080` in production or `http://localhost:8080` locally)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY`
- `MISTRAL_API_KEY` (for LangGraph AI agents)

### 3. Generate Prisma Client & Database Migration
```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view your terminal.

### 5. Build for Production
```bash
npm run build
```
Typechecks and optimizes all 37 pages and route handlers with Turbopack.
