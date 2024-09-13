export type FetchApiConfig = {
  method?: "POST" | "GET" | "PATCH" | "PUT" | "DELETE"
  headers?: Record<string, string>
  body?: string
  [key: string]: unknown
}

export type FetchApi = <T>(url: string, config?: FetchApiConfig) => Promise<T>
