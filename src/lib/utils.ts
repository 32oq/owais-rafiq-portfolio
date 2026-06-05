import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Prepend basePath to /public asset paths — required for GitHub Pages subpath deployment */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}

/**
 * Returns whole years elapsed since a "YYYY-MM" date string.
 * Safe to call during SSR — pass `now` explicitly for hydration consistency.
 */
export function getYearsFrom(dateStr: string, now?: Date): number {
  const ref = now ?? new Date();
  const [year, month] = dateStr.split("-").map(Number);
  const totalMonths =
    (ref.getFullYear() - year) * 12 + (ref.getMonth() + 1 - month);
  return Math.floor(totalMonths / 12);
}

export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}

export function formatDateShort(dateString: string): string {
  return formatDate(dateString, { year: "numeric", month: "short" });
}

export function getReadingTimeLabel(minutes: number): string {
  return `${minutes} min read`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.slice(0, length).trim()}…`;
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatYearsOfExperience(years: number): string {
  if (years < 1) return "< 1 year";
  if (years === 1) return "1 year";
  return `${years}+ years`;
}

export function getProficiencyPercent(level: string): number {
  const map: Record<string, number> = {
    beginner: 25,
    intermediate: 50,
    advanced: 75,
    expert: 95,
  };
  return map[level] ?? 50;
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    live: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20",
    "in-progress": "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20",
    archived: "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20",
    private: "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20",
  };
  return map[status] ?? map["live"];
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    live: "Live",
    "in-progress": "In Progress",
    archived: "Archived",
    private: "Private",
  };
  return map[status] ?? status;
}

export function getDateRange(startDate: string, endDate: string | null, current: boolean): string {
  const start = formatDateShort(startDate);
  if (current) return `${start} — Present`;
  if (!endDate) return start;
  return `${start} — ${formatDateShort(endDate)}`;
}

export function calculateDuration(startDate: string, endDate: string | null, referenceDate?: Date): string {
  const start = new Date(startDate);
  // Use provided reference date to keep server/client deterministic for current jobs
  const end = endDate ? new Date(endDate) : (referenceDate ?? new Date());

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (months < 1) return "< 1 month";
  if (months < 12) return `${months} month${months > 1 ? "s" : ""}`;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) return `${years} year${years > 1 ? "s" : ""}`;
  return `${years} yr ${remainingMonths} mo`;
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}

export function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:");
}

export function getLinkProps(url: string) {
  const isExternal = isExternalUrl(url);
  return isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}
