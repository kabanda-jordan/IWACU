import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a price in Rwandan Francs */
export function formatPrice(price: number): string {
  if (price >= 1_000_000_000) {
    return `RWF ${(price / 1_000_000_000).toFixed(1)}B`;
  }
  if (price >= 1_000_000) {
    return `RWF ${(price / 1_000_000).toFixed(0)}M`;
  }
  if (price >= 1_000) {
    return `RWF ${(price / 1_000).toFixed(0)}K`;
  }
  return `RWF ${price.toLocaleString()}`;
}

/** Shorten a large number with suffix (1200 → "1.2K") */
export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

/** Format a date string */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-RW", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Truncate text to a max length */
export function truncate(text: string, max = 120): string {
  return text.length > max ? text.slice(0, max) + "…" : text;
}

/** Generate star rating array */
export function generateStars(rating: number): boolean[] {
  return Array.from({ length: 5 }, (_, i) => i < Math.floor(rating));
}

/** Slugify a string */
export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}
