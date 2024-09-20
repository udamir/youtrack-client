import type { ProjectCustomField } from "./CustomFields"
import type { EntityBase } from "./Entity"
import type { Project } from "./Project"
import type { Issue } from "./Issue"
import type { User } from "./User"

export type WorkItemAttribute = EntityBase<"WorkItemAttribute"> & {
  workItem: BaseWorkItem | null // The work item where the attribute belongs. Can be null.
  projectAttribute: WorkItemProjectAttribute // The project-related settings for the work item attribute.
  value: WorkItemAttributeValue | null // The value of the work item attribute. Can be null.
  name: string // The name of the work item attribute.
}

export type BaseWorkItem = IssueWorkItem

export type IssueWorkItem = EntityBase<"IssueWorkItem"> & {
  author: User | null // The user to whom the work is attributed in the work item. Can be null.
  creator: User | null // The user who added the work item to the issue. Read-only. Can be null.
  text: string | null // The work item description. Can be null.
  textPreview: string // Parsed preview of the description. Read-only.
  type: WorkItemType | null // The work item type. Can be null.
  created: number | null // The timestamp in milliseconds indicating when the work item was created. Stored as a Unix timestamp at UTC.
  updated: number | null // The timestamp in milliseconds indicating the last update of the work item. Stored as a Unix timestamp at UTC.
  duration: DurationValue // The duration of the work item.
  date: number // The timestamp in milliseconds indicating the date and time of the work item. Stored as a Unix timestamp in UTC. The time part is set to midnight for the current date.
  issue: Issue // Stores attributes of the issue to which the work item is attached. Read-only.
  attributes: WorkItemAttribute[] // The list of attributes of the work item. Read-only.
}

export type WorkItemType = EntityBase<"WorkItemType"> & {
  name: string | null // The name of the work item type. Can be null.
  autoAttached: boolean // If true, this work item type is automatically added to a project when time tracking is enabled.
}

export type DurationValue = EntityBase<"DurationValue"> & {
  minutes: number // Number of minutes in the time interval. Read-only.
  presentation: string // Presentation of the time interval according to the user settings of duration format and user locale. Read-only.
}

export type WorkItemProjectAttribute = EntityBase<"WorkItemProjectAttribute"> & {
  timeTrackingSettings?: ProjectTimeTrackingSettings | null // The time tracking settings of the project. Can be null.
  prototype?: WorkItemAttributePrototype | null // The prototype for the work item attribute. Can be null.
  values: WorkItemAttributeValue[] // The list of possible values of the work item attribute.
  name?: string | null // The name of the work item attribute. Read-only. Can be null.
  ordinal: number // The position of the attribute in the list of attributes in the UI.
}

export type ProjectTimeTrackingSettings = EntityBase<"ProjectTimeTrackingSettings"> & {
  enabled: boolean // When true, the time tracking in the project is enabled. Otherwise, false.
  estimate?: ProjectCustomField | null // The custom field that is used for estimation in the project. Can be null.
  timeSpent?: ProjectCustomField | null // The custom field that is used for time spent in the project. Can be null.
  workItemTypes: WorkItemType[] // A collection of work item types that are used in the project.
  project?: Project | null // Reference to the project, to which these settings belong. Read-only. Can be null.
  attributes: WorkItemProjectAttribute[] // The list of work item attributes available in this project.
}

export type GlobalTimeTrackingSettings = EntityBase<"GlobalTimeTrackingSettings"> & {
  workItemTypes: WorkItemType[] // The list of available work item types. Read-only.
  workTimeSettings: WorkTimeSettings // Server's work schedule settings. Read-only.
  attributePrototypes: WorkItemAttributePrototype[] // The list of available work item attributes. Read-only.
}

export type WorkTimeSettings = EntityBase<"WorkTimeSettings"> & {
  minutesADay?: number // Number of minutes per working day. For example, for an 8-hour day, it would be 480.
  workDays?: number[] // The indexes of the days of the week that are counted as working days. Sunday's index is 0, Monday's index is 1 and so on.
  firstDayOfWeek: number // Index of the first day of week. It depends on server locale. Read-only.
  daysAWeek: number // Number of working days a week. Read-only.
}

export type WorkItemAttributeValue = EntityBase<"WorkItemAttributeValue"> & {
  name?: string | null // The name of the value of a work item attribute. Can be null.
  description?: string | null // The description of the value of a work item attribute. Can be null.
  autoAttach: boolean // If true, the work item attribute is automatically added to a project when you enable time tracking in it.
  prototype?: WorkItemAttributePrototype | null // The prototype for the work item attribute. Can be null.
}

export type WorkItemAttributePrototype = EntityBase<"WorkItemAttributePrototype"> & {
  name?: string | null // The name of the work item attribute. Can be null.
  instances: WorkItemProjectAttribute[] // Stores project-related settings for the work item attributes used in projects.
  values: WorkItemAttributeValue[] // The list of possible values of the work item attribute.
}
