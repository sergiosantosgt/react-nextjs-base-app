/**
 * Tipos relacionados ao endpoint de health check
 */

export interface HealthResponse {
  status: "healthy" | "unhealthy";
  time: string;
  environment: string;
}

export interface HealthError {
  message: string;
  code?: string;
}
