/**
 * Health Store
 * Gerencia o estado do health check com Zustand
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { HealthResponse } from "@/lib/types/health";
import { healthService } from "@/services/healthService";

interface HealthStore {
  // State
  health: HealthResponse | null;
  isLoading: boolean;
  error: Error | null;

  // Actions
  checkHealth: () => Promise<void>;
  reset: () => void;
}

export const useHealthStore = create<HealthStore>()(
  devtools(
    (set) => ({
      // Initial state
      health: null,
      isLoading: false,
      error: null,

      // Actions
      checkHealth: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await healthService.checkHealth();
          set({ health: response, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error : new Error("Unknown error"),
            isLoading: false,
          });
        }
      },

      reset: () => {
        set({ health: null, isLoading: false, error: null });
      },
    }),
    { name: "HealthStore" }
  )
);
