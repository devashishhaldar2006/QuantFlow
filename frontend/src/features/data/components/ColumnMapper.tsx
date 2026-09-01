"use client";

import { ColumnMapping } from "../types";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ColumnMapperProps {
  headers: string[];
  columnMap: ColumnMapping;
  onMapChange: (field: keyof ColumnMapping, value: string) => void;
}

type FieldDef = {
  key: keyof ColumnMapping;
  label: string;
  description: string;
  required: boolean;
};

const FIELD_DEFS: FieldDef[] = [
  { key: "timestamp", label: "Date / Timestamp", description: "ISO 8601 or standard date format", required: true },
  { key: "open",      label: "Open Price",        description: "Opening bar price",              required: true },
  { key: "high",      label: "High Price",        description: "Bar highest price",              required: true },
  { key: "low",       label: "Low Price",         description: "Bar lowest price",               required: true },
  { key: "close",     label: "Close Price",       description: "Closing bar price",              required: true },
  { key: "volume",    label: "Volume (Optional)", description: "Trading volume for the bar",     required: false },
];

function getFieldValue(map: ColumnMapping, key: keyof ColumnMapping): string {
  const val: string = map[key];
  return val;
}

export function ColumnMapper({ headers, columnMap, onMapChange }: ColumnMapperProps) {
  return (
    <div className="space-y-4 bg-muted/20 p-5 rounded-xl border border-border/50">
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-foreground">Column Mapping</h4>
        <p className="text-xs text-muted-foreground">
          Map your CSV columns into QuantFlow&apos;s canonical market data schema.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        {FIELD_DEFS.map((field) => {
          const currentValue = getFieldValue(columnMap, field.key);
          return (
            <div key={field.key} className="space-y-1.5">
              <Label className="text-xs font-medium flex items-center justify-between">
                <span>{field.label}</span>
                {field.required ? (
                  <span className="text-[10px] text-amber-400 font-normal">Required</span>
                ) : (
                  <span className="text-[10px] text-muted-foreground font-normal">Optional</span>
                )}
              </Label>
              <Select
                value={currentValue || "__none__"}
                onValueChange={(val: string | null) => { if (val !== null) onMapChange(field.key, val === "__none__" ? "" : val); }}
              >
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="Select column" />
                </SelectTrigger>
                <SelectContent>
                  {!field.required && <SelectItem value="__none__">-- Skip Column --</SelectItem>}
                  {headers.map((header) => (
                    <SelectItem key={header} value={header} className="text-xs">
                      {header}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground">{field.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
