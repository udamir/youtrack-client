import type { FetchApi, FetchApiConfig, QueryParamBuilder } from "../types"
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
  private build(options?: FetchApiConfig): Parameters<FetchApi> {
    const query = this._args.join("&")
    const uri = query ? `${this.baseUrl}?${query}` : this.baseUrl
    return [uri, options]
  }

  public get() {
    return this.build()
  }

  public post<TBody extends object>(body: TBody) {
    return this.build({ method: "POST", body })
  }

  public postFile(body: FormData) {
    return this.build({ method: "POST", body, headers: { "Content-Type": "multipart/form-data" } })
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
