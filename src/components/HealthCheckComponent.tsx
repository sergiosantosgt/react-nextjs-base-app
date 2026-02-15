/**
 * Componente de Exemplo - HealthCheck
 * Demonstra como usar o custom hook useHealth
 */

"use client";

import { useHealth } from "@/hooks/useHealth";

export function HealthCheckComponent() {
  const { health, isLoading, error, checkHealth } = useHealth(true);

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Health Check
      </h2>

      {isLoading && (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-50" />
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Verificando saúde da API...
          </span>
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-3 dark:bg-red-950">
          <p className="text-sm text-red-700 dark:text-red-200">
            <strong>Erro:</strong> {error.message}
          </p>
        </div>
      )}

      {health && !isLoading && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Status: <span className="text-green-600 dark:text-green-400">{health.status}</span>
            </span>
          </div>

          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              <strong>Hora:</strong> {new Date(health.time).toLocaleString("pt-BR")}
            </p>
            <p>
              <strong>Ambiente:</strong> {health.environment}
            </p>
          </div>

          <button
            onClick={() => checkHealth()}
            disabled={isLoading}
            className="mt-4 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Verificar Novamente
          </button>
        </div>
      )}
    </div>
  );
}
