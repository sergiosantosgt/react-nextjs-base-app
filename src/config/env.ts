/**
 * Configuração de variáveis de ambiente
 * Centraliza o acesso às variáveis de ambiente da aplicação
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5023/api/v1";

export const NODE_ENV = process.env.NODE_ENV || "development";

export const IS_PRODUCTION = NODE_ENV === "production";
export const IS_DEVELOPMENT = NODE_ENV === "development";
