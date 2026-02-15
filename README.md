# 🚀 React + Next.js Base App - Arquitetura de API

Arquitetura profissional e moderna para consumo de APIs em Next.js/React com TypeScript, seguindo padrões de mercado.

## ⚡ Quick Start (5 minutos)

### 1. Verificar variáveis de ambiente

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:5023/api/v1
```

### 2. Iniciar API local (Terminal 1)

```bash
npm run dev-api
# Acesse: http://localhost:5023/api/v1/health
```

### 3. Iniciar Next.js (Terminal 2)

```bash
npm run dev
# Acesse: http://localhost:3000
```

### 4. Usar o componente

```tsx
// src/app/page.tsx
import { HealthCheckComponent } from "@/components";

export default function Home() {
  return (
    <main>
      <h1>Bem-vindo!</h1>
      <HealthCheckComponent />
    </main>
  );
}
```

Pronto! 🎉 O componente está funcionando e chamando sua API.

---

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Next.js App Router
├── components/             # Componentes React
│   └── HealthCheckComponent.tsx  (Pronto para usar!)
├── hooks/                  # Custom Hooks
│   └── useHealth.ts        (Hook para Health Check)
├── services/               # Lógica de negócio
│   └── healthService.ts    (Chama a API)
├── store/                  # Estado global (Zustand)
│   └── healthStore.ts      (Gerencia estado)
├── lib/
│   ├── api/
│   │   └── client.ts       (Cliente HTTP - Axios)
│   └── types/
│       └── health.ts       (TypeScript types)
└── config/
    └── env.ts              (Variáveis de ambiente)
```

---

## 🎯 Como Usar

### Opção 1: Componente Pronto (Recomendado)

```tsx
import { HealthCheckComponent } from "@/components";

<HealthCheckComponent />
```

### Opção 2: Custom Hook

```tsx
"use client";
import { useHealth } from "@/hooks";

const { health, isLoading, error, checkHealth } = useHealth(true);
```

### Opção 3: Service Direto

```tsx
import { healthService } from "@/services";

const health = await healthService.checkHealth();
```

---

## 🏗️ Arquitetura em Camadas

```
Componente React
    ↓
Custom Hook (useHealth)
    ↓
Zustand Store
    ↓
Service Layer
    ↓
API Client (Axios)
    ↓
API Externa (Backend)
```

**Benefícios:**
- ✅ Separação de responsabilidades
- ✅ Type-safe com TypeScript
- ✅ Fácil de testar
- ✅ Reutilizável
- ✅ Production-ready

---

## 🔌 Adicionar Novo Endpoint

Siga o padrão em 5 passos:

### 1. Type
```tsx
// src/lib/types/user.ts
export interface User {
  id: string;
  name: string;
}
```

### 2. Service
```tsx
// src/services/userService.ts
class UserService {
  async getUsers() {
    return apiClient.get("/users");
  }
}
export const userService = new UserService();
```

### 3. Store
```tsx
// src/store/userStore.ts
export const useUserStore = create((set) => ({
  users: null,
  getUsers: async () => {
    const response = await userService.getUsers();
    set({ users: response });
  },
}));
```

### 4. Hook
```tsx
// src/hooks/useUsers.ts
export function useUsers() {
  const { users, getUsers } = useUserStore();
  return { users, getUsers };
}
```

### 5. Usar no componente
```tsx
const { users, getUsers } = useUsers();
<button onClick={() => getUsers()}>Carregar</button>
```

---

## 🔍 Validar a Chamada da API

### Terminal
```bash
curl http://localhost:3000/api/v1/health
```

### Browser DevTools (F12)
- **Network tab**: Procure por "health" e veja o status 200
- **Console**: Veja logs `[API Request]` e `[API Response]`
- **Redux DevTools**: Veja o estado em tempo real

---

## 🐛 CORS em Desenvolvimento

Se receber erro CORS, habilite no seu backend .NET:

```csharp
// Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocal3000", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

app.UseCors("AllowLocal3000");
```

---

## 📚 Padrões Implementados

| Padrão | Implementação |
|--------|---------------|
| **Singleton** | apiClient |
| **Service Layer** | healthService |
| **Custom Hooks** | useHealth |
| **State Management** | Zustand |
| **Type Safety** | TypeScript |

---

## 🧪 Testando

### Exemplos de testes para cada camada:

- `API Client`: Mock axios
- `Service`: Mock API Client
- `Store`: Mock Service
- `Hook`: Mock Store
- `Component`: Mock Hook

Veja `TESTING.ts` para exemplos completos.

---

## 🔧 Configuração Avançada

### Autenticação
```tsx
// src/lib/api/client.ts
this.instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Tratamento Global de Erros
```tsx
this.instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

### Cache
```tsx
const CACHE_TIME = 5 * 60 * 1000;
// Implemente cache logic no hook
```

---

## 🚀 Deploy

### Build
```bash
npm run build
npm run start
```

### Variáveis de Ambiente
```bash
# .env.production
NEXT_PUBLIC_API_BASE_URL=https://api.production.com/api/v1
```

---

## 📦 Dependências Principais

- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Axios** - HTTP client
- **Zustand** - State management
- **Tailwind CSS** - Styling

---

## 📖 Referências

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Zustand](https://github.com/pmndrs/zustand)
- [Axios](https://axios-http.com)
- [TypeScript](https://www.typescriptlang.org)

---

## 📝 Licença

MIT
