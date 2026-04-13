import { useState, useEffect, useRef } from "react";

interface UseUsernameCheckReturn {
  isAvailable: boolean | null; // null = not yet checked
  isChecking: boolean;
}

// Debounced username availability check (simulated — replace with real API call)
export function useUsernameCheck(username: string): UseUsernameCheckReturn {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (username.length < 3) {
      setIsAvailable(null);
      setIsChecking(false);
      return;
    }

    setIsChecking(true);
    setIsAvailable(null);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      // Replace with: const res = await fetch(`/api/check-username?u=${username}`)
      const taken = ["admin", "seller", "support", "help"].includes(
        username.toLowerCase()
      );
      setIsAvailable(!taken);
      setIsChecking(false);
    }, 800);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [username]);

  return { isAvailable, isChecking };
}
