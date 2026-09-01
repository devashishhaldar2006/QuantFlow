import { useState, useCallback } from "react";
import { CSVParseResult, ColumnMapping, ValidationReport } from "../types";
import { ValidationService } from "@/services/data/validationService";

export function useDatasetUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [parseResult, setParseResult] = useState<CSVParseResult | null>(null);
  const [columnMap, setColumnMap] = useState<ColumnMapping | null>(null);
  const [validationReport, setValidationReport] = useState<ValidationReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rawText, setRawText] = useState<string>("");

  const handleFileSelect = useCallback(async (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
    setParseResult(null);
    setValidationReport(null);

    if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
      setError("Please select a valid CSV file.");
      return;
    }

    try {
      const text = await selectedFile.text();
      setRawText(text);

      const lines = text.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
      if (lines.length < 2) {
        setError("CSV file must contain a header and at least one data row.");
        return;
      }

      const headers = lines[0].split(",").map((h) => h.trim());
      const sampleRows = lines.slice(1, 6).map((line) => line.split(",").map((c) => c.trim()));

      const detectedMap = ValidationService.detectColumnMapping(headers);

      setParseResult({
        headers,
        sampleRows,
        totalRows: lines.length - 1,
        suggestedMapping: detectedMap,
      });
      setColumnMap(detectedMap);

      // Perform immediate preliminary validation
      const report = ValidationService.validateCSVData(text, detectedMap);
      setValidationReport(report);
    } catch (err) {
      console.error("Failed to parse CSV client-side:", err);
      setError("Failed to read CSV file content.");
    }
  }, []);

  const updateColumnMapping = useCallback(
    (field: keyof ColumnMapping, value: string) => {
      if (!columnMap) return;
      const updated = { ...columnMap, [field]: value };
      setColumnMap(updated);

      if (rawText) {
        const report = ValidationService.validateCSVData(rawText, updated);
        setValidationReport(report);
      }
    },
    [columnMap, rawText]
  );

  return {
    file,
    uploading,
    setUploading,
    parseResult,
    columnMap,
    validationReport,
    error,
    setError,
    rawText,
    handleFileSelect,
    updateColumnMapping,
  };
}
