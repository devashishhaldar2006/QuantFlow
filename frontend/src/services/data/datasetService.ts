import { prisma } from "@/lib/prisma";
import { Dataset, ColumnMapping, ValidationReport, AssetClass, Timeframe, DatasetSource } from "@/features/data/types";
import { SYSTEM_DATASET_LIBRARY } from "@/features/data/constants";

export interface CreateDatasetInput {
  name: string;
  symbol: string;
  assetClass: AssetClass;
  timeframe: Timeframe;
  source?: DatasetSource;
  filePath: string;
  fileSize: number;
  rowCount: number;
  startDate?: string | null;
  endDate?: string | null;
  version?: string;
  columnMap?: ColumnMapping | null;
  validation?: ValidationReport | null;
}

export class DatasetService {
  /**
   * Get all user datasets + system library items formatted consistently.
   */
  static async getUserDatasets(userId: string): Promise<Dataset[]> {
    let userDatasets: Dataset[] = [];
    try {
      const userDbDatasets = await prisma.dataset.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });

      userDatasets = userDbDatasets.map((d) => ({
        id: d.id,
        name: d.name,
        symbol: d.symbol,
        assetClass: d.assetClass as AssetClass,
        timeframe: d.timeframe as Timeframe,
        source: d.source as DatasetSource,
        filePath: d.filePath,
        fileSize: d.fileSize,
        rowCount: d.rowCount,
        startDate: d.startDate ? d.startDate.toISOString() : null,
        endDate: d.endDate ? d.endDate.toISOString() : null,
        version: d.version,
        status: d.status as any,
        columnMap: (d.columnMap as unknown as ColumnMapping) || null,
        validation: (d.validation as unknown as ValidationReport) || null,
        createdAt: d.createdAt.toISOString(),
        updatedAt: d.updatedAt.toISOString(),
      }));
    } catch (err) {
      console.error("getUserDatasets error:", err);
    }

    // Deduplicate system library datasets: If user has synced a live copy of a symbol & timeframe, don't return the stale static placeholder
    const userKeys = new Set(
      userDatasets.map((d) => `${d.symbol.toUpperCase()}_${d.timeframe}`)
    );

    const systemDatasets: Dataset[] = SYSTEM_DATASET_LIBRARY
      .filter((item) => !userKeys.has(`${item.symbol.toUpperCase()}_${item.timeframe}`))
      .map((item) => ({
        id: item.id,
        name: item.name,
        symbol: item.symbol,
        assetClass: item.assetClass,
        timeframe: item.timeframe,
        source: "SYSTEM_LIBRARY",
        filePath: item.samplePath,
        fileSize: item.rowCount * 64, // Approximate payload
        rowCount: item.rowCount,
        startDate: item.startDate,
        endDate: item.endDate,
        version: "v1.0.0",
        status: "VALIDATED",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

    return [...userDatasets, ...systemDatasets];
  }

  /**
   * Fetch a single dataset by ID.
   */
  static async getDatasetById(id: string, userId: string): Promise<Dataset | null> {
    if (id.startsWith("sys-")) {
      const sysItem = SYSTEM_DATASET_LIBRARY.find((item) => item.id === id);
      if (!sysItem) return null;
      return {
        id: sysItem.id,
        name: sysItem.name,
        symbol: sysItem.symbol,
        assetClass: sysItem.assetClass,
        timeframe: sysItem.timeframe,
        source: "SYSTEM_LIBRARY",
        filePath: sysItem.samplePath,
        fileSize: sysItem.rowCount * 64,
        rowCount: sysItem.rowCount,
        startDate: sysItem.startDate,
        endDate: sysItem.endDate,
        version: "v1.0.0",
        status: "VALIDATED",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    const d = await prisma.dataset.findFirst({
      where: { id, userId },
    });

    if (!d) return null;

    return {
      id: d.id,
      name: d.name,
      symbol: d.symbol,
      assetClass: d.assetClass as AssetClass,
      timeframe: d.timeframe as Timeframe,
      source: d.source as DatasetSource,
      filePath: d.filePath,
      fileSize: d.fileSize,
      rowCount: d.rowCount,
      startDate: d.startDate ? d.startDate.toISOString() : null,
      endDate: d.endDate ? d.endDate.toISOString() : null,
      version: d.version,
      status: d.status as any,
      columnMap: (d.columnMap as unknown as ColumnMapping) || null,
      validation: (d.validation as unknown as ValidationReport) || null,
      createdAt: d.createdAt.toISOString(),
      updatedAt: d.updatedAt.toISOString(),
    };
  }

  /**
   * Create or update dataset record (Upsert based on symbol and timeframe).
   */
  static async upsertDataset(userId: string, input: CreateDatasetInput): Promise<Dataset> {
    const existing = await prisma.dataset.findFirst({
      where: {
        userId,
        symbol: input.symbol,
        timeframe: input.timeframe,
      },
    });

    let d;
    if (existing) {
      d = await prisma.dataset.update({
        where: { id: existing.id },
        data: {
          name: input.name,
          assetClass: input.assetClass,
          filePath: input.filePath,
          fileSize: input.fileSize,
          rowCount: input.rowCount,
          startDate: input.startDate ? new Date(input.startDate) : null,
          endDate: input.endDate ? new Date(input.endDate) : null,
          version: input.version || "v1.0.0",
          status: input.validation?.isValid ? "VALIDATED" : "UNVALIDATED",
          columnMap: input.columnMap ? (input.columnMap as any) : undefined,
          validation: input.validation ? (input.validation as any) : undefined,
        },
      });
    } else {
      d = await prisma.dataset.create({
        data: {
          userId,
          name: input.name,
          symbol: input.symbol,
          assetClass: input.assetClass,
          timeframe: input.timeframe,
          source: input.source || "CSV_UPLOAD",
          filePath: input.filePath,
          fileSize: input.fileSize,
          rowCount: input.rowCount,
          startDate: input.startDate ? new Date(input.startDate) : null,
          endDate: input.endDate ? new Date(input.endDate) : null,
          version: input.version || "v1.0.0",
          status: input.validation?.isValid ? "VALIDATED" : "UNVALIDATED",
          columnMap: input.columnMap ? (input.columnMap as any) : undefined,
          validation: input.validation ? (input.validation as any) : undefined,
        },
      });
    }

    return {
      id: d.id,
      name: d.name,
      symbol: d.symbol,
      assetClass: d.assetClass as AssetClass,
      timeframe: d.timeframe as Timeframe,
      source: d.source as DatasetSource,
      filePath: d.filePath,
      fileSize: d.fileSize,
      rowCount: d.rowCount,
      startDate: d.startDate ? d.startDate.toISOString() : null,
      endDate: d.endDate ? d.endDate.toISOString() : null,
      version: d.version,
      status: d.status as any,
      columnMap: (d.columnMap as unknown as ColumnMapping) || null,
      validation: (d.validation as unknown as ValidationReport) || null,
      createdAt: d.createdAt.toISOString(),
      updatedAt: d.updatedAt.toISOString(),
    };
  }

  /**
   * Save a newly created dataset record.
   */
  static async createDataset(userId: string, input: CreateDatasetInput): Promise<Dataset> {
    return this.upsertDataset(userId, input);
  }

  /**
   * Delete user dataset.
   */
  static async deleteDataset(id: string, userId: string): Promise<boolean> {
    if (id.startsWith("sys-")) return false; // Cannot delete system items
    const deleted = await prisma.dataset.deleteMany({
      where: { id, userId },
    });
    return deleted.count > 0;
  }
}
