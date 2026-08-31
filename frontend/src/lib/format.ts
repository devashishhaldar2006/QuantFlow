/**
 * Shared formatting utilities for the QuantFlow terminal.
 *
 * Every numeric display across the application should use
 * one of these functions so that formatting is consistent.
 */

const INR_FORMATTER = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const COMPACT_FORMATTER = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

/**
 * Format a number as Indian Rupee currency.
 * Example: 100000 → "₹1,00,000.00"
 */
export function formatCurrency(value: number): string {
  return `₹${INR_FORMATTER.format(value)}`;
}

/**
 * Format a large number in compact form.
 * Example: 100000 → "₹1L"
 */
export function formatCurrencyCompact(value: number): string {
  return `₹${COMPACT_FORMATTER.format(value)}`;
}

/**
 * Format a number with fixed decimal places.
 * Example: 2.1234 → "2.12"
 */
export function formatNumber(
  value: number,
  decimals: number = 2,
): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number(value.toFixed(decimals)));
}

/**
 * Format as a percentage.
 * Example: 24.68 → "24.68%"
 */
export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

/**
 * Format as a signed percentage (with + prefix for positive).
 * Example: 24.68 → "+24.68%"
 */
export function formatSignedPercent(value: number): string {
  const prefix = value >= 0 ? "+" : "";
  return `${prefix}${value.toFixed(2)}%`;
}

/**
 * Format a date string for display in the terminal.
 * Example: "2024-01-15T10:30:00Z" → "15 Jan 2024, 10:30"
 */
export function formatDate(value: string): string {
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format a date string for compact display.
 * Example: "2024-01-15T10:30:00Z" → "15 Jan 2024"
 */
export function formatDateCompact(value: string): string {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Display profit factor with infinity handling.
 *
 * The C++ engine returns -1.0 as a sentinel for infinite
 * profit factor (all wins, no losses).
 */
export function formatProfitFactor(value: number): string {
  if (value === -1) return "∞";
  return formatNumber(value);
}

/**
 * Determine if a numeric value represents a positive result.
 */
export function isPositive(value: number): boolean {
  return value > 0;
}

/**
 * Determine if a numeric value represents a negative result.
 */
export function isNegative(value: number): boolean {
  return value < 0;
}
