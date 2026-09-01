import { SystemLibraryItem, ColumnMapping } from "./types";

export const DEFAULT_COLUMN_MAPPING: ColumnMapping = {
  timestamp: "date",
  open: "open",
  high: "high",
  low: "low",
  close: "close",
  volume: "volume",
};

export const COMMON_TIMESTAMP_ALIASES = ["date", "timestamp", "datetime", "time", "date_time", "dt"];
export const COMMON_OPEN_ALIASES = ["open", "openprice", "open_price", "o"];
export const COMMON_HIGH_ALIASES = ["high", "highprice", "high_price", "h"];
export const COMMON_LOW_ALIASES = ["low", "lowprice", "low_price", "l"];
export const COMMON_CLOSE_ALIASES = ["close", "closeprice", "close_price", "c"];
export const COMMON_VOLUME_ALIASES = ["volume", "vol", "v", "totalvolume"];

export const SYSTEM_DATASET_LIBRARY: SystemLibraryItem[] = [
  {
    id: "sys-nifty50-1d",
    name: "NIFTY 50 Daily Benchmark",
    symbol: "NIFTY50",
    assetClass: "INDEX",
    timeframe: "1d",
    startDate: "2020-01-01T00:00:00.000Z",
    endDate: "2026-08-31T00:00:00.000Z",
    rowCount: 1650,
    description: "Official National Stock Exchange India index daily candle benchmark.",
    samplePath: "data/sample_nifty50_daily.csv",
  },
  {
    id: "sys-btcusdt-1h",
    name: "BTC/USDT 1-Hour Spot",
    symbol: "BTCUSDT",
    assetClass: "CRYPTO",
    timeframe: "1h",
    startDate: "2022-01-01T00:00:00.000Z",
    endDate: "2026-08-31T00:00:00.000Z",
    rowCount: 40880,
    description: "Binance spot market Bitcoin to Tether 1-hour candles.",
    samplePath: "data/sample_btcusdt_1h.csv",
  },
  {
    id: "sys-eurusd-15m",
    name: "EUR/USD 15-Min Forex",
    symbol: "EURUSD",
    assetClass: "FOREX",
    timeframe: "15m",
    startDate: "2023-01-01T00:00:00.000Z",
    endDate: "2026-08-31T00:00:00.000Z",
    rowCount: 93400,
    description: "Interbank Euro against US Dollar high frequency intraday data.",
    samplePath: "data/sample_eurusd_15m.csv",
  },
  {
    id: "sys-aapl-1d",
    name: "Apple Inc. (AAPL) Daily",
    symbol: "AAPL",
    assetClass: "EQUITY",
    timeframe: "1d",
    startDate: "2018-01-01T00:00:00.000Z",
    endDate: "2026-08-31T00:00:00.000Z",
    rowCount: 2180,
    description: "NASDAQ listed Apple stock split and dividend adjusted prices.",
    samplePath: "data/sample_aapl_daily.csv",
  },
];
