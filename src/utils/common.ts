export const isObject = (value: unknown): value is Record<string | number | symbol, unknown> => {
  return value !== null && typeof value === "object"
}

export const joinUrl = (_baseUrl: string, _url: string): string => {
  let baseUrl = _baseUrl
  let url = _url
  // Ensure baseUrl does not end with a '/'
  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.slice(0, -1)
  }

  // Ensure url does not start with a '/'
  if (url.startsWith("/")) {
    url = url.slice(1)
  }

  return `${baseUrl}/${url}`
}
