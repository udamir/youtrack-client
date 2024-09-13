export interface EntityBase<T extends string = string> {
  $type?: T
  id: string // The database ID of the entity
}
