export type ListParams = {
  $skip?: number
  $top?: number
}

export type FieldsParam<T> = {
  fields?: T
}

export type CustomFieldsParam = {
  customFields?: string[]
}

export type QueryParam = {
  query?: string
}

export type MuteUpdateNotificationsParam = {
  muteUpdateNotifications?: boolean
}
