import { expectType } from "tsd"
import type { Schema } from "../../src"

// Testing Schema with simple primitive types
type SimpleObject = {
  id: number
  name: string
  active: boolean
}

expectType<Schema<SimpleObject>>(["id", "name", "active"] as const)

// Testing Schema with nested objects
type NestedObject = {
  id: number
  name: string
  address: {
    city: string
    country: string
  }
}
expectType<Schema<NestedObject>>(["id", "name", { address: ["city", "country"] }] as const)

// Testing Schema with arrays of objects
type ArrayObject = {
  id: number
  tags: { name: string }[]
}
expectType<Schema<ArrayObject>>(["id", { tags: ["name"] }] as const)

// Testing Schema with nullable fields
type NullableFields = {
  id: number
  description: string | null
  isActive: boolean | null
}
expectType<Schema<NullableFields>>(["id", "description", "isActive"] as const)

// Testing Schema with readonly fields
type ReadonlyObject = {
  readonly id: number
  readonly name: string
}
expectType<Schema<ReadonlyObject>>(["id", "name"])

// Testing Schema with union types
type UnionFields = {
  id: number
  status: "open" | "closed"
}
expectType<Schema<UnionFields>>(["id", "status"])

// Testing Schema with arrays of primitives
type ArrayOfPrimitives = {
  tags: string[]
  numbers: number[]
}
expectType<Schema<ArrayOfPrimitives>>(["tags", "numbers"])

// Testing Schema with undefined fields
type UndefinedFields = {
  id: number
  description?: string
}
expectType<Schema<UndefinedFields>>(["id", "description"])

// Testing deeply nested objects
type DeepNestedObject = {
  id: number
  person: {
    name: string
    address: {
      city: string
      zip: string
    }
  }
}
expectType<Schema<DeepNestedObject>>(["id", { person: ["name", { address: ["city", "zip"] }] }])

// Testing Schema with union of array objects and primitives
type MixedArray = {
  id: number
  items: (string | { name: string })[]
}
expectType<Schema<MixedArray>>(["id", { items: ["name"] }])
