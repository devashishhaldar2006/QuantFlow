import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

/**
 * Sends an institutional dark-mode welcome email to newly registered QuantFlow users.
 */
export async function sendWelcomeEmail({
  to,
  name,
}: {
  to: string;
  name?: string | null;
}): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.log(`[Email Service] RESEND_API_KEY not configured. Mocking welcome email to ${to}`);
    return { success: true };
  }

  const recipientName = name || "Quantitative Trader";

  try {
    const data = await resend.emails.send({
      from: "QuantFlow Terminal <onboarding@resend.dev>",
      to: [to],
      subject: "Welcome to QuantFlow — Quantitative Backtesting Terminal",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      background-color: #030712;
      color: #f1f5f9;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 32px 16px;
    }
    .container {
      max-width: 560px;
      margin: 0 auto;
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      background: rgba(99, 102, 241, 0.15);
      border: 1px solid rgba(99, 102, 241, 0.3);
      color: #818cf8;
      font-size: 11px;
      font-weight: 700;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 16px;
    }
    h1 {
      font-size: 22px;
      font-weight: 800;
      color: #ffffff;
      margin-top: 0;
      margin-bottom: 12px;
      letter-spacing: -0.5px;
    }
    p {
      font-size: 14px;
      line-height: 1.6;
      color: #94a3b8;
      margin-bottom: 20px;
    }
    .feature-box {
      background: #090e1a;
      border: 1px solid #1e293b;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 24px;
    }
    .feature-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      font-size: 13px;
      color: #cbd5e1;
    }
    .feature-item:last-child {
      margin-bottom: 0;
    }
    .feature-icon {
      color: #6366f1;
      font-weight: bold;
      margin-right: 10px;
    }
    .btn {
      display: inline-block;
      background: #6366f1;
      color: #ffffff !important;
      font-weight: 600;
      font-size: 13px;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
    }
    .footer {
      margin-top: 32px;
      border-top: 1px solid #1e293b;
      padding-top: 16px;
      font-size: 11px;
      color: #64748b;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">Institutional Quant Engine</div>
    <h1>Welcome to QuantFlow, ${recipientName}</h1>
    <p>
      Your account is now activated. QuantFlow provides compiled, sub-millisecond C++ strategy backtesting, live multi-asset market data feeds, and institutional portfolio analytics.
    </p>

    <div class="feature-box">
      <div class="feature-item">
        <span class="feature-icon">⚡</span> <strong>Compiled C++ Engine:</strong> Run tick-accurate backtests with zero Python latency.
      </div>
      <div class="feature-item">
        <span class="feature-icon">📡</span> <strong>Live Data Feeds:</strong> Ingest OHLCV candles from Binance, Yahoo, and custom CSV uploads.
      </div>
      <div class="feature-item">
        <span class="feature-icon">📊</span> <strong>Tear Sheets & PDF Export:</strong> Generate institutional tear sheets and trade ledgers with 1-click.
      </div>
    </div>

    <div style="text-align: center; margin-top: 28px; margin-bottom: 24px;">
      <a href="http://localhost:3000/dashboard" class="btn">Launch QuantFlow Terminal</a>
    </div>

    <div class="footer">
      QuantFlow Terminal — Open-Source Algorithmic Research Platform<br>
      © ${new Date().getFullYear()} QuantFlow Inc. All rights reserved.
    </div>
  </div>
</body>
</html>
      `,
    });

    console.log(`[Email Service] Welcome email sent successfully to ${to}`);
    return { success: true };
  } catch (error) {
    console.error("[Email Service] Failed to send welcome email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}
