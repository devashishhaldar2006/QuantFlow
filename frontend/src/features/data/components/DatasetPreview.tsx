"use client";

import { ColumnMapping } from "../types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DatasetPreviewProps {
  headers: string[];
  sampleRows: string[][];
  columnMap: ColumnMapping;
}

export function DatasetPreview({ headers, sampleRows, columnMap }: DatasetPreviewProps) {
  const getMappedRole = (headerName: string) => {
    for (const [key, val] of Object.entries(columnMap)) {
      if (val === headerName) return key.toUpperCase();
    }
    return null;
  };

  return (
    <div className="space-y-3 bg-muted/20 p-5 rounded-xl border border-border/50">
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-foreground">Sample Data Preview</h4>
        <p className="text-xs text-muted-foreground">
          Showing first 5 rows of your CSV file with active column mappings.
        </p>
      </div>

      <div className="rounded-lg border border-border/40 overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              {headers.map((h, i) => {
                const role = getMappedRole(h);
                return (
                  <TableHead key={i} className="text-xs font-semibold py-2">
                    <div className="flex flex-col">
                      <span>{h}</span>
                      {role && (
                        <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                          → {role}
                        </span>
                      )}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleRows.map((row, rIdx) => (
              <TableRow key={rIdx} className="hover:bg-muted/30">
                {row.map((cell, cIdx) => (
                  <TableCell key={cIdx} className="text-xs font-mono py-2">
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
