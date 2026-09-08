import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const urlChecker = (url: string) => {
  // Trim whitespace to avoid unexpected failures
  const trimmedUrl = url.trim();
  if (!trimmedUrl) return false;

  // Check if it already starts with a protocol, if not, prepend 'https://'
  const hasProtocol = /^https?:\/\//i.test(trimmedUrl);
  const urlToParse = hasProtocol ? trimmedUrl : `https://${trimmedUrl}`;

  try {
    const parsedUrl = new URL(urlToParse);

    // Ensure it has a valid hostname (e.g., stops "https://" from being valid)
    return parsedUrl.hostname.includes(".");
  } catch {
    return false;
  }
};
