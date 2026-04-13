import type { PasswordStrength } from "../types";

// GSTIN: 2 digits + 5 letters + 4 digits + 1 letter + 1 alphanum + Z + 1 alphanum
export function isValidGSTIN(value: string): boolean {
  return /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1}$/.test(
    value.toUpperCase()
  );
}

// EID: 15–20 alphanumeric characters
export function isValidEID(value: string): boolean {
  const v = value.toUpperCase();
  return v.length >= 15 && v.length <= 20 && /^[A-Z0-9]+$/.test(v);
}

// Indian mobile: starts with 6-9, exactly 10 digits
export function isValidPhone(value: string): boolean {
  return /^[6-9]\d{9}$/.test(value);
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function getPasswordStrength(password: string): PasswordStrength {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score as PasswordStrength;
}

export const STRENGTH_LABELS: Record<PasswordStrength, string> = {
  0: "Too short",
  1: "Weak",
  2: "Fair",
  3: "Strong",
  4: "Very strong",
};

export const STRENGTH_COLORS: Record<PasswordStrength, string> = {
  0: "#E24B4A",
  1: "#EF9F27",
  2: "#EF9F27",
  3: "#1D9E75",
  4: "#0F6E56",
};
