# QuantFlow Technical Constraints & Quantitative Limitations

This document provides a transparent, unvarnished disclosure of the mathematical assumptions, engineering boundaries, and model limitations of the QuantFlow backtesting engine and accompanying research platform.

---

## 1. Market Data & Execution Assumptions

### OHLCV Discretization (No Tick/Order Book Microstructure)
- **Granularity**: The core engine evaluates market data at discrete bar intervals (e.g. 1-minute or 1-day candles). It does not maintain an order book (Level 2 / Level 3 Market By Order depth).
- **Latency Arbitrage**: Orders are evaluated based on candle boundaries. Queue position in the exchange matching engine and millisecond latency jitter are not simulated.
- **Liquidity & Market Impact**: Slippage is modeled proportionally or linearly as a basis-point friction. In live market trading, non-linear market impact, order book depletion, and iceberg execution significantly alter real execution prices, especially for larger position sizes.

### Intrabar Double-Trigger Rule (Conservative Heuristic)
- If both Stop-Loss and Take-Profit price thresholds are breached within the High and Low of a single candle, the engine assumes **Stop-Loss triggers first**.
- **Limitation**: While this eliminates optimistic curve-fitting, it remains a heuristic. In real trading, the actual intra-candle sequence of trades determines which level was hit first. Only tick-by-tick timestamped trades can resolve intrabar order ordering definitively.

---

## 2. Statistical Analysis & Financial Modeling

### I.I.D. Normal Return Assumption
- Standard Sharpe and Sortino ratios computed by the engine assume return distributions are independent and identically distributed (i.i.d.) and Gaussian.
- **Limitation**: Real financial asset returns exhibit autocorrelation, fat tails (excess kurtosis), negative skewness, and volatility clustering (GARCH effects).
- Users should perform Monte Carlo trade sequence shuffling and Deflated Sharpe Ratio (DSR) adjustments before deploying capital on backtest results.

### Sample Size Significance
- Any backtest yielding fewer than **30–50 round-trip trades** has insufficient statistical power to separate skill from variance.
- Strategy metrics calculated over brief historical periods are prone to regime-specific survivorship bias.

---

## 3. Autonomous AI Modules (LangGraph + LLM)

### Role as Research Assistant, Not Quantitative Auditor
- The Strategy Architect and Risk Officer agents are built using Large Language Models (Mistral Small via LangGraph).
- **Limitation**: LLMs perform qualitative heuristics and pattern explanations based on summary statistics. They **cannot** perform rigorous continuous numerical audits, verify closed-form mathematical equations, or replace quantitative stress-testing engines.
- AI memos and health scores are designed as interactive research summaries and should never be used as the sole basis for live risk deployment.

---

## 4. Multi-Tenant Infrastructure & Live Environments

- QuantFlow is engineered for strategy research and offline quantitative evaluation.
- It does not currently provide direct FIX / ITCH protocol exchange gateways, live order execution routers, or broker margin compliance interfaces.
