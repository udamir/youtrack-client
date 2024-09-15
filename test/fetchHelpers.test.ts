import { buildUri, createParamsMap, fields, stringParam, queryParams, customField } from "../src/utils"

describe("buildUri", () => {
  it("should build a URI with path parameters", () => {
    expect(buildUri("/api/items/:itemId", { itemId: "123" })).toBe("/api/items/123")
    expect(buildUri("/api/items/:itemId/:foo", { itemId: "123", foo: "bar" })).toBe("/api/items/123/bar")
  })

  it("should return base URI when no path parameters are provided", () => {
    const baseUri = "/api/items"
    expect(buildUri(baseUri)).toBe(baseUri)
  })
})

describe("createParamsMap", () => {
  it("should map keys to string values", () => {
    expect(createParamsMap(["param1", "param2"], [123, "value2"])).toEqual({
      param1: "123",
      param2: "value2",
    })
  })

  it("should return an empty object when no keys or values are provided", () => {
    const result = createParamsMap()
    expect(result).toEqual({})
  })
})

describe("fields", () => {
  it("should return an empty string when schema is empty", () => {
    const result = fields([])
    expect(result).toBe("")
  })

  it("should return the correct fields query parameter for a simple schema", () => {
    expect(fields(["name", "description"])).toBe("fields=name,description")
  })

  it("should handle nested fields in schema", () => {
    expect(fields([{ user: ["name", "email"] }])).toBe("fields=user(name,email)")
  })

  it("should handle complex nested schema", () => {
    expect(fields([{ user: [{ profile: ["firstName", "lastName"] }] }])).toBe("fields=user(profile(firstName,lastName))")
  })
})

describe("stringParam", () => {
  it("should return query parameter string for a given key and value", () => {
    const paramBuilder = stringParam("status")
    expect(paramBuilder("active")).toBe("status=active")
  })

  it("should return undefined when no value is provided", () => {
    const paramBuilder = stringParam("status")
    expect(paramBuilder()).toBe("")
  })
})

describe("queryParams", () => {
  it("should return an object with query parameter builders", () => {
    const params = queryParams("status", "category")
    const statusParam = params.status("active")
    const categoryParam = params.category("electronics")
    expect(statusParam).toBe("status=active")
    expect(categoryParam).toBe("category=electronics")
  })

  it("should return an empty string when no value is provided", () => {
    const params = queryParams("status")
    const result = params.status()
    expect(result).toBe("")
  })
})

describe("customField", () => {
  it("should return customField query parameter string for a given value", () => {
    const result = customField("customValue")
    expect(result).toBe("customField=customValue")
  })

  it("should handle array of values for customField", () => {
    const result = customField(["value1", "value2"])
    expect(result).toEqual(["customField=value1", "customField=value2"])
  })

  it("should return undefined when no value is provided for customField", () => {
    const result = customField()
    expect(result).toBe("")
  })
})
