import type { CustomField } from "./CustomFields"
import type { EntityBase } from "./Entity"

export type FieldBasedColorCoding = EntityBase<"FieldBasedColorCoding"> & {
  prototype: CustomField | null // Sets the color of the card based on this custom field. Can be null.
}

export type FieldStyle = EntityBase<"FieldStyle"> & {
  background: string | null // Background color. Can be null. Read-only.
  foreground: string | null // Foreground color. Can be null. Read-only.
}

export type FilterField<T extends string = "FilterField"> = EntityBase<T> & {
  presentation: string // Presentation of the field.
  name: string // The name of the field.
}

export type CustomFilterField = FilterField<"CustomFilterField"> & {
  customField: CustomField // Reference to settings of the custom field.
}

export type PredefinedFilterField = FilterField<"PredefinedFilterField">
