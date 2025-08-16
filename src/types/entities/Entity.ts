export interface EntityBase<T extends string = string> {
  $type: T
  id: string // The database ID of the entity
}

export type PeriodValue = EntityBase<"PeriodValue"> & {
  minutes: number // Value in minutes.
  presentation: string // Human-readable representation.
}

export type TextFieldValue = EntityBase<"TextFieldValue"> & {
  text: string // The original source text of the custom field. Read-only. Can be null
  markdownText: string // The rendered markdown text of the custom field. Read-only.
}
