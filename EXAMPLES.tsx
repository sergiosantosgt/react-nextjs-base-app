/*
 * EXEMPLOS DE USO
 * Diferentes formas de consumir a API de Health Check
 * 
 * Copie e adapte os exemplos abaixo conforme necessário
 */

/*
// ============================================
// EXEMPLO 1: Componente com Hook (Recomendado)
// ============================================

"use client";

import { useHealth } from "@/hooks/useHealth";

export function ExampleBasicUsage() {
  // Auto-check na montagem do componente
  const { health, isLoading, error, checkHealth } = useHealth(true);

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      <h1>Status da API: {health?.status}</h1>
      <p>Ambiente: {health?.environment}</p>
      <button onClick={() => checkHealth()}>Atualizar</button>
    </div>
  );
}

// ============================================
// EXEMPLO 2: Acesso Direto ao Store
// ============================================

"use client";

import { useHealthStore } from "@/store/healthStore";
import { useEffect } from "react";

export function ExampleDirectStore() {
  const health = useHealthStore((state) => state.health);
  const checkHealth = useHealthStore((state) => state.checkHealth);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  return <div>Status: {health?.status}</div>;
}

// ============================================
// EXEMPLO 3: Service Direto (Server-side)
// ============================================

import { healthService } from "@/services/healthService";

export async function getHealthStatus() {
  try {
    const health = await healthService.checkHealth();
    return { success: true, data: health };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

// ============================================
// EXEMPLO 4: API Client Direto
// ============================================

import { apiClient } from "@/lib/api/client";
import { HealthResponse } from "@/lib/types/health";

export async function checkHealthDirect() {
  const response = await apiClient.get<HealthResponse>("/health");
  console.log("API is healthy:", response.status === "healthy");
}

// ============================================
// EXEMPLO 5: Componente com Efeito Manual
// ============================================

"use client";

import { useHealth } from "@/hooks/useHealth";

export function ExampleManualCheck() {
  // Sem auto-check (autoCheck = false)
  const { health, isLoading, checkHealth } = useHealth(false);

  return (
    <div>
      <button onClick={() => checkHealth()}>
        {isLoading ? "Verificando..." : "Verificar Saúde"}
      </button>

      {health && (
        <div>
          <p>
            Status: <strong>{health.status}</strong>
          </p>
          <p>Ambiente: {health.environment}</p>
          <p>Hora: {new Date(health.time).toLocaleString("pt-BR")}</p>
        </div>
      )}
    </div>
  );
}

// ============================================
// EXEMPLO 6: Hook com Polling (Verificação Periódica)
// ============================================

"use client";

import { useHealth } from "@/hooks/useHealth";
import { useEffect } from "react";

export function ExampleWithPolling() {
  const { health, checkHealth } = useHealth(true);

  useEffect(() => {
    // Verificar a cada 30 segundos
    const interval = setInterval(() => {
      checkHealth();
    }, 30000);

    return () => clearInterval(interval);
  }, [checkHealth]);

  return (
    <div>
      Última verificação: {health?.time && new Date(health.time).toLocaleTimeString("pt-BR")}
    </div>
  );
}

// ============================================
// EXEMPLO 7: Componente com Retry Logic
// ============================================

"use client";

import { useHealth } from "@/hooks/useHealth";
import { useEffect, useState } from "react";

export function ExampleWithRetry() {
  const { health, error, isLoading, checkHealth } = useHealth(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      checkHealth();
    }, 1000);

    return () => clearTimeout(timer);
  }, [retryCount, checkHealth]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  if (isLoading) return <p>Verificando...</p>;
  if (error && retryCount < 3) {
    return (
      <div>
        <p>Erro ao verificar. Tentativa {retryCount + 1}/3</p>
        <button onClick={handleRetry}>Tentar Novamente</button>
      </div>
    );
  }
  if (error) {
    return <p>Falha permanente após 3 tentativas</p>;
  }

  return <p>Status: {health?.status}</p>;
}

// ============================================
// EXEMPLO 8: Uso em Middleware/Layout
// ============================================

import { ReactNode } from "react";
import { HealthCheckComponent } from "@/components/HealthCheckComponent";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <div>{children}</div>
        <footer className="p-4 border-t">
          <HealthCheckComponent />
        </footer>
      </body>
    </html>
  );
}

// ============================================
// EXEMPLO 9: Context API com Health Status
// ============================================

"use client";

import { createContext, useContext, ReactNode } from "react";
import { useHealth } from "@/hooks/useHealth";
import { HealthResponse } from "@/lib/types/health";

interface HealthContextType {
  health: HealthResponse | null;
  isHealthy: boolean;
  isLoading: boolean;
}

const HealthContext = createContext<HealthContextType>({
  health: null,
  isHealthy: false,
  isLoading: false,
});

export function HealthProvider({ children }: { children: ReactNode }) {
  const { health, isLoading } = useHealth(true);

  return (
    <HealthContext.Provider
      value={{
        health,
        isHealthy: health?.status === "healthy" ?? false,
        isLoading,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
}

export function useHealthContext() {
  return useContext(HealthContext);
}

export function MyComponent() {
  const { isHealthy } = useHealthContext();
  return <div>{isHealthy ? "API OK" : "API Indisponível"}</div>;
}

// ============================================
// EXEMPLO 10: API Route Handler (Next.js 13+)
// ============================================

// src/app/api/health/route.ts
import { healthService } from "@/services/healthService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const health = await healthService.checkHealth();
    return NextResponse.json(health);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch health" },
      { status: 500 }
    );
  }
}
*/
