import type { EntityBase } from "./Entity"

export type SearchSuggestionsMutable = {
  caret: number // The current caret position. The end of the current search query by default.
  ignoreUnresolvedSetting: boolean // When false, the Hide unresolved issues setting is taken into account for creating search suggestions. When true, this setting is ignored.
  query: string | null // The current search query for which the suggestions are being requested. Can be null.
  folders: Array<IssueFolder> // The current search context.
}

export type SearchSuggestions = EntityBase<"SearchSuggestions"> &
  SearchSuggestionsMutable & {
    suggestions: Array<Suggestion> // The list of search suggestions for the currently entered search query. Read-only.
  }

export type IssueFolder = EntityBase<"IssueFolder"> & {
  name?: string // The name of the issue folder. Can be null.
}

export type Suggestion = EntityBase<"Suggestion"> & {
  completionStart: number | null // Start index of inserted string. Read-only. Can be null.
  completionEnd: number | null // End index of inserted string. Read-only. Can be null.
  matchingStart: number | null // Start index of the matched string. Read-only. Can be null.
  matchingEnd: number | null // End index of the matched string. Read-only. Can be null.
  caret: number | null // Position of the caret after insertion. Read-only. Can be null.
  description: string | null // Description of the suggested item. Read-only. Can be null.
  option: string | null // Suggested option. Read-only. Can be null.
  prefix: string | null // Prefix that should be inserted before the option. Read-only. Can be null.
  suffix: string | null // Suffix that should be inserted after the option. Read-only. Can be null.
  group: string | null // Name of the group for the suggestion. Read-only. Can be null.
  icon: string | null // An icon URI for the item. Read-only. Can be null.
  auxiliaryIcon: string | null // An additional icon URI for the item. Read-only. Can be null.
  className: string | null // Css class name that should be used for the item. Read-only. Can be null.
}
