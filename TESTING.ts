/**
 * Exemplo de Testes Unitários
 * Demonstra como testar os diferentes layers da arquitetura
 */

// ============================================
// TESTE DO API CLIENT
// ============================================

/*
// __tests__/lib/api/client.test.ts

import { apiClient } from "@/lib/api/client";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("ApiClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should make a GET request", async () => {
    const mockData = { status: "healthy" };
    mockedAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockData }),
    } as any);

    const response = await apiClient.get("/health");
    expect(response).toEqual(mockData);
  });

  it("should handle errors", async () => {
    const error = new Error("Network error");
    mockedAxios.create.mockReturnValue({
      get: jest.fn().mockRejectedValue(error),
    } as any);

    await expect(apiClient.get("/health")).rejects.toThrow("Network error");
  });
});
*/

// ============================================
// TESTE DO SERVICE
// ============================================

/*
// __tests__/services/healthService.test.ts

import { healthService } from "@/services/healthService";
import { apiClient } from "@/lib/api/client";

jest.mock("@/lib/api/client");

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe("HealthService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should check health successfully", async () => {
    const mockResponse = {
      status: "healthy" as const,
      time: "2025-12-07T21:17:16.321203Z",
      environment: "Development",
    };

    mockedApiClient.get.mockResolvedValue(mockResponse);

    const result = await healthService.checkHealth();

    expect(result).toEqual(mockResponse);
    expect(mockedApiClient.get).toHaveBeenCalledWith("/health");
  });

  it("should throw error when API fails", async () => {
    const error = new Error("API Error");
    mockedApiClient.get.mockRejectedValue(error);

    await expect(healthService.checkHealth()).rejects.toThrow("API Error");
  });
});
*/

// ============================================
// TESTE DO STORE (ZUSTAND)
// ============================================

/*
// __tests__/store/healthStore.test.ts

import { renderHook, act } from "@testing-library/react";
import { useHealthStore } from "@/store/healthStore";
import { healthService } from "@/services/healthService";

jest.mock("@/services/healthService");

const mockedHealthService = healthService as jest.Mocked<typeof healthService>;

describe("HealthStore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useHealthStore.setState({
      health: null,
      isLoading: false,
      error: null,
    });
  });

  it("should initialize with empty state", () => {
    const { result } = renderHook(() => useHealthStore());

    expect(result.current.health).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should check health successfully", async () => {
    const mockHealth = {
      status: "healthy" as const,
      time: "2025-12-07T21:17:16.321203Z",
      environment: "Development",
    };

    mockedHealthService.checkHealth.mockResolvedValue(mockHealth);

    const { result } = renderHook(() => useHealthStore());

    await act(async () => {
      await result.current.checkHealth();
    });

    expect(result.current.health).toEqual(mockHealth);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle errors during health check", async () => {
    const error = new Error("API Error");
    mockedHealthService.checkHealth.mockRejectedValue(error);

    const { result } = renderHook(() => useHealthStore());

    await act(async () => {
      await result.current.checkHealth();
    });

    expect(result.current.health).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toEqual(error);
  });

  it("should reset state", () => {
    useHealthStore.setState({
      health: {
        status: "healthy",
        time: "2025-12-07T21:17:16.321203Z",
        environment: "Development",
      },
      isLoading: true,
      error: new Error("Test error"),
    });

    const { result } = renderHook(() => useHealthStore());

    act(() => {
      result.current.reset();
    });

    expect(result.current.health).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
*/

// ============================================
// TESTE DO HOOK CUSTOMIZADO
// ============================================

/*
// __tests__/hooks/useHealth.test.ts

import { renderHook, act, waitFor } from "@testing-library/react";
import { useHealth } from "@/hooks/useHealth";
import { useHealthStore } from "@/store/healthStore";

jest.mock("@/store/healthStore");

const mockedUseHealthStore = useHealthStore as jest.MockedFunction<
  typeof useHealthStore
>;

describe("useHealth Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return health data", async () => {
    const mockData = {
      health: {
        status: "healthy" as const,
        time: "2025-12-07T21:17:16.321203Z",
        environment: "Development",
      },
      isLoading: false,
      error: null,
      checkHealth: jest.fn(),
      reset: jest.fn(),
    };

    mockedUseHealthStore.mockReturnValue(mockData as any);

    const { result } = renderHook(() => useHealth(false));

    expect(result.current.health).toEqual(mockData.health);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should auto-check on mount if enabled", async () => {
    const checkHealthMock = jest.fn();

    mockedUseHealthStore.mockReturnValue({
      health: null,
      isLoading: false,
      error: null,
      checkHealth: checkHealthMock,
      reset: jest.fn(),
    } as any);

    renderHook(() => useHealth(true));

    await waitFor(() => {
      expect(checkHealthMock).toHaveBeenCalled();
    });
  });

  it("should not auto-check if disabled", async () => {
    const checkHealthMock = jest.fn();

    mockedUseHealthStore.mockReturnValue({
      health: null,
      isLoading: false,
      error: null,
      checkHealth: checkHealthMock,
      reset: jest.fn(),
    } as any);

    renderHook(() => useHealth(false));

    await waitFor(() => {
      expect(checkHealthMock).not.toHaveBeenCalled();
    });
  });
});
*/

// ============================================
// TESTE DO COMPONENTE
// ============================================

/*
// __tests__/components/HealthCheckComponent.test.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { HealthCheckComponent } from "@/components/HealthCheckComponent";
import { useHealth } from "@/hooks/useHealth";

jest.mock("@/hooks/useHealth");

const mockedUseHealth = useHealth as jest.MockedFunction<typeof useHealth>;

describe("HealthCheckComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state", () => {
    mockedUseHealth.mockReturnValue({
      health: null,
      isLoading: true,
      error: null,
      checkHealth: jest.fn(),
      reset: jest.fn(),
    });

    render(<HealthCheckComponent />);
    expect(screen.getByText(/Verificando saúde/i)).toBeInTheDocument();
  });

  it("should render error state", () => {
    const error = new Error("API Error");
    mockedUseHealth.mockReturnValue({
      health: null,
      isLoading: false,
      error,
      checkHealth: jest.fn(),
      reset: jest.fn(),
    });

    render(<HealthCheckComponent />);
    expect(screen.getByText(/Erro.*API Error/i)).toBeInTheDocument();
  });

  it("should render health data", () => {
    const mockHealth = {
      status: "healthy" as const,
      time: "2025-12-07T21:17:16.321203Z",
      environment: "Development",
    };

    mockedUseHealth.mockReturnValue({
      health: mockHealth,
      isLoading: false,
      error: null,
      checkHealth: jest.fn(),
      reset: jest.fn(),
    });

    render(<HealthCheckComponent />);
    expect(screen.getByText(/healthy/i)).toBeInTheDocument();
    expect(screen.getByText(/Development/i)).toBeInTheDocument();
  });

  it("should call checkHealth when button is clicked", () => {
    const checkHealthMock = jest.fn();
    const mockHealth = {
      status: "healthy" as const,
      time: "2025-12-07T21:17:16.321203Z",
      environment: "Development",
    };

    mockedUseHealth.mockReturnValue({
      health: mockHealth,
      isLoading: false,
      error: null,
      checkHealth: checkHealthMock,
      reset: jest.fn(),
    });

    render(<HealthCheckComponent />);
    const button = screen.getByRole("button", { name: /Verificar Novamente/i });

    fireEvent.click(button);
    expect(checkHealthMock).toHaveBeenCalled();
  });
});
*/

export {};
