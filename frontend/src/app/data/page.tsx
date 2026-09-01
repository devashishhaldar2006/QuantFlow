import type { Metadata } from "next";
import { DataPlatformView } from "@/features/data/components/DataPlatformView";

export const metadata: Metadata = {
  title: "Data Platform — QuantFlow",
  description: "Ingest, map, validate, and manage historical OHLCV market datasets for quantitative backtesting.",
};

export default function DataPage() {
  return <DataPlatformView />;
}
