import type { FieldsSchema, ParseSchema } from "./fields"
import type { EntityBase } from "./entities"

/**
 * Schema<T> takes an object type T and produces a schema for its fields.
 * It supports:
 * - Flat fields (primitive types), returning their keys as strings.
 * - Nested fields (objects), recursively applying Schema to nested objects.
 * - Arrays of objects, recursively applying Schema to the elements of the array.
 *
 * @template T - The object type for which the schema is generated.
 *
 * Example:
 * type Person = {
 *   name: string;
 *   age: number;
 *   address: {
 *     city: string;
 *     country: string;
 *     details: {
 *       zip: string;
 *       street: string;
 *     };
 *   };
 * };
 *
 * type PersonSchema = Schema<Person>;
 * // Resulting type:
 * // [
 * //   'name',
 * //   'age',
 * //   { address: ['city', 'country', { details: ['zip', 'street'] }] }
 * // ]
 */

type Primitive = string | number | boolean | symbol | bigint | null | undefined
type FilterPrimitive<T> = T extends Primitive ? T : never

type SchemaItem<T, K> = T extends Primitive
  ? ToString<K> // For primitive fields, return the key as string
  : SubSchema<T, K> // For object fields, recursively apply Schema

type ToString<T> = T extends string | number ? `${T}` : never
type SubSchema<T, K> = K extends string ? { readonly [P in K]-?: SchemaFromType<NonNullable<T>> } : never

export type SchemaFromType<T> = {
  [K in keyof T]-?: T[K] extends Array<infer U> ? SchemaItem<U, K> : SchemaItem<T[K], K>
}[keyof T] extends infer U
  ? ReadonlyArray<U>
  : never

export type Schema<T> = string | SchemaFromType<T>

/**
 * ExtendSchema<T, U> combines fields from an array type `T` with a union type `U` into a single array.
 *
 * @template T - An array of fields (strings).
 * @template U - A union type of fields to extend the schema with.
 * @returns A new array type containing both the original fields in `T` and the fields in `U`.
 */
export type ExtendSchema<T extends readonly any[], U> = (T[number] | U)[]

/**
 * MergeType<T> takes a union type T and merges all its variants into a single object type.
 *
 * This type recursively iterates through each union and merges the properties.
 *
 * Example:
 * type Issue = {
 *   project: ["id"];
 * } | {
 *   customFields: ["id", "name"];
 * };
 *
 * type MergedIssue = MergeType<Issue>;
 * // Resulting type:
 * // {
 * //   project: ["id"];
 * //   customFields: ["id", "name"];
 * // }
 */

export type MergeType<T> = (T extends any ? (x: T) => void : never) extends (x: infer U) => void
  ? { [K in keyof U]: U[K] }
  : never

/**
 * FilterFields<T, F> is a utility type that filters fields of object type T based on a given field schema F.
 * F can be a mix of flat fields (strings) and nested fields (objects).
 * It recursively extracts the specified fields, handling both flat and nested objects.
 *
 * @template T - The object type to filter.
 * @template F - A schema (array of fields) describing which fields to extract from T.
 *
 * Example:
 * const person = {
 *   name: 'John',
 *   age: 30,
 *   address: {
 *     city: 'New York',
 *     country: 'USA',
 *     details: {
 *       zip: '10001',
 *       street: '5th Avenue',
 *     }
 *   }
 * };
 *
 * type FilteredPerson = FilterFields<typeof person, ['name', { address: ['city', { details: ['zip'] }] }]>;
 * // The resulting type will be:
 * // {
 * //   name: string;
 * //   address: {
 * //     city: string;
 * //     details: {
 * //       zip: string;
 * //     };
 * //   };
 * // }
 */

type FilterKeys<F extends FieldsSchema> = {
  [K in Extract<F[number], string>]: K
}

type FilterNested<F extends FieldsSchema> = MergeType<
  {
    [K in keyof F]: F[K] extends string ? never : F[K]
  }[number]
>

// Handle flat fields (string) and check if K exists in T
type FilterStringFields<T, F extends Record<string, string>> = {
  [K in keyof F]: K extends keyof T ? FilterPrimitive<T[K]> : T extends { [Q in K]: infer U } ? U : never
}

// Handle nested fields (object)
type FilterObjectFields<T, F extends Record<string, FieldsSchema>> = {
  -readonly [K in keyof F]: K extends keyof T
    ? K extends keyof F
      ? F[K] extends FieldsSchema
        ? NonNullable<T[K]> extends Array<infer U>
          ? FilterFields<U, F[K]>[]
          : FilterFields<NonNullable<T[K]>, F[K]>
        : never
      : never
    : never
}

export type FilterFields<T, F extends FieldsSchema> = MergeType<
  FilterStringFields<T, FilterKeys<F>> | FilterObjectFields<T, FilterNested<F>>
>

/**
 * Entity<T, TSchema> is a type that represents an entity with optional schema-based filtering.
 *
 * @template T - The base entity type (e.g., Agile, Project) from which fields will be filtered.
 * @template TSchema - A schema describing the fields to include in the resulting entity.
 * If undefined, the full `EntityBase` schema is used.
 *
 * Example:
 * type Person = {
 *   name: string;
 *   age: number;
 *   address: {
 *     city: string;
 *     country: string;
 *   };
 * };
 *
 * type FilteredPerson = Entity<Person, ['name', { address: ['city'] }]>;
 * // Resulting type:
 * // {
 * //   name: string;
 * //   address: {
 * //     city: string;
 * //   };
 * // }
 *
 * type FullPerson = Entity<Person, undefined>;
 * // Resulting type: Schema<EntityBase>
 */

export type Entity<T, TSchema> = TSchema extends undefined
  ? SchemaFromType<EntityBase>
  : TSchema extends FieldsSchema
    ? FilterFields<T, TSchema>
    : TSchema extends string
      ? FilterFields<T, ParseSchema<TSchema>>
      : never

export type QueryParamBuilder<T = unknown | undefined> = (value?: T) => string | string[]

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}
