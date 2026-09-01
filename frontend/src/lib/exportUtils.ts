import { PersistedBacktest } from "@/features/backtest/types";
import { PortfolioSummary } from "@/services/portfolio/portfolioService";
import { AnalyticsSummary } from "@/services/analytics/analyticsService";

/**
 * Triggers a browser download of a generated file.
 */
export function downloadFile(content: string, fileName: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Export a single backtest results as CSV.
 */
export function exportBacktestCSV(backtest: PersistedBacktest) {
  const metaRows = [
    ["QuantFlow Terminal - Institutional Backtest Report"],
    ["Generated At", new Date().toISOString()],
    ["Backtest ID", backtest.id],
    ["Strategy", backtest.strategy],
    ["Status", backtest.status],
    ["Initial Capital", backtest.initialCapital.toFixed(2)],
    ["Final Equity", backtest.finalEquity.toFixed(2)],
    ["Net Profit", backtest.netProfit.toFixed(2)],
    ["Total Return %", backtest.totalReturnPercent.toFixed(2)],
    ["Sharpe Ratio", backtest.sharpeRatio.toFixed(2)],
    ["Maximum Drawdown %", backtest.maximumDrawdown.toFixed(2)],
    ["Total Trades", backtest.totalTrades.toString()],
    ["Winning Trades", backtest.winningTrades.toString()],
    ["Losing Trades", backtest.losingTrades.toString()],
    ["Win Rate %", backtest.winRatePercent.toFixed(2)],
    ["Profit Factor", backtest.profitFactor.toFixed(2)],
    ["Average Win", backtest.averageWin.toFixed(2)],
    ["Average Loss", backtest.averageLoss.toFixed(2)],
    ["Largest Win", backtest.largestWin.toFixed(2)],
    ["Largest Loss", backtest.largestLoss.toFixed(2)],
    ["Annualized Return", backtest.annualizedReturn.toFixed(4)],
    ["Annualized Volatility", backtest.annualizedVolatility.toFixed(4)],
    [],
    ["--- Trade Execution Ledger ---"],
    ["Timestamp", "Side", "Quantity", "Execution Price", "Commission", "Cash Flow"],
  ];

  const tradeRows = backtest.trades.map((t) => [
    t.timestamp,
    t.side,
    t.quantity.toString(),
    t.executionPrice.toFixed(4),
    t.commission.toFixed(4),
    t.cashFlow.toFixed(4),
  ]);

  const equityHeader = [
    [],
    ["--- Equity Curve Trajectory ---"],
    ["Timestamp", "Portfolio Equity"],
  ];

  const equityRows = backtest.equityCurve.map((e) => [
    e.timestamp,
    e.equity.toFixed(2),
  ]);

  const allRows = [...metaRows, ...tradeRows, ...equityHeader, ...equityRows];
  const csvContent = allRows.map((r) => r.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");

  const fileName = `quantflow_backtest_${backtest.strategy.toLowerCase().replace(/[^a-z0-9]/g, "_")}_${backtest.id.slice(0, 8)}.csv`;
  downloadFile(csvContent, fileName, "text/csv;charset=utf-8;");
}

/**
 * Export institutional PDF report for a backtest using browser printable canvas.
 */
export function exportBacktestPDF(backtest: PersistedBacktest) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to generate and print PDF reports.");
    return;
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>QuantFlow Report - ${backtest.strategy}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
    
    @page {
      margin: 15mm;
      size: A4 portrait;
    }

    body {
      font-family: 'Inter', -apple-system, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 24px;
      line-height: 1.5;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #6366f1;
      padding-bottom: 16px;
      margin-bottom: 24px;
    }

    .brand {
      font-size: 24px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
    }

    .brand span {
      color: #6366f1;
    }

    .subtitle {
      font-size: 11px;
      color: #64748b;
      margin-top: 2px;
      font-family: 'JetBrains Mono', monospace;
    }

    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      background: #eef2ff;
      color: #4f46e5;
      text-transform: uppercase;
      font-family: 'JetBrains Mono', monospace;
    }

    .grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 24px;
    }

    .metric-card {
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 12px 14px;
      background: #f8fafc;
    }

    .metric-label {
      font-size: 10px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-family: 'JetBrains Mono', monospace;
    }

    .metric-value {
      font-size: 18px;
      font-weight: 800;
      color: #0f172a;
      margin-top: 4px;
      font-family: 'JetBrains Mono', monospace;
    }

    .positive { color: #059669; }
    .negative { color: #dc2626; }

    h2 {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      color: #334155;
      letter-spacing: 0.5px;
      margin-top: 24px;
      margin-bottom: 12px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
      font-family: 'JetBrains Mono', monospace;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      margin-top: 8px;
      font-family: 'JetBrains Mono', monospace;
    }

    th {
      background: #f1f5f9;
      color: #475569;
      text-align: left;
      padding: 8px 10px;
      font-weight: 700;
      border-bottom: 1px solid #cbd5e1;
    }

    td {
      padding: 7px 10px;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
    }

    .footer {
      margin-top: 36px;
      border-top: 1px solid #e2e8f0;
      padding-top: 12px;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #94a3b8;
      font-family: 'JetBrains Mono', monospace;
    }

    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">Quant<span>Flow</span> Terminal</div>
      <div class="subtitle">Institutional Quantitative Backtesting Performance Tear Sheet</div>
    </div>
    <div style="text-align: right;">
      <div class="badge">${backtest.status}</div>
      <div class="subtitle" style="margin-top: 6px;">Report Date: ${new Date().toISOString().slice(0, 10)}</div>
    </div>
  </div>

  <h2>Strategy Execution Overview</h2>
  <div class="grid-4">
    <div class="metric-card">
      <div class="metric-label">Strategy Name</div>
      <div class="metric-value" style="font-size: 14px;">${backtest.strategy}</div>
    </div>
    <div class="metric-card">
      <div class="metric-label">Net Profit</div>
      <div class="metric-value ${backtest.netProfit >= 0 ? "positive" : "negative"}">
        ${backtest.netProfit >= 0 ? "+" : ""}$${backtest.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </div>
    </div>
    <div class="metric-card">
      <div class="metric-label">Total Return</div>
      <div class="metric-value ${backtest.totalReturnPercent >= 0 ? "positive" : "negative"}">
        ${backtest.totalReturnPercent >= 0 ? "+" : ""}${backtest.totalReturnPercent.toFixed(2)}%
      </div>
    </div>
    <div class="metric-card">
      <div class="metric-label">Sharpe Ratio</div>
      <div class="metric-value">${backtest.sharpeRatio.toFixed(2)}</div>
    </div>
  </div>

  <div class="grid-4">
    <div class="metric-card">
      <div class="metric-label">Initial Capital</div>
      <div class="metric-value">$${backtest.initialCapital.toLocaleString()}</div>
    </div>
    <div class="metric-card">
      <div class="metric-label">Final Equity</div>
      <div class="metric-value">$${backtest.finalEquity.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
    </div>
    <div class="metric-card">
      <div class="metric-label">Max Drawdown</div>
      <div class="metric-value negative">-${backtest.maximumDrawdown.toFixed(2)}%</div>
    </div>
    <div class="metric-card">
      <div class="metric-label">Profit Factor</div>
      <div class="metric-value">${backtest.profitFactor.toFixed(2)}</div>
    </div>
  </div>

  <h2>Trade Quality & Win Rate Metrics</h2>
  <div class="grid-4">
    <div class="metric-card">
      <div class="metric-label">Win Rate</div>
      <div class="metric-value ${backtest.winRatePercent >= 50 ? "positive" : "negative"}">${backtest.winRatePercent.toFixed(1)}%</div>
    </div>
    <div class="metric-card">
      <div class="metric-label">Total Executed Trades</div>
      <div class="metric-value">${backtest.totalTrades}</div>
    </div>
    <div class="metric-card">
      <div class="metric-label">Winning Trades</div>
      <div class="metric-value positive">${backtest.winningTrades}</div>
    </div>
    <div class="metric-card">
      <div class="metric-label">Losing Trades</div>
      <div class="metric-value negative">${backtest.losingTrades}</div>
    </div>
  </div>

  <h2>Trade Execution Ledger (First 25 Executions)</h2>
  <table>
    <thead>
      <tr>
        <th>Timestamp</th>
        <th>Side</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Commission</th>
        <th>Cash Flow</th>
      </tr>
    </thead>
    <tbody>
      ${
        backtest.trades.length === 0
          ? '<tr><td colspan="6" style="text-align: center; color: #94a3b8;">No executed trades recorded in this backtest run.</td></tr>'
          : backtest.trades
              .slice(0, 25)
              .map(
                (t) => `
        <tr>
          <td>${t.timestamp.replace("T", " ").slice(0, 16)}</td>
          <td style="font-weight: 700; color: ${t.side === "BUY" ? "#059669" : "#dc2626"};">${t.side}</td>
          <td>${t.quantity}</td>
          <td>$${t.executionPrice.toFixed(2)}</td>
          <td>$${t.commission.toFixed(2)}</td>
          <td style="font-weight: 700; color: ${t.cashFlow >= 0 ? "#059669" : "#dc2626"};">
            ${t.cashFlow >= 0 ? "+" : ""}$${t.cashFlow.toFixed(2)}
          </td>
        </tr>`,
              )
              .join("")
      }
    </tbody>
  </table>

  <div class="footer">
    <div>QuantFlow Compiled C++ Backtesting Platform — Confidential Institutional Report</div>
    <div>Backtest ID: ${backtest.id}</div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(() => {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}

/**
 * Export Portfolio Summary Report as CSV.
 */
export function exportPortfolioCSV(portfolio: PortfolioSummary) {
  const rows = [
    ["QuantFlow Portfolio Analytics Report"],
    ["Generated At", new Date().toISOString()],
    ["Total Backtests", portfolio.totalBacktests.toString()],
    ["Initial Capital", portfolio.initialCapital.toFixed(2)],
    ["Final Equity", portfolio.finalEquity.toFixed(2)],
    ["Net Profit", portfolio.netProfit.toFixed(2)],
    ["Total Return %", portfolio.returnPercent.toFixed(2)],
    [],
    ["--- Strategy Breakdown ---"],
    ["Strategy", "Backtest Count", "Initial Capital", "Final Equity", "Net Profit", "Return %"],
    ...portfolio.strategies.map((s) => [
      s.strategy,
      s.backtestCount.toString(),
      s.initialCapital.toFixed(2),
      s.finalEquity.toFixed(2),
      s.netProfit.toFixed(2),
      s.returnPercent.toFixed(2),
    ]),
    [],
    ["--- Recent Portfolio Trade Activities ---"],
    ["Timestamp", "Strategy", "Side", "Quantity", "Execution Price", "Commission", "Cash Flow"],
    ...portfolio.activities.map((a) => [
      a.timestamp,
      a.strategy,
      a.side,
      a.quantity.toString(),
      a.executionPrice.toFixed(4),
      a.commission.toFixed(4),
      a.cashFlow.toFixed(4),
    ]),
  ];

  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  downloadFile(csv, `quantflow_portfolio_report_${new Date().toISOString().slice(0, 10)}.csv`, "text/csv;charset=utf-8;");
}

/**
 * Export Analytics Comparison Summary as CSV.
 */
export function exportAnalyticsCSV(analytics: AnalyticsSummary) {
  const rows = [
    ["QuantFlow Strategy Comparison Analytics"],
    ["Generated At", new Date().toISOString()],
    ["Total Backtests Evaluated", analytics.totalBacktests.toString()],
    ["Overall Average Return %", analytics.averageReturn.toFixed(2)],
    ["Best Return %", analytics.bestReturn.toFixed(2)],
    ["Overall Average Sharpe", analytics.averageSharpe.toFixed(2)],
    ["Best Sharpe Ratio", analytics.bestSharpe.toFixed(2)],
    ["Best Maximum Drawdown %", analytics.bestMaxDrawdown.toFixed(2)],
    [],
    ["--- Strategy Rankings ---"],
    ["Strategy Name", "Backtest Count", "Average Return %", "Average Sharpe", "Best Return %", "Best Max DD %"],
    ...analytics.strategies.map((s) => [
      s.strategy,
      s.backtestCount.toString(),
      s.averageReturn.toFixed(2),
      s.averageSharpe.toFixed(2),
      s.bestReturn.toFixed(2),
      s.bestMaxDrawdown.toFixed(2),
    ]),
  ];

  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  downloadFile(csv, `quantflow_analytics_rankings_${new Date().toISOString().slice(0, 10)}.csv`, "text/csv;charset=utf-8;");
}
