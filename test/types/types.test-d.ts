import type { Schema, FilterFields, Entity } from "../../src"
import { expectType } from "tsd"

// Sample types for testing
type Person = {
  name: string
  age: number
  address: {
    city: string
    country: string
    details: {
      zip: string
      street: string
    }
  }
}

type PersonSchema = Schema<Person>

// Test Schema
expectType<PersonSchema>(
  "name,age,address(city,country(zip,street))" ||
    (["name", "age", { address: ["city", "country", { details: ["zip", "street"] }] }] as const),
)

// Test FilterFields for flat and nested fields
type FilteredPerson = FilterFields<Person, ["name", { address: ["city", { details: ["zip"] }] }]>
expectType<FilteredPerson>({
  name: "John",
  address: {
    city: "New York",
    details: {
      zip: "10001",
    },
  },
})

// Test Entity without schema (undefined)
type FullPerson = Entity<Person, undefined>
expectType<FullPerson>(["$type", "id"] as const)

// Test Entity with schema
type PartialPerson = Entity<Person, ["name", { address: ["city"] }]>
expectType<PartialPerson>({
  name: "John",
  address: {
    city: "New York",
  },
})
