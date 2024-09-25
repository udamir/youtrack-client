import type { FetchConfig, QueryParamBuilder } from "../types"
import { buildQueryParam } from "./fetchHelpers"

export type Builders<T extends Record<string, any>> = {
  [K in keyof T]-?: QueryParamBuilder<T[K]> | "string" | "number" | "boolean"
}

export class RequestBuilder<T extends Record<string, any>> {
  private _args: string[] = []

  constructor(
    private baseUrl: string,
    builders: Builders<T>,
    params: T = {} as T,
  ) {
    Object.keys(params).forEach((key) => {
      // Dynamically create setters for each key
      if (key in builders) {
        const value = builders[key]
        const arg = typeof value !== "function" ? buildQueryParam(key, params[key]) : value(params[key])
        if (arg) {
          this._args.push(...(Array.isArray(arg) ? arg : [arg]))
        }
      }
    })
  }

  // Method to build the query string
  private build(options?: Omit<FetchConfig, "url">): FetchConfig {
    const query = this._args.join("&")
    return {
      ...options,
      url: query ? `${this.baseUrl}?${query}` : this.baseUrl,
    }
  }

  public get() {
    return this.build()
  }

  public post<TBody extends object>(data: TBody) {
    return this.build({ method: "POST", data })
  }

  public postFile(data: FormData) {
    return this.build({ method: "POST", data, headers: { "Content-Type": "multipart/form-data" } })
  }

  public delete() {
    return this.build({ method: "DELETE" })
  }

  public put() {
    return this.build({ method: "PUT" })
  }

  public patch() {
    return this.build({ method: "PATCH" })
  }
}
