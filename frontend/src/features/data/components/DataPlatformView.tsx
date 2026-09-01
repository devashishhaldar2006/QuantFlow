"use client";

import { useState } from "react";
import { useDatasetUpload } from "../hooks/useDatasetUpload";
import { DatasetUploader } from "./DatasetUploader";
import { ColumnMapper } from "./ColumnMapper";
import { DatasetPreview } from "./DatasetPreview";
import { ValidationSummary } from "./ValidationSummary";
import { DatasetLibrary } from "./DatasetLibrary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, Plus, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { AssetClass, Timeframe } from "../types";

export function DataPlatformView() {
  const [activeTab, setActiveTab] = useState<"library" | "upload">("library");
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Metadata state
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [assetClass, setAssetClass] = useState<AssetClass>("EQUITY");
  const [timeframe, setTimeframe] = useState<Timeframe>("1d");
  const [version, setVersion] = useState("v1.0.0");
  const [saving, setSaving] = useState(false);

  const {
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
  } = useDatasetUpload();

  const handleSaveDataset = async () => {
    if (!file || !columnMap || !validationReport) return;
    if (!name.trim() || !symbol.trim()) {
      setError("Please provide a dataset name and symbol identifier.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      // 1. Upload CSV to endpoint
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload/csv", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const uploadErr = await uploadRes.json();
        throw new Error(uploadErr.error || "Failed to upload CSV file.");
      }

      const uploadData = await uploadRes.json();

      // 2. Register Dataset record in DB
      const createRes = await fetch("/api/datasets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          symbol: symbol.trim().toUpperCase(),
          assetClass,
          timeframe,
          filePath: uploadData.path,
          fileSize: file.size,
          rowCount: validationReport.validRows,
          startDate: validationReport.startDate,
          endDate: validationReport.endDate,
          version,
          columnMap,
          validation: validationReport,
        }),
      });

      if (!createRes.ok) {
        const createErr = await createRes.json();
        throw new Error(createErr.error || "Failed to save dataset metadata.");
      }

      // Reset and return to library
      setActiveTab("library");
      setStep(1);
      setName("");
      setSymbol("");
    } catch (err) {
      console.error("Save dataset error:", err);
      setError(err instanceof Error ? err.message : "Failed to save dataset.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-100">Market Data Platform</h1>
              <p className="text-xs text-slate-400">
                Ingest, normalize, validate, and manage historical OHLCV market datasets for reproducible research.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "library" ? (
            <Button
              onClick={() => {
                setActiveTab("upload");
                setStep(1);
              }}
              className="gap-2 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              Import CSV Dataset
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                setActiveTab("library");
              }}
              className="text-xs border-slate-700 bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Back to Dataset Library
            </Button>
          )}
        </div>
      </div>

      {activeTab === "library" ? (
        <DatasetLibrary
          onNewDatasetClick={() => {
            setActiveTab("upload");
            setStep(1);
          }}
        />
      ) : (
        <div className="space-y-6 bg-card border border-border/50 p-6 rounded-2xl shadow-sm">
          {/* Stepper Header */}
          <div className="flex items-center justify-between border-b border-border/40 pb-4">
            <div className="flex items-center gap-6 text-xs">
              <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">1</span>
                <span>Upload CSV</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40" />
              <div className={`flex items-center gap-2 ${step >= 2 ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">2</span>
                <span>Map Columns & Audit</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40" />
              <div className={`flex items-center gap-2 ${step >= 3 ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">3</span>
                <span>Metadata & Save</span>
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <DatasetUploader
                file={file}
                onFileSelect={(f) => {
                  handleFileSelect(f);
                  setName(f.name.replace(/\.[^/.]+$/, "").toUpperCase());
                }}
                error={error}
              />

              {parseResult && (
                <div className="flex justify-end pt-2">
                  <Button onClick={() => setStep(2)} className="gap-2 text-xs">
                    Next: Column Mapping
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {step === 2 && parseResult && columnMap && validationReport && (
            <div className="space-y-6">
              <ColumnMapper headers={parseResult.headers} columnMap={columnMap} onMapChange={updateColumnMapping} />

              <ValidationSummary report={validationReport} />

              <DatasetPreview headers={parseResult.headers} sampleRows={parseResult.sampleRows} columnMap={columnMap} />

              <div className="flex items-center justify-between pt-2">
                <Button variant="outline" size="sm" onClick={() => setStep(1)} className="gap-1.5 text-xs">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button
                  size="sm"
                  disabled={!validationReport.isValid}
                  onClick={() => setStep(3)}
                  className="gap-2 text-xs"
                >
                  Next: Finalize Identity
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && validationReport && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-foreground">Dataset Identity & Catalog Metadata</h3>
                <p className="text-xs text-muted-foreground">
                  Give this dataset a unique identity so it can be cited and reused across all backtest runs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/20 p-5 rounded-xl border border-border/50">
                <div className="space-y-1.5">
                  <Label className="text-xs">Dataset Display Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. NIFTY 50 5m 2020-2026"
                    className="text-xs h-9"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Ticker Symbol</Label>
                  <Input
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    placeholder="e.g. NIFTY50"
                    className="text-xs h-9 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Asset Class</Label>
                  <Select value={assetClass} onValueChange={(v) => setAssetClass(v as AssetClass)}>
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EQUITY">Equity / Stock</SelectItem>
                      <SelectItem value="CRYPTO">Crypto</SelectItem>
                      <SelectItem value="FOREX">Forex</SelectItem>
                      <SelectItem value="INDEX">Index</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Candle Timeframe</Label>
                  <Select value={timeframe} onValueChange={(v) => setTimeframe(v as Timeframe)}>
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1m">1 Minute (1m)</SelectItem>
                      <SelectItem value="5m">5 Minutes (5m)</SelectItem>
                      <SelectItem value="15m">15 Minutes (15m)</SelectItem>
                      <SelectItem value="1h">1 Hour (1h)</SelectItem>
                      <SelectItem value="4h">4 Hours (4h)</SelectItem>
                      <SelectItem value="1d">1 Day (1d)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Version Identifier</Label>
                  <Input
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="e.g. v1.0.0"
                    className="text-xs h-9 font-mono"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <Button variant="outline" size="sm" onClick={() => setStep(2)} className="gap-1.5 text-xs">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button
                  size="sm"
                  disabled={saving}
                  onClick={handleSaveDataset}
                  className="gap-2 text-xs bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  {saving ? (
                    "Cataloging Dataset..."
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Save & Catalog Dataset
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
