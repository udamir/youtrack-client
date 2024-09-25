export type HttpMethod = "GET" | "DELETE" | "HEAD" | "OPTIONS" | "POST" | "PUT" | "PATCH" | "PURGE" | "LINK" | "UNLINK"

// Fetch compatible config
export type FetchConfig = {
  url: string
  method?: HttpMethod
  headers?: Record<string, string>
  data?: object | FormData
  [key: string]: unknown
}

export type FetchFunc = <T>(config: FetchConfig) => Promise<T>
