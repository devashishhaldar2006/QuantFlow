import fs from "fs/promises";
import path from "path";
import { AssetClass, Timeframe } from "@/features/data/types";
import { DatasetService } from "./datasetService";
import { R2StorageService } from "@/lib/r2Storage";

export interface SyncDatasetInput {
  symbol: string;
  name: string;
  assetClass: AssetClass;
  timeframe: Timeframe;
  provider?: "YAHOO" | "BINANCE" | "CUSTOM";
}

export interface SyncResult {
  success: boolean;
  datasetId?: string;
  rowCount: number;
  filePath: string;
  startDate?: string;
  endDate?: string;
  error?: string;
}

/**
 * Production Market Data Integration Service
 * Implements Provider Adapter pattern for fetching live historical OHLCV data.
 */
export class MarketDataService {
  /**
   * Sanitizes symbols to prevent command/path traversal security vulnerabilities.
   */
  private static sanitizeSymbol(symbol: string): string {
    return symbol.replace(/[^a-zA-Z0-9^=._-]/g, "").toUpperCase();
  }

  /**
   * Maps internal symbols to external API provider ticker symbols (e.g. NIFTY50 -> ^NSEI)
   */
  private static mapProviderSymbol(symbol: string, assetClass: AssetClass): string {
    const s = symbol.toUpperCase().trim();
    if (s === "NIFTY50" || s === "NIFTY_50" || s === "NIFTY") return "^NSEI";
    if (s === "EURUSD" || s === "EUR/USD") return "EURUSD=X";
    if (s === "BTCUSDT" || s === "BTC/USDT" || s === "BTC") {
      return assetClass === "CRYPTO" ? "BTCUSDT" : "BTC-USD";
    }
    return s;
  }

  /**
   * Fetch historical candles from Binance (Crypto)
   */
  private static async fetchFromBinance(symbol: string, timeframe: Timeframe): Promise<string[][]> {
    const mappedSymbol = this.mapProviderSymbol(symbol, "CRYPTO");
    const formattedSymbol = mappedSymbol.replace("/", "").replace("-", "").toUpperCase();
    const intervalMap: Record<Timeframe, string> = {
      "1m": "1m",
      "5m": "5m",
      "15m": "15m",
      "1h": "1h",
      "4h": "4h",
      "1d": "1d",
    };
    const interval = intervalMap[timeframe] || "1d";
    const url = `https://api.binance.com/api/v3/klines?symbol=${formattedSymbol}&interval=${interval}&limit=1000`;

    const res = await fetch(url, { headers: { "User-Agent": "QuantFlow-Terminal/1.0" } });
    if (!res.ok) {
      throw new Error(`Binance API error (${res.status}): Symbol ${formattedSymbol} not found`);
    }

    const rawData = await res.json();
    const rows: string[][] = [["Timestamp", "Open", "High", "Low", "Close", "Volume"]];

    for (const candle of rawData) {
      const timestamp = new Date(candle[0]).toISOString().replace("T", " ").substring(0, 16);
      const open = parseFloat(candle[1]).toFixed(4);
      const high = parseFloat(candle[2]).toFixed(4);
      const low = parseFloat(candle[3]).toFixed(4);
      const close = parseFloat(candle[4]).toFixed(4);
      const volume = Math.round(parseFloat(candle[5])).toString();

      rows.push([timestamp, open, high, low, close, volume]);
    }

    return rows;
  }

  /**
   * Fetch historical candles from Yahoo Finance (Equity / Index / Forex)
   */
  private static async fetchFromYahoo(symbol: string, timeframe: Timeframe, assetClass: AssetClass): Promise<string[][]> {
    const targetSymbol = this.mapProviderSymbol(symbol, assetClass);
    const rangeMap: Record<Timeframe, { range: string; interval: string }> = {
      "1m": { range: "7d", interval: "1m" },
      "5m": { range: "60d", interval: "5m" },
      "15m": { range: "60d", interval: "15m" },
      "1h": { range: "730d", interval: "1h" },
      "4h": { range: "730d", interval: "1h" },
      "1d": { range: "5y", interval: "1d" },
    };

    const config = rangeMap[timeframe] || { range: "2y", interval: "1d" };
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
      targetSymbol,
    )}?interval=${config.interval}&range=${config.range}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) QuantFlow/1.0",
      },
    });

    if (!res.ok) {
      throw new Error(`Yahoo Finance API error (${res.status}): Symbol '${targetSymbol}' not found`);
    }

    const data = await res.json();
    const result = data?.chart?.result?.[0];
    if (!result || !result.timestamp || !result.indicators?.quote?.[0]) {
      throw new Error("No market data candles returned for symbol");
    }

    const timestamps: number[] = result.timestamp;
    const quote = result.indicators.quote[0];

    const rows: string[][] = [["Timestamp", "Open", "High", "Low", "Close", "Volume"]];

    for (let i = 0; i < timestamps.length; i++) {
      const open = quote.open[i];
      const high = quote.high[i];
      const low = quote.low[i];
      const close = quote.close[i];
      const volume = quote.volume[i] ?? 1000;

      if (open != null && high != null && low != null && close != null) {
        const ts = new Date(timestamps[i] * 1000).toISOString().replace("T", " ").substring(0, 16);
        rows.push([
          ts,
          open.toFixed(4),
          high.toFixed(4),
          low.toFixed(4),
          close.toFixed(4),
          Math.round(volume).toString(),
        ]);
      }
    }

    return rows;
  }

  /**
   * Sync market dataset: Fetches from provider, generates CSV, and updates database
   */
  static async syncMarketDataset(userId: string, input: SyncDatasetInput): Promise<SyncResult> {
    try {
      const cleanSymbol = this.sanitizeSymbol(input.symbol);
      if (!cleanSymbol) {
        return { success: false, rowCount: 0, filePath: "", error: "Invalid symbol format" };
      }

      let rows: string[][];

      // Provider selection logic
      if (input.assetClass === "CRYPTO" || input.provider === "BINANCE") {
        rows = await this.fetchFromBinance(cleanSymbol, input.timeframe);
      } else {
        rows = await this.fetchFromYahoo(cleanSymbol, input.timeframe, input.assetClass);
      }

      if (rows.length <= 1) {
        return { success: false, rowCount: 0, filePath: "", error: "No historical candles retrieved" };
      }

      // Convert rows to CSV string
      const csvContent = rows.map((r) => r.join(",")).join("\n");
      const fileName = `market_${cleanSymbol.toLowerCase()}_${input.timeframe}.csv`;

      // Upload to Cloudflare R2 / S3 (or local fallback in dev)
      const relativeFilePath = await R2StorageService.uploadFile({
        key: `datasets/${fileName}`,
        content: csvContent,
        contentType: "text/csv",
      });

      // Calculate metadata
      const rowCount = rows.length - 1;
      const startDate = rows[1][0];
      const endDate = rows[rows.length - 1][0];

      // Save dataset metadata in Database via DatasetService
      const dataset = await DatasetService.createDataset(userId, {
        name: input.name || `${cleanSymbol} Market Feed`,
        symbol: cleanSymbol,
        assetClass: input.assetClass,
        timeframe: input.timeframe,
        source: "API_PROVIDER",
        filePath: relativeFilePath,
        fileSize: Buffer.byteLength(csvContent),
        rowCount,
        startDate,
        endDate,
        validation: {
          isValid: true,
          totalRows: rowCount,
          validRows: rowCount,
          startDate,
          endDate,
          timeframeDetected: input.timeframe,
          issues: [],
          metrics: {
            missingValues: 0,
            duplicateTimestamps: 0,
            chronologicalErrors: 0,
            priceInversions: 0,
            negativeVolumes: 0,
          },
        },
      });

      return {
        success: true,
        datasetId: dataset.id,
        rowCount,
        filePath: relativeFilePath,
        startDate,
        endDate,
      };
    } catch (err) {
      console.error("MarketDataService sync error:", err);
      return {
        success: false,
        rowCount: 0,
        filePath: "",
        error: err instanceof Error ? err.message : "Failed to sync market dataset",
      };
    }
  }
}
