import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a timestamp to a human-readable relative time
 * @param timestamp ISO timestamp string
 * @returns Formatted string like "2 days ago", "Just now", etc.
 */
export function formatTimestamp(timestamp: string): string {
  if (!timestamp) return "Unknown date";

  try {
    const date = new Date(timestamp);

    // Calculate time difference in milliseconds
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();

    // Convert to days
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Format based on how long ago it was
    if (diffDays === 0) {
      // Today
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return diffMinutes <= 1 ? "Just now" : `${diffMinutes} minutes ago`;
      }
      return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else {
      // For older dates, show the actual date
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
}

/**
 * Ensures a URL has a protocol prefix (http:// or https://)
 * @param url URL string to check
 * @returns URL with protocol prefix added if needed
 */
export function ensureHttpPrefix(url: string): string {
  if (!url) return "#";

  // Check if URL already starts with http:// or https://
  if (url.match(/^https?:\/\//)) {
    return url;
  }

  // Add https:// prefix
  return `https://${url}`;
}
