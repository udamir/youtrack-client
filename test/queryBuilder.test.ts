import { RequestBuilder, buildQueryParam } from "../src/utils"

describe("RequestBuilder test", () => {
  const baseUrl = "https://api.example.com/items"
  const builders = {
    search: (value?: string) => buildQueryParam("search", value),
    limit: (value?: number) => buildQueryParam("limit", value),
    category: (value?: string) => buildQueryParam("category", value),
  }

  it("should initialize without any parameters", () => {
    const rb = new RequestBuilder(baseUrl, builders)
    expect(rb.get()).toEqual({ url: baseUrl })
  })

  it("should build a query string with single parameters", () => {
    const params = { search: "test" }
    const rb = new RequestBuilder(baseUrl, builders, params)
    expect(rb.get()).toEqual({ url: `${baseUrl}?search=test` })
  })

  it("should build a query string with multiple parameters", () => {
    const params = { search: "test", limit: 10 }
    const rb = new RequestBuilder(baseUrl, builders, params)
    expect(rb.get()).toEqual({ url: `${baseUrl}?search=test&limit=10` })
  })

  it("should handle array query parameters", () => {
    const params = { category: ["electronics", "furniture"] }
    const customBuilder = {
      category: (value?: string | string[]) => buildQueryParam("category", value),
    }
    const rb = new RequestBuilder(baseUrl, customBuilder, params)
    expect(rb.get()).toEqual({ url: `${baseUrl}?category=electronics&category=furniture` })
  })

  it("should return POST request with JSON body", () => {
    const params = { search: "test", limit: 10 }
    const rb = new RequestBuilder(baseUrl, builders, params)
    const data = { name: "new item" }
    expect(rb.post(data)).toEqual({ url: `${baseUrl}?search=test&limit=10`, method: "POST", data })
  })

  it("should return POST request with FormData body", () => {
    const params = { search: "test" }
    const rb = new RequestBuilder(baseUrl, builders, params)
    const formData = new FormData()
    formData.append("file", new Blob(["file content"]), "file.txt")
    expect(rb.postFile(formData)).toEqual({
      url: `${baseUrl}?search=test`,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
  })

  it("should return DELETE request", () => {
    const params = { search: "test" }
    const rb = new RequestBuilder(baseUrl, builders, params)
    expect(rb.delete()).toEqual({ url: `${baseUrl}?search=test`, method: "DELETE" })
  })

  it("should return PUT request", () => {
    const params = { limit: 10 }
    const rb = new RequestBuilder(baseUrl, builders, params)
    expect(rb.put()).toEqual({ url: `${baseUrl}?limit=10`, method: "PUT" })
  })

  it("should return PATCH request", () => {
    const params = { search: "update" }
    const rb = new RequestBuilder(baseUrl, builders, params)
    expect(rb.patch()).toEqual({ url: `${baseUrl}?search=update`, method: "PATCH" })
  })
})
