import type { ProjectCustomField } from "./CustomFields"
import type { UserGroup } from "./UserGroup"
import type { EntityBase } from "./Entity"
import type { FieldStyle } from "./Field"
import type { Issue } from "./Issue"
import type { User } from "./User"

export type Project = EntityBase<"Project"> & {
  archived: boolean // If the project is currently archived, this property is true.
  createdBy?: User // The user who created the project. Can be null.
  customFields: ProjectCustomField[] // The set of custom fields that are available in the project.
  description?: string // The description of the project as shown on the project profile page. Can be null.
  fromEmail: string // The email address used to send notifications for the project. Returns default address if not set.
  iconUrl?: string // The URL of the icon of the project. Read-only. Can be null.
  issues: Issue[] // A list of all issues that belong to the project.
  leader?: User // The user who is set as the project owner. Can be null.
  name?: string // The name of the project. Can be null.
  replyToEmail?: string // The email address used as the reply email for notifications. Can be null.
  shortName?: string // The ID of the project. This short name is also a prefix for an issue ID. Can be null.
  startingNumber: number // Starting number for issues in project. Set only during creation of the new project.
  team: UserGroup // Read-only user group representing all members of the project team.
  template: boolean // If true, this project is a template.
}

export type CustomFieldCondition = EntityBase<"CustomFieldCondition"> & {
  parent?: ProjectCustomField // The custom field that is hidden behind the condition. Can be null.
}

export type ProjectBasedColorCoding = EntityBase<"ProjectBasedColorCoding"> & {
  projectColors: ProjectColor[] // Collection of per-project color settings.
}

export type ProjectColor = EntityBase<"ProjectColor"> & {
  project?: Project // A project for which the color settings are applied.
  color?: FieldStyle // Defines the color for issues of the specified project on the board.
}
