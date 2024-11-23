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
