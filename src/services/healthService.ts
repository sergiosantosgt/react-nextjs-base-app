/**
 * Health Service
 * Centraliza a lógica de comunicação com o endpoint de health check
 */

import { apiClient } from "@/lib/api/client";
import { HealthResponse } from "@/lib/types/health";

class HealthService {
  private readonly endpoint = "/health";

  /**
   * Verifica a saúde da API
   * @returns HealthResponse com status, hora e ambiente
   */
  async checkHealth(): Promise<HealthResponse> {
    return apiClient.get<HealthResponse>(this.endpoint);
  }
}

// Singleton instance
export const healthService = new HealthService();
