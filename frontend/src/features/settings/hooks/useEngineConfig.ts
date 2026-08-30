"use client";

import { useState, useEffect } from "react";
import { EngineConfig, DEFAULT_CONFIG } from "../types";
import { engineConfigSchema } from "../schema";

export function useEngineConfig() {
  const [config, setConfig] = useState<EngineConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [saveMsg, setSaveMsg] = useState("");
  const [engineUrl, setEngineUrl] = useState("http://localhost:8080");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/settings/engine-config");
        if (res.ok) {
          const data = (await res.json()) as Partial<EngineConfig>;
          setConfig((prev) => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.warn("Could not load engine config from server, using defaults", err);
      } finally {
        setLoading(false);
      }
    }

    const storedUrl = localStorage.getItem("quantflow_engine_url");
    if (storedUrl) setEngineUrl(storedUrl);

    load();
  }, []);

  const update = <K extends keyof EngineConfig>(key: K, value: EngineConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setSaveStatus("idle");
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");

    const result = engineConfigSchema.safeParse(config);
    if (!result.success) {
      setSaveStatus("error");
      setSaveMsg(result.error.issues[0].message);
      setSaving(false);
      return;
    }

    try {
      localStorage.setItem("quantflow_engine_url", engineUrl);

      const res = await fetch("/api/settings/engine-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Failed to save configuration");
      }

      setSaveStatus("success");
      setSaveMsg("Settings saved successfully.");
    } catch (err) {
      setSaveStatus("error");
      setSaveMsg(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveStatus("idle"), 4000);
    }
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    setSaveStatus("idle");
  };

  return {
    config,
    update,
    loading,
    saving,
    saveStatus,
    saveMsg,
    engineUrl,
    setEngineUrl,
    handleSave,
    handleReset,
  };
}
