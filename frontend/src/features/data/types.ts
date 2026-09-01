export type AssetClass = "EQUITY" | "CRYPTO" | "FOREX" | "INDEX";
export type Timeframe = "1m" | "5m" | "15m" | "1h" | "4h" | "1d";
export type DatasetSource = "CSV_UPLOAD" | "SYSTEM_LIBRARY" | "API_PROVIDER";
export type DatasetStatus = "UNVALIDATED" | "VALIDATED" | "ERROR";

export interface ColumnMapping {
  timestamp: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface ValidationIssue {
  type: "WARNING" | "ERROR";
  code: string;
  message: string;
  count?: number;
}

export interface ValidationReport {
  isValid: boolean;
  totalRows: number;
  validRows: number;
  startDate: string | null;
  endDate: string | null;
  timeframeDetected: string;
  issues: ValidationIssue[];
  metrics: {
    missingValues: number;
    duplicateTimestamps: number;
    chronologicalErrors: number;
    priceInversions: number;
    negativeVolumes: number;
  };
}

export interface Dataset {
  id: string;
  name: string;
  symbol: string;
  assetClass: AssetClass;
  timeframe: Timeframe;
  source: DatasetSource;
  filePath: string;
  fileSize: number;
  rowCount: number;
  startDate: string | null;
  endDate: string | null;
  version: string;
  status: DatasetStatus;
  columnMap?: ColumnMapping | null;
  validation?: ValidationReport | null;
  createdAt: string;
  updatedAt: string;
}

export interface SystemLibraryItem {
  id: string;
  name: string;
  symbol: string;
  assetClass: AssetClass;
  timeframe: Timeframe;
  startDate: string;
  endDate: string;
  rowCount: number;
  description: string;
  samplePath: string;
}

export interface CSVParseResult {
  headers: string[];
  sampleRows: string[][];
  totalRows: number;
  suggestedMapping: ColumnMapping;
}
