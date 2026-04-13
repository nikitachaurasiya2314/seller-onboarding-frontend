import { useState, useCallback } from "react";
import {
  getPasswordStrength,
  STRENGTH_LABELS,
  STRENGTH_COLORS,
} from "../utils/validation";
import type { PasswordStrength } from "../types";

interface UsePasswordStrengthReturn {
  strength: PasswordStrength;
  label: string;
  color: string;
  percentage: number;
  isStrong: boolean;
  update: (value: string) => void;
}

export function usePasswordStrength(): UsePasswordStrengthReturn {
  const [strength, setStrength] = useState<PasswordStrength>(0);

  const update = useCallback((value: string) => {
    setStrength(getPasswordStrength(value));
  }, []);

  return {
    strength,
    label: STRENGTH_LABELS[strength],
    color: STRENGTH_COLORS[strength],
    percentage: strength * 25,
    isStrong: strength >= 3,
    update,
  };
}
