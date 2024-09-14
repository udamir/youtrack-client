import type { QueryParamBuilder } from "../../temp/apiBuilder"
import type { Schema } from "../types"
import { isObject } from "./common"

// Function to build the URI with path parameters
export const buildUri = (baseUri: string, pathParams: Record<string, string> = {}): string =>
  Object.keys(pathParams).reduce(
    (uri, param) => uri.replace(`:${param}`, encodeURIComponent(pathParams[param])),
    baseUri,
  ) // Replace path parameters in the URI

export const createParamsMap = (keys: string[] = [], values: Array<string | number> = []) => {
  return keys.reduce(
    (res, key, index) => {
      res[key] = `${values[index]}`
      return res
    },
    {} as Record<string, string>,
  )
}

export const fields: QueryParamBuilder<Schema<any> | undefined> = (schema?) => {
  if (!schema) {
    return
  }
  const _fields = schema.map((field) =>
    isObject(field)
      ? Object.keys(field)
          .map((key) => `${key}(${fields(field[key])})`)
          .join(",")
      : encodeURIComponent(field),
  )
  return `fields=${_fields.join(",")}`
}

export const buildQueryParam = (key: string, value?: string | number | boolean | string[] | number[] | boolean[]) => {
  if (Array.isArray(value)) {
    return value.map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
  }
  return typeof value !== "undefined" ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}` : undefined
}

export const stringParam =
  (key: string): QueryParamBuilder<string | undefined> =>
  (value?) =>
    buildQueryParam(key, value)

export const queryParams = <TKey extends string, T extends string | number | boolean | string[] | number[] | boolean[]>(...keys: TKey[]): Record<TKey, QueryParamBuilder<T | undefined>> => {
  return keys.reduce(
    (params, key) => {
      params[key] = (value?) => buildQueryParam(key, value)
      return params
    },
    {} as Record<TKey, QueryParamBuilder<T | undefined>>,
  )
}
  
// export const numberParams = <T extends string>(...keys: T[]): Record<T, QueryParamBuilder<number | undefined>> => {
//   return queryParams(...keys)
// }

// export const stringParams = <T extends string>(...keys: T[]): Record<T, QueryParamBuilder<string | undefined>> => {
//   return queryParams(...keys)
// }

// export const booleanParams = <T extends string>(...keys: T[]): Record<T, QueryParamBuilder<boolean | undefined>> => {
//   return queryParams(...keys)
// }

// export const arrayParams = <T extends string>(...keys: T[]): Record<T, QueryParamBuilder<string[] | undefined>> => {
//   return queryParams(...keys)
// }

export const customField: QueryParamBuilder<string | string[] | undefined> = (value) =>
  buildQueryParam("customField", value)
