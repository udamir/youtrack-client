import { expectType } from "tsd"
import type { Schema } from "../../src"

// Test cases for Schema<T>

// Primitive fields
expectType<
  Schema<{
    id: number
    value: string
  }>
>(["id", "value"])

// Nested object fields
expectType<
  Schema<{
    name: string
    address: {
      city: string
      country: string
    }
  }>
>(["name", { address: ["city", "country"] }])

// Optional and nullable fields
expectType<
  Schema<{
    name?: string
    description: string | null
  }>
>(["name", "description"])

// Readonly fields
expectType<
  Schema<{
    readonly id: number
    readonly name: string
  }>
>(["id", "name"])

// Union types
expectType<
  Schema<{
    status: "active" | "inactive"
    value: string | number
  }>
>(["status", "value"])

// Arrays of objects
expectType<
  Schema<{
    items: {
      name: string
      price: number
    }[]
  }>
>([{ items: ["name", "price"] }])

// Empty object
expectType<Schema<{}>>([])

// Direct string schema
expectType<Schema<string>>("someField")

// Union of objects
expectType<
  Schema<{
    type: "admin" | "user"
    details:
      | {
          name: string
        }
      | {
          email: string
        }
  }>
>(["type", { details: ["name"] }] || ["type", { details: ["email"] }])

// Nullable, undefined, and optional fields
expectType<
  Schema<{
    id: number | null | undefined
    name?: string
    description: string | null
  }>
>(["id", "name", "description"])

// Nested optional and readonly fields
expectType<
  Schema<{
    readonly address?: {
      readonly city?: string
      readonly zip?: string | null
    }
  }>
>([{ address: ["city", "zip"] }])
