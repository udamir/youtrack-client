import type { Project, ProjectBasedColorCoding } from "./Project"
import type { FieldBasedColorCoding } from "./Field"
import type { CustomField } from "./CustomFields"
import type { UserGroup } from "./UserGroup"
import type { EntityBase } from "./Entity"
import type { Issue } from "./Issue"
import type { User } from "./User"

export type ColorCoding = FieldBasedColorCoding | ProjectBasedColorCoding

// Mutable Agile entity
export type AgileMutable = {
  name?: string // The name of the agile board. Can be null.
  owner?: User // The owner of the agile board. Can be null.
  // visibleFor?: UserGroup // Deprecated: The group of users that can view this board. Can be null.
  // visibleForProjectBased?: boolean // Deprecated: When true, the board is visible to anyone who can view all associated projects.
  // updateableBy?: UserGroup // Deprecated: The group of users who can update the settings of this board. Can be null.
  // updateableByProjectBased?: boolean // Deprecated: When true, anyone who can update the associated projects can update the board.
  orphansAtTheTop: boolean // When true, the orphan swimlane is placed at the top of the board.
  hideOrphansSwimlane: boolean // When true, the orphans swimlane is not displayed on the board.
  estimationField?: CustomField // A custom field used as the estimation field for the board. Can be null.
  originalEstimationField?: CustomField // A custom field used as the original estimation field for the board. Can be null.
  projects: Project[] // A collection of projects associated with the board.
  sprints: Sprint[] // The set of sprints associated with the board.
  swimlaneSettings?: SwimlaneSettings // Settings of the board swimlanes. Can be null.
  colorCoding?: ColorCoding // Color coding settings for the board. Can be null.
}

// Read-only version extending AgileBase
export type Agile = EntityBase<"Agile"> &
  AgileMutable & {
    readSharingSettings: AgileSharingSettings[] // Users and groups that can view this board. Read-only.
    updateSharingSettings: AgileSharingSettings[] // Users and groups that can update this board. Read-only.
    currentSprint?: Sprint // A sprint designated as the current one for this agile board. Can be null.
    columnSettings: ColumnSettings // Column settings of the board. Read-only.
    sprintsSettings: SprintsSettings // Settings of the board sprints. Read-only.
    status: AgileStatus // Status of the board. Read-only.
  }

export type Sprint = EntityBase<"Sprint"> & {
  agile: Agile | null // The agile board that the sprint belongs to. Can be null. Read-only.
  name: string | null // Name of the sprint. Can be null.
  goal: string | null // Goal of the sprint. Can be null.
  start: number | null // The start date of the sprint in milliseconds (unix timestamp at UTC). Can be null.
  finish: number | null // The end date of the sprint in milliseconds (unix timestamp at UTC). Can be null.
  archived: boolean // Indicates whether the sprint is archived.
  isDefault: boolean // True if new issues matching a column are automatically added to this sprint.
  issues: Issue[] // Issues that are present on this sprint.
  unresolvedIssuesCount: number // Number of unresolved issues on this sprint. Read-only.
  previousSprint: Sprint | null // The previous sprint to which unresolved issues from this sprint will be moved. Can be null.
}

export type AgileSharingSettings = EntityBase<"AgileSharingSettings"> & {
  permittedGroups: UserGroup[] // The list of groups that can view or update an agile board.
  permittedUsers: User[] // The list of users that can view or update an agile board.
}

export type ColumnSettings = EntityBase<"ColumnSettings"> & {
  field?: CustomField // Custom field, which values are used for columns. Can be null.
  columns: AgileColumn[] // Columns that are shown on the board.
}

export type AgileColumn = EntityBase<"AgileColumn"> & {
  presentation?: string // Text presentation of values stored in a column. Read-only. Can be null.
  isResolved: boolean // True if a column represents resolved state of an issue. Read-only.
  ordinal: number // Order of this column on board, counting from left to right.
  parent?: ColumnSettings // Link to agile column settings this column belongs to. Read-only. Can be null.
  wipLimit?: WIPLimit // WIP limit for this column. Can be null.
  fieldValues: AgileColumnFieldValue[] // Field values represented by this column.
}

export type WIPLimit = EntityBase<"WIPLimit"> & {
  max?: number // Maximum number of cards in column. Can be null.
  min?: number // Minimum number of cards in column. Can be null.
  column?: AgileColumn // A column, this WIP is applied to. Can be null.
}

export type AgileColumnFieldValue = EntityBase<"AgileColumnFieldValue"> & {
  name?: string // Presentation of a field value or values. Can be null.
  isResolved: boolean // True if field has type State and the value is resolved or all values are resolved. Read-only.
}

export type SwimlaneSettings = EntityBase<"SwimlaneSettings"> & {
  enabled: boolean // If false, board has no swimlanes and all cards are shown as uncategorized.
}

export type SprintsSettings = EntityBase<"SprintsSettings"> & {
  isExplicit: boolean // If true, issues should be added to the board manually. If false, issues are shown on the board based on the query and/or value of a field.
  cardOnSeveralSprints: boolean // If true, cards can be present on several sprints of this board.
  defaultSprint: Sprint | null // New cards are added to this sprint by default. This setting applies only if isExplicit == true. Can be null.
  disableSprints: boolean // If true, agile board has no distinct sprints in UI. However, in API it will look like it has only one active (not-archived) sprint.
  explicitQuery: string | null // Issues that match this query will appear on the board. This setting applies only if isExplicit == false. Can be null.
  sprintSyncField: CustomField | null // Based on the value of this field, issues will be assigned to the sprints. This setting applies only if isExplicit == false. Can be null.
  hideSubtasksOfCards: boolean // If true, subtasks of the cards that are present on the board will be hidden if they match board query. This setting applies only if isExplicit == false.
}

export type AgileStatus = EntityBase<"AgileStatus"> & {
  valid: boolean // True if the board is in valid state and can be used. Read-only.
  hasJobs: boolean // If true, a background job is currently being executed for the board. The board cannot be updated while a background job is running.
  errors: string[] // List of configuration errors found for this board. Read-only.
  warnings: string[] // List of configuration-related warnings found for this board. Read-only.
}
