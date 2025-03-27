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

type Primitive = string | number | boolean | symbol | bigint

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
 * Converts a `FieldsSchema` into a structured `FilteringSchema`.
 *
 * This utility is useful for transforming an array-based schema representation
 * into a hierarchical object structure, preserving string fields and nested
 * object fields for filtering purposes.
 *
 * @typeParam T - The input schema type, constrained to an array of fields (`FieldsSchema`).
 *
 * Example:
 * ```typescript
 * type FieldsSchema = [
 *   "name",
 *   { details: ["zip", "city"] }
 * ];
 *
 * type Result = ToFilteringSchema<FieldsSchema>;
 *
 * // Expected Result:
 * // {
 * //   name: "name";
 * //   details: {
 * //     zip: "zip";
 * //     city: "city";
 * //   };
 * // }
 * ```
 */

export type FilteringSchema = Record<string, FilteringSchemaField>
export type FilteringSchemaField = string | { [key: string]: FilteringSchemaField }

export type ToFilteringSchema<T extends FieldsSchema> = {
  [K in T[number] as K extends string ? K : K extends Record<string, FieldsSchema> ? keyof K : never]: K extends string
    ? K
    : K extends Record<string, FieldsSchema>
      ? ToFilteringSchema<K[keyof K]>
      : never
} extends infer O
  ? { [K in keyof O]: O[K] }
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
 * type FilteredPerson = FilterFields<typeof person, { name: 'name', { address: { city: 'city', { details: { zip: 'zip'}}}}]>;
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

type FilterFields<T, Schema extends FilteringSchema> = T extends Array<infer U>
  ? Array<FilterFields<U, Schema>>
  : T extends object
    ? {
        [K in keyof T as K extends keyof Schema ? K : never]: K extends keyof Schema
          ? Schema[K] extends FilteringSchema
            ? FilterFields<T[K], Schema[K]>
            : FilterFields<T[K], {}>
          : never
      } & (T extends { id: infer IdType } ? { id: IdType } : {}) extends infer O
      ? { [K in keyof O]: O[K] }
      : never
    : T

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
    ? FilterFields<T, ToFilteringSchema<TSchema>>
    : TSchema extends string
      ? FilterFields<T, ToFilteringSchema<ParseSchema<TSchema>>>
      : never

export type QueryParamBuilder<T = unknown | undefined> = (value?: T) => string | string[]

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

/**
 * DurationPresentation is a type that enforces valid YouTrack time duration formats
 * with support for different language unit abbreviations
 *
 * Supports the following patterns:
 * - Single unit format: "90m", "2w", "34h", "5d"
 * - Multi-unit format: "1w 5d 4h 30m", "2d 4h", "1w 2d", etc.
 *
 * Language units can be specified via the generic type parameter:
 * - Default (English): ["w", "d", "h", "m"] (weeks, days, hours, minutes)
 * - Other languages can use their own abbreviations
 *
 * Example:
 * ```typescript
 * // Default English units
 * const valid1: DurationPresentation = "90m";
 * const valid2: DurationPresentation = "2w 5d 4h 30m";
 *
 * // Russian units
 * type RussianUnits = ["н", "д", "ч", "м"];
 * const russianTime: DurationPresentation<RussianUnits> = "2н 5д 4ч 30м";
 *
 * // German units
 * type GermanUnits = ["w", "t", "s", "m"];
 * const germanTime: DurationPresentation<GermanUnits> = "2w 5t 4s 30m";
 *
 * // Invalid presentations
 * const invalid1: DurationPresentation = "90"; // Missing unit
 * const invalid2: DurationPresentation = "2h 5m 1d"; // Incorrect order
 * const invalid3: DurationPresentation = "2m 2m"; // Duplicate unit
 * ```
 */

// Default English units type
export type EnglishUnits = ["w", "d", "h", "m"]
export type RussianUnits = ["н", "д", "ч", "м"]
export type GermanUnits = ["w", "t", "s", "m"]

// Generic DurationPresentation type with language support
export type DurationPresentation<T extends [string, string, string, string] = EnglishUnits> =
  | `${number}${T[0]}`
  | `${number}${T[1]}`
  | `${number}${T[2]}`
  | `${number}${T[3]}`
  | `${number}${T[0]} ${number}${T[1]}`
  | `${number}${T[0]} ${number}${T[2]}`
  | `${number}${T[0]} ${number}${T[3]}`
  | `${number}${T[1]} ${number}${T[2]}`
  | `${number}${T[1]} ${number}${T[3]}`
  | `${number}${T[2]} ${number}${T[3]}`
  | `${number}${T[0]} ${number}${T[1]} ${number}${T[2]}`
  | `${number}${T[0]} ${number}${T[1]} ${number}${T[3]}`
  | `${number}${T[0]} ${number}${T[2]} ${number}${T[3]}`
  | `${number}${T[1]} ${number}${T[2]} ${number}${T[3]}`
  | `${number}${T[0]} ${number}${T[1]} ${number}${T[2]} ${number}${T[3]}`

/**
 * AtLeastOne type makes all properties of T optional but requires at least one of them to be present
 *
 * @template T - The object type whose properties should be made optional but at least one required
 *
 * Example:
 * ```typescript
 * interface User {
 *   name: string;
 *   email: string;
 *   phone: string;
 * }
 *
 * // This allows any combination of properties, but at least one must be present
 * type UserUpdate = AtLeastOne<User>;
 *
 * const validUpdate1: UserUpdate = { name: "John" }; // Valid - has name
 * const validUpdate2: UserUpdate = { email: "john@example.com", phone: "123-456-7890" }; // Valid - has email and phone
 * const invalidUpdate: UserUpdate = {}; // Invalid - empty object not allowed
 * ```
 */
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]
