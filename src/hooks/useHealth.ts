/**
 * Custom Hook - useHealth
 * Hook para consumir o estado e ações do health check
 * Simplifica o acesso ao store no componentes
 */

import { useCallback, useEffect } from "react";
import { useHealthStore } from "@/store/healthStore";
import { HealthResponse } from "@/lib/types/health";

interface UseHealthReturn {
  health: HealthResponse | null;
  isLoading: boolean;
  error: Error | null;
  checkHealth: () => Promise<void>;
  reset: () => void;
}

export function useHealth(autoCheck: boolean = false): UseHealthReturn {
  const { health, isLoading, error, checkHealth, reset } = useHealthStore();

  const check = useCallback(async () => {
    await checkHealth();
  }, [checkHealth]);

  // Auto-check na montagem se solicitado
  useEffect(() => {
    if (autoCheck) {
      check();
    }
  }, [autoCheck, check]);

  return {
    health,
    isLoading,
    error,
    checkHealth: check,
    reset,
  };
}
