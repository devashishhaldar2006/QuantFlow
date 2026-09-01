"use client";

import { ValidationReport } from "../types";
import { CheckCircle2, AlertTriangle, XCircle, FileSpreadsheet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ValidationSummaryProps {
  report: ValidationReport;
}

export function ValidationSummary({ report }: ValidationSummaryProps) {
  const formatDate = (iso: string | null) => {
    if (!iso) return "N/A";
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-4 bg-muted/20 p-5 rounded-xl border border-border/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {report.isValid ? (
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold text-sm">Validation Passed</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-rose-400">
              <XCircle className="w-5 h-5" />
              <span className="font-semibold text-sm">Validation Issues Found</span>
            </div>
          )}
        </div>
        <Badge variant={report.isValid ? "default" : "destructive"} className="text-xs">
          {report.validRows} / {report.totalRows} Valid Rows
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
        <div className="bg-background/60 p-3 rounded-lg border border-border/30">
          <p className="text-[11px] text-muted-foreground">Start Date</p>
          <p className="text-xs font-semibold mt-0.5">{formatDate(report.startDate)}</p>
        </div>
        <div className="bg-background/60 p-3 rounded-lg border border-border/30">
          <p className="text-[11px] text-muted-foreground">End Date</p>
          <p className="text-xs font-semibold mt-0.5">{formatDate(report.endDate)}</p>
        </div>
        <div className="bg-background/60 p-3 rounded-lg border border-border/30">
          <p className="text-[11px] text-muted-foreground">Row Count</p>
          <p className="text-xs font-semibold mt-0.5">{report.validRows.toLocaleString()}</p>
        </div>
        <div className="bg-background/60 p-3 rounded-lg border border-border/30">
          <p className="text-[11px] text-muted-foreground">Status</p>
          <p className={`text-xs font-semibold mt-0.5 ${report.isValid ? "text-emerald-400" : "text-rose-400"}`}>
            {report.isValid ? "Ready for Engine" : "Requires Fixes"}
          </p>
        </div>
      </div>

      {report.issues.length > 0 && (
        <div className="space-y-2 pt-2">
          <p className="text-xs font-medium text-muted-foreground">Quality Audit Findings</p>
          <div className="space-y-1.5">
            {report.issues.map((issue, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 text-xs p-2.5 rounded-lg border ${
                  issue.type === "ERROR"
                    ? "bg-rose-500/10 border-rose-500/20 text-rose-300"
                    : "bg-amber-500/10 border-amber-500/20 text-amber-300"
                }`}
              >
                {issue.type === "ERROR" ? (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                )}
                <span>{issue.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
