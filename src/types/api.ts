export type ListParams = {
  $skip?: number
  $top?: number
}

export type FieldsParam<T> = {
  fields?: T
}

export type BodyParam<T> = {
  body: T
}
