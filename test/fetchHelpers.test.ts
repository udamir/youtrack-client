import { buildUri, createParamsMap, fields, stringParam, queryParams, customField, encodeBody } from "../src/utils"

describe('encodeBody', () => {
  it('should return FormData unchanged if provided', () => {
    const formData = new FormData();
    formData.append('key', 'value');
    
    expect(encodeBody(formData)).toBe(formData);
  });

  it('should return JSON string if object is provided', () => {
    const obj = { key: 'value' };
    
    expect(encodeBody(obj)).toBe(JSON.stringify(obj));
  });

  it('should return the original string if a string is provided', () => {
    const str = 'test';
    
    expect(encodeBody(str)).toBe(str);
  });

  it('should return undefined if undefined is provided', () => {
    expect(encodeBody(undefined)).toBeUndefined();
  });
});

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
    expect(createParamsMap()).toEqual({})
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
    expect(fields([{ user: [{ profile: ["firstName", "lastName"] }] }])).toBe(
      "fields=user(profile(firstName,lastName))",
    )
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
    expect(params.status("active")).toBe("status=active")
    expect(params.category("electronics")).toBe("category=electronics")
  })

  it("should return an empty string when no value is provided", () => {
    const params = queryParams("status")
    expect(params.status()).toBe("")
  })
})

describe("customField", () => {
  it("should return customField query parameter string for a given value", () => {
    expect(customField("customValue")).toBe("customField=customValue")
  })

  it("should handle array of values for customField", () => {
    expect(customField(["value1", "value2"])).toEqual(["customField=value1", "customField=value2"])
  })

  it("should return undefined when no value is provided for customField", () => {
    expect(customField()).toBe("")
  })
})
