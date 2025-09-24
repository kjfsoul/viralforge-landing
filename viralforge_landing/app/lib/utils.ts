
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Summarize long text to a clean preview: up to N sentences, capped by characters
export function summarizeText(
  text: string | undefined,
  options?: { sentences?: number; maxChars?: number }
): string {
  const sentences = options?.sentences ?? 2;
  const maxChars = options?.maxChars ?? 140;
  if (!text) return "";
  const normalized = text.replace(/\s+/g, " ").trim();
  const parts = normalized
    .split(/(?<=[.!?])\s+/)
    .slice(0, sentences)
    .join(" ");
  if (parts.length <= maxChars) return parts;
  const cut = parts.slice(0, maxChars);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + "…";
}
