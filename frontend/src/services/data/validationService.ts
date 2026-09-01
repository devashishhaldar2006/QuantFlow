import { ColumnMapping, ValidationReport, ValidationIssue } from "@/features/data/types";

export class ValidationService {
  /**
   * Intelligently auto-detect column mapping based on standard headers.
   */
  static detectColumnMapping(headers: string[]): ColumnMapping {
    const lowerHeaders = headers.map((h) => h.trim().toLowerCase());
    
    const findMatch = (candidates: string[]): string => {
      for (const cand of candidates) {
        const idx = lowerHeaders.indexOf(cand);
        if (idx !== -1) return headers[idx];
      }
      // Partial match fallback
      for (const cand of candidates) {
        const idx = lowerHeaders.findIndex((h) => h.includes(cand));
        if (idx !== -1) return headers[idx];
      }
      return "";
    };

    return {
      timestamp: findMatch(["date", "timestamp", "datetime", "time", "date_time", "dt"]) || headers[0] || "",
      open: findMatch(["open", "openprice", "open_price", "o"]) || headers[1] || "",
      high: findMatch(["high", "highprice", "high_price", "h"]) || headers[2] || "",
      low: findMatch(["low", "lowprice", "low_price", "l"]) || headers[3] || "",
      close: findMatch(["close", "closeprice", "close_price", "c"]) || headers[4] || "",
      volume: findMatch(["volume", "vol", "v", "totalvolume"]) || headers[5] || "",
    };
  }

  /**
   * Run full auditing on raw CSV text and column map.
   */
  static validateCSVData(rawText: string, mapping: ColumnMapping): ValidationReport {
    const lines = rawText.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
    const issues: ValidationIssue[] = [];

    if (lines.length < 2) {
      return {
        isValid: false,
        totalRows: 0,
        validRows: 0,
        startDate: null,
        endDate: null,
        timeframeDetected: "unknown",
        issues: [{ type: "ERROR", code: "EMPTY_FILE", message: "CSV contains no data rows." }],
        metrics: { missingValues: 0, duplicateTimestamps: 0, chronologicalErrors: 0, priceInversions: 0, negativeVolumes: 0 },
      };
    }

    const headers = lines[0].split(",").map((h) => h.trim());
    const tsIdx = headers.indexOf(mapping.timestamp);
    const openIdx = headers.indexOf(mapping.open);
    const highIdx = headers.indexOf(mapping.high);
    const lowIdx = headers.indexOf(mapping.low);
    const closeIdx = headers.indexOf(mapping.close);
    const volIdx = headers.indexOf(mapping.volume);

    if (tsIdx === -1 || openIdx === -1 || highIdx === -1 || lowIdx === -1 || closeIdx === -1) {
      return {
        isValid: false,
        totalRows: lines.length - 1,
        validRows: 0,
        startDate: null,
        endDate: null,
        timeframeDetected: "unknown",
        issues: [{ type: "ERROR", code: "INVALID_MAPPING", message: "One or more mapped required columns do not exist in the header." }],
        metrics: { missingValues: 0, duplicateTimestamps: 0, chronologicalErrors: 0, priceInversions: 0, negativeVolumes: 0 },
      };
    }

    let missingValues = 0;
    let duplicateTimestamps = 0;
    let chronologicalErrors = 0;
    let priceInversions = 0;
    let negativeVolumes = 0;
    let validRows = 0;

    const timestampsSeen = new Set<string>();
    let prevTimestampDate: Date | null = null;
    let startDateStr: string | null = null;
    let endDateStr: string | null = null;

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(",").map((c) => c.trim());
      if (cols.length < Math.max(tsIdx, openIdx, highIdx, lowIdx, closeIdx) + 1) {
        missingValues++;
        continue;
      }

      const rawTs = cols[tsIdx];
      const openVal = parseFloat(cols[openIdx]);
      const highVal = parseFloat(cols[highIdx]);
      const lowVal = parseFloat(cols[lowIdx]);
      const closeVal = parseFloat(cols[closeIdx]);
      const volVal = volIdx !== -1 && cols[volIdx] ? parseFloat(cols[volIdx]) : 0;

      if (!rawTs || isNaN(openVal) || isNaN(highVal) || isNaN(lowVal) || isNaN(closeVal)) {
        missingValues++;
        continue;
      }

      const currentTsDate = new Date(rawTs);
      if (isNaN(currentTsDate.getTime())) {
        missingValues++;
        continue;
      }

      const isoTs = currentTsDate.toISOString();

      // Check duplicates
      if (timestampsSeen.has(isoTs)) {
        duplicateTimestamps++;
      } else {
        timestampsSeen.add(isoTs);
      }

      // Check chronology
      if (prevTimestampDate && currentTsDate < prevTimestampDate) {
        chronologicalErrors++;
      }
      prevTimestampDate = currentTsDate;

      // Track dates
      if (!startDateStr || currentTsDate < new Date(startDateStr)) {
        startDateStr = isoTs;
      }
      if (!endDateStr || currentTsDate > new Date(endDateStr)) {
        endDateStr = isoTs;
      }

      // Check price sanity
      if (highVal < lowVal || openVal > highVal || openVal < lowVal || closeVal > highVal || closeVal < lowVal) {
        priceInversions++;
      }

      // Check volume sanity
      if (volVal < 0) {
        negativeVolumes++;
      }

      validRows++;
    }

    if (missingValues > 0) {
      issues.push({ type: "WARNING", code: "MISSING_VALUES", message: `Found ${missingValues} rows with missing or malformed numeric values.`, count: missingValues });
    }
    if (duplicateTimestamps > 0) {
      issues.push({ type: "WARNING", code: "DUPLICATE_TIMESTAMPS", message: `Detected ${duplicateTimestamps} duplicate timestamp entries.`, count: duplicateTimestamps });
    }
    if (chronologicalErrors > 0) {
      issues.push({ type: "ERROR", code: "CHRONOLOGY_ERROR", message: `Found ${chronologicalErrors} instances of out-of-order timestamps.`, count: chronologicalErrors });
    }
    if (priceInversions > 0) {
      issues.push({ type: "WARNING", code: "PRICE_INVERSION", message: `Found ${priceInversions} candles where High/Low/Open/Close bounds were violated.`, count: priceInversions });
    }
    if (negativeVolumes > 0) {
      issues.push({ type: "WARNING", code: "NEGATIVE_VOLUME", message: `Found ${negativeVolumes} rows with negative volume values.`, count: negativeVolumes });
    }

    const isValid = chronologicalErrors === 0 && validRows > 0;

    return {
      isValid,
      totalRows: lines.length - 1,
      validRows,
      startDate: startDateStr,
      endDate: endDateStr,
      timeframeDetected: "1d",
      issues,
      metrics: {
        missingValues,
        duplicateTimestamps,
        chronologicalErrors,
        priceInversions,
        negativeVolumes,
      },
    };
  }
}
