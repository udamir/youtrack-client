import type { EntityBase, Suggestion, Issue, UserGroup, User } from "."

export type CommandListMutable = {
  comment: string | null // A comment to add to an issue. Can be null.
  visibility: CommandVisibility // Stores visibility settings for a comment added with the command.
  query: string | null // Stores a command to apply. Can be null.
  caret: number // Current caret position. End of current command by default.
  silent: boolean // If true, the command is applied without notification. The default value is false.
  runAs: string | null // Login for a user on whose behalf the command is executed. Can be null.
  issues: Array<Issue> // Stores a collection of issues to which the current command applies.
}

export type CommandList = EntityBase<"CommandList"> &
  CommandListMutable & {
    commands: Array<ParsedCommand> // Stores a collection of commands parsed from the provided query. Read-only.
    suggestions: Array<Suggestion> // Stores a collection of possible command suggestions. Read-only.
  }

export type CommandVisibility = CommandLimitedVisibility | CommandUnlimitedVisibility

export type CommandUnlimitedVisibility = EntityBase<"CommandUnlimitedVisibility">

export type CommandLimitedVisibility = EntityBase<"CommandLimitedVisibility"> & {
  permittedGroups: Array<UserGroup> // A list of groups that can access the comment. Read-only.
  permittedUsers: Array<User> // A list of users that are allowed to access the comment. Read-only.
}

export type ParsedCommand = EntityBase<"ParsedCommand"> & {
  description: string | null // HTML description of the command that describes what will be done to issue as a result of this command. Read-only. Can be null.
  error: boolean | null // Indicates whether the command contains errors. Read-only. Can be null.
  delete: boolean | null // Indicates whether the command deletes an issue. Read-only. Can be null.
}
