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
 *           'zip'
 *         ]
 *       }
 *     ]
 *   }
 * ]
 */
export type FieldsSchema = ReadonlyArray<Field>
type Field = string | Record<string, FieldsSchema>

/**
 * Parses a schema from a string into a structured `FieldsSchema`.
 *
 * The input string is expected to contain field names separated by commas, with nested
 * fields enclosed in parentheses.
 *
 * Example:
 * - Input: `"name,level,topic(id,name,value(name),test),color"`
 * - Output: `["name", "level", { topic: ["id", "name", { value: ["name"] }, "test"] }, "color"]`
 *
 * @template T - The input string schema to be parsed.
 */
export type ParseSchema<T extends string> = ParseSubSchema<T> extends [infer Schema, infer Rest]
  ? Rest extends ""
    ? Schema
    : never
  : never

/**
 * Finds a name from the input string and returns a tuple with the name,
 * the character immediately following the name (such as "," or "("),
 * and the remaining string.
 *
 * If the string ends, the name is returned alone.
 *
 * Example:
 * - Input: `"topic(id,name)"`
 * - Output: `["topic", "(", "id,name)"]`
 *
 * @template T - The input string to extract a name from.
 * @template Name - A string accumulator to build the name recursively.
 * @result - Tuple [Name, Char, RestString]
 */
type FindName<T, Name extends string = ""> = T extends `${Name}${infer Char}${infer Rest}`
  ? Char extends "," | "(" | ")"
    ? [Name, Char, Rest]
    : FindName<T, `${Name}${Char}`>
  : Name extends ""
    ? []
    : [Name]

/**
 * Recursively parses a string schema and builds a `FieldsSchema` array.
 *
 * The parsing process looks for field names separated by commas, and recognizes
 * nested schemas enclosed in parentheses. When a nested schema is encountered, it is
 * parsed recursively and appended to the resulting `FieldsSchema`.
 *
 * Example:
 * - Input: `"id,name),rest"`
 * - Output: `[["id", "name"], ",rest"]`
 *
 * @template T - The input string to parse into a schema.
 * @template Items - The accumulator for parsed schema items, defaulting to an empty array.
 * @result - Tuple [FieldsSchema, RestString]
 */
type ParseSubSchema<T, Items extends FieldsSchema = []> = FindName<T> extends [infer Name, infer Char, infer Rest]
  ? Name extends string
    ? Char extends ","
      ? ParseSubSchema<Rest, Name extends "" ? Items : [...Items, Name]>
      : Char extends "("
        ? ParseSubSchema<Rest> extends [infer SubSchema, infer Rest2]
          ? SubSchema extends FieldsSchema
            ? Rest2 extends ""
              ? [[...Items, { [K in Name]: SubSchema }], ""]
              : ParseSubSchema<Rest2, [...Items, { [K in Name]: SubSchema }]>
            : never
          : never
        : Char extends ")"
          ? Name extends ""
            ? [Items, Rest]
            : [[...Items, Name], Rest]
          : never
    : never
  : FindName<T> extends [infer Name]
    ? [[...Items, Name], ""]
    : [Items, ""]
