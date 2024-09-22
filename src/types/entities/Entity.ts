export interface EntityBase<T extends string = string> {
  $type: T
  id: string // The database ID of the entity
}

export type PeriodValue = EntityBase<"PeriodValue"> & {
  minutes: number // Value in minutes.
  presentation: string // Human-readable representation.
}
