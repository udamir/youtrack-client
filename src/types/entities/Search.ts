import type { EntityBase } from "./Entity"

export type SearchSuggestionsMutable = {
  caret?: number; // The current caret position. The end of the current search query by default.
  ignoreUnresolvedSetting: boolean; // When false, the Hide unresolved issues setting is taken into account for creating search suggestions. When true, this setting is ignored.
  query?: string; // The current search query for which the suggestions are being requested. Can be null.
  folders: Array<IssueFolder>; // The current search context.
};

export type SearchSuggestions = EntityBase<'SearchSuggestions'> & SearchSuggestionsMutable & {
  suggestions: Array<Suggestion>; // The list of search suggestions for the currently entered search query. Read-only.
};

export type IssueFolder = EntityBase<'IssueFolder'> & {
  name?: string; // The name of the issue folder. Can be null.
}

export type Suggestion = EntityBase<'Suggestion'> & {
  completionStart?: number; // Start index of inserted string. Read-only. Can be null.
  completionEnd?: number; // End index of inserted string. Read-only. Can be null.
  matchingStart?: number; // Start index of the matched string. Read-only. Can be null.
  matchingEnd?: number; // End index of the matched string. Read-only. Can be null.
  caret?: number; // Position of the caret after insertion. Read-only. Can be null.
  description?: string; // Description of the suggested item. Read-only. Can be null.
  option?: string; // Suggested option. Read-only. Can be null.
  prefix?: string; // Prefix that should be inserted before the option. Read-only. Can be null.
  suffix?: string; // Suffix that should be inserted after the option. Read-only. Can be null.
  group?: string; // Name of the group for the suggestion. Read-only. Can be null.
  icon?: string; // An icon URI for the item. Read-only. Can be null.
  auxiliaryIcon?: string; // An additional icon URI for the item. Read-only. Can be null.
  className?: string; // Css class name that should be used for the item. Read-only. Can be null.
};