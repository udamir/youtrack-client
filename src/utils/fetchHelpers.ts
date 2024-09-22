import type { FieldsSchema, QueryParamBuilder, Schema } from "../types"
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

const fieldsBuilder = (schema: FieldsSchema = []): string => {
  const _fields = schema.map((field) =>
    isObject(field)
      ? Object.keys(field)
          .map((key) => `${key}(${fieldsBuilder(field[key])})`)
          .join(",")
      : encodeURIComponent(field),
  )
  return _fields.length ? _fields.join(",") : ""
}

export const fields: QueryParamBuilder<Schema<any> | undefined> = (schema = []) => {
  const _fields = typeof schema === "string" ? schema : fieldsBuilder(schema)
  return _fields ? `fields=${_fields}` : ""
}

export const buildQueryParam = (key: string, value?: string | number | boolean | string[] | number[] | boolean[]) => {
  if (Array.isArray(value)) {
    return value.map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
  }
  return typeof value !== "undefined" ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}` : ""
}

export const stringParam =
  (key: string): QueryParamBuilder<string | undefined> =>
  (value?) =>
    buildQueryParam(key, value)

export const queryParams = <TKey extends string, T extends string | number | boolean | string[] | number[] | boolean[]>(
  ...keys: TKey[]
): Record<TKey, QueryParamBuilder<T | undefined>> => {
  return keys.reduce(
    (params, key) => {
      params[key] = (value?) => buildQueryParam(key, value)
      return params
    },
    {} as Record<TKey, QueryParamBuilder<T | undefined>>,
  )
}

export const customField: QueryParamBuilder<string | string[] | undefined> = (value) =>
  buildQueryParam("customField", value)
