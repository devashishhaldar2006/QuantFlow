import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export interface UploadFileInput {
  key: string;
  content: string | Buffer | Uint8Array;
  contentType?: string;
}

export class R2StorageService {
  private static s3Client: S3Client | null = null;
  private static bucketName: string = process.env.R2_BUCKET_NAME || "";

  private static getClient(): S3Client | null {
    if (this.s3Client) {
      return this.s3Client;
    }

    const endpoint =
      process.env.S3_ENDPOINT ||
      (process.env.R2_ACCOUNT_ID
        ? `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`
        : "");

    const accessKeyId =
      process.env.S3_ACCESS_KEY_ID || process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey =
      process.env.S3_SECRET_ACCESS_KEY || process.env.R2_SECRET_ACCESS_KEY;
    const region = process.env.S3_REGION || "us-east-1";

    if (!endpoint || !accessKeyId || !secretAccessKey || !this.bucketName) {
      return null;
    }

    this.s3Client = new S3Client({
      region,
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true, // Required for Supabase & MinIO S3 compatibility
    });

    return this.s3Client;
  }

  /**
   * Saves the file locally in backend/data/ so the C++ quant engine can read it directly.
   */
  private static async saveLocalCopy(
    key: string,
    content: string | Buffer | Uint8Array,
  ): Promise<string> {
    const cleanKey = key.replace(/^\/+/, "");
    // Backend data root: ../backend/data
    const backendDataDir = join(process.cwd(), "..", "backend", "data");
    const fullLocalPath = join(backendDataDir, cleanKey);
    const parentDir = join(fullLocalPath, "..");

    if (!existsSync(parentDir)) {
      await mkdir(parentDir, { recursive: true });
    }

    const buffer = Buffer.isBuffer(content)
      ? content
      : typeof content === "string"
      ? Buffer.from(content, "utf-8")
      : Buffer.from(content);

    await writeFile(fullLocalPath, buffer);

    // Return the engine-relative path: data/<cleanKey>
    return `data/${cleanKey}`;
  }

  /**
   * Uploads file to Cloudflare R2 bucket (if credentials provided) AND writes local copy for the C++ engine.
   * Returns relative path suitable for the C++ BacktestEngine (e.g. data/uploads/... or data/datasets/...).
   */
  static async uploadFile(input: UploadFileInput): Promise<string> {
    const client = this.getClient();
    const cleanKey = input.key.replace(/^\/+/, "");

    // 1. Upload to Cloudflare R2 if configured
    if (client && this.bucketName) {
      const buffer = Buffer.isBuffer(input.content)
        ? input.content
        : typeof input.content === "string"
        ? Buffer.from(input.content, "utf-8")
        : Buffer.from(input.content);

      try {
        await client.send(
          new PutObjectCommand({
            Bucket: this.bucketName,
            Key: cleanKey,
            Body: buffer,
            ContentType: input.contentType || "text/csv",
          }),
        );
      } catch (err) {
        console.warn("Cloudflare R2 upload warning (falling back to local):", err);
      }
    }

    // 2. Always persist a local copy for the C++ backend engine
    const enginePath = await this.saveLocalCopy(cleanKey, input.content);
    return enginePath;
  }

  /**
   * Fetch object from R2 (or null if not available)
   */
  static async getFile(key: string): Promise<Uint8Array | null> {
    const client = this.getClient();
    if (!client || !this.bucketName) return null;

    try {
      const response = await client.send(
        new GetObjectCommand({
          Bucket: this.bucketName,
          Key: key.replace(/^\/+/, ""),
        }),
      );

      if (!response.Body) return null;
      return await response.Body.transformToByteArray();
    } catch (err) {
      console.error(`Failed to get file ${key} from R2:`, err);
      return null;
    }
  }

  /**
   * Delete object from R2
   */
  static async deleteFile(key: string): Promise<boolean> {
    const client = this.getClient();
    if (!client || !this.bucketName) return false;

    try {
      await client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: key.replace(/^\/+/, ""),
        }),
      );
      return true;
    } catch (err) {
      console.error(`Failed to delete file ${key} from R2:`, err);
      return false;
    }
  }
}
