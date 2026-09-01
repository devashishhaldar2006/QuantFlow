"use client";

import { useRef } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DatasetUploaderProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  error?: string | null;
}

export function DatasetUploader({ file, onFileSelect, error }: DatasetUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
          file
            ? "border-emerald-500/50 bg-emerald-500/5 hover:bg-emerald-500/10"
            : error
            ? "border-rose-500/50 bg-rose-500/5 hover:bg-rose-500/10"
            : "border-border/60 bg-muted/20 hover:bg-muted/40 hover:border-primary/50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              onFileSelect(e.target.files[0]);
            }
          }}
        />

        {file ? (
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400">
              <FileText className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for schema inspection
              </p>
            </div>
            <Button size="sm" variant="outline" className="mt-2 text-xs">
              Change CSV File
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Upload className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">
                Drag & drop your market data CSV here
              </p>
              <p className="text-xs text-muted-foreground">
                or click to browse your filesystem
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground/80 bg-background/50 px-3 py-1 rounded-full border border-border/40">
              <span>Supported format: .csv</span>
              <span>•</span>
              <span>Max size: 10 MB</span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
