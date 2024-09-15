import { isObject, joinUrl } from "../src/utils"

describe("isObject", () => {
  it("should check if value is object correctly", () => {
    expect(isObject({ key: "value" })).toBe(true)
    expect(isObject([1, 2, 3])).toBe(true)
    expect(isObject(null)).toBe(false)
    expect(isObject("string")).toBe(false)
    expect(isObject(42)).toBe(false)
    expect(isObject(true)).toBe(false)
    expect(isObject(() => {})).toBe(false)
    expect(isObject({ [Symbol("key")]: "value" })).toBe(true)
  })
})

describe("joinUrl", () => {
  it("should join base URL and URL correctly", () => {
    expect(joinUrl("https://example.com", "path/to/resource")).toBe("https://example.com/path/to/resource")
    expect(joinUrl("https://example.com/", "path/to/resource")).toBe("https://example.com/path/to/resource")
    expect(joinUrl("https://example.com", "/path/to/resource")).toBe("https://example.com/path/to/resource")
    expect(joinUrl("https://example.com/", "/path/to/resource")).toBe("https://example.com/path/to/resource")
    expect(joinUrl("https://example.com", "/resource")).toBe("https://example.com/resource")
    expect(joinUrl("https://example.com/", "resource")).toBe("https://example.com/resource")
  })
})
