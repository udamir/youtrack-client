/**
 * FieldSchema is a read-only array of Field, which allows for a mix of flat fields (strings)
 * and nested fields (objects).
 *
 * Example:
 * const personFields: FieldsSchema = [
 *   'name',  // flat field
 *   { 
 *     address: [  // nested fields
 *       'city', 
 *       { 
 *         details: [
    *       'zip'
 *         ]
 *       }
 *     ]
 *   }  
 * ]
 */
export type FieldsSchema = ReadonlyArray<Field>
type Field = string | Record<string, FieldsSchema>

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
export type Schema<T> = {
  [K in keyof T]-?: T[K] extends Array<infer U> // Check if the field is an array
    ? U extends object
      ? { [P in K]-?: Schema<U> } // If the array contains objects, recursively apply Schema
      : K extends string | number
        ? `${K}` // For primitive fields, return the key as string
        : never
    : T[K] extends object
      ? { [P in K]-?: Schema<T[K]> } // If it's an object, recursively apply Schema
      : K extends string | number
        ? `${K}` // For primitive fields, return the key as string
        : never
}[keyof T] extends infer Result
  ? ReadonlyArray<Result>
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
export type FilterFields<T, F extends Schema<T>> = {
  // Handle flat fields (string) and check if K exists in T
  [K in Extract<F[number], string>]: K extends keyof T ? T[K] : never
} & {
  // Handle nested fields (object)
  [K in keyof Extract<F[number], object>]: K extends keyof T
    ? T[K] extends object
      ? K extends keyof Extract<F[number], object>
        ? Extract<F[number], object>[K] extends Schema<T[K]>
          ? FilterFields<T[K], Extract<F[number], object>[K]>
          : never
        : never
      : never
    : never
}
