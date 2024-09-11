export const isObject = (value: unknown): value is Record<string | number | symbol, unknown> => {
  return value !== null && typeof value === "object"
}
