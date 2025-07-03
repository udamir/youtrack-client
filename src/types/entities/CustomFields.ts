import type { ProjectCustomFieldBundle } from "./BundleElement"
import type { CustomFieldCondition, Project } from "./Project"
import type { IssueCustomField } from "./Issue"
import type { EntityBase } from "./Entity"

export type CustomField = EntityBase<"CustomField"> & {
  name: string | null // The name of the custom field. Can be null.
  localizedName: string | null // If set, this value is used for the field presentation in UI. Can be null.
  fieldType: FieldType // The type of the custom field.
  isAutoAttached: boolean // True if the field will be automatically attached to new projects.
  isDisplayedInIssueList: boolean // True if the field is visible in the Issues list by default.
  ordinal: number // Number of the field.
  aliases: string | null // A comma-separated list of aliases that can be used in search and commands. Can be null.
  fieldDefaults: CustomFieldDefaults // Default project-related settings for the custom field. Read-only.
  hasRunningJob: boolean // Indicates whether a background job is running for this field. Read-only.
  isUpdateable: boolean // Indicates whether the current user has permissions to update this field. Read-only.
  instances: ProjectCustomField[] // Project-related settings. May contain different values for custom fields of different types.
}

export type FieldType = IssueCustomField | ProjectCustomFieldType

export type EnumProjectCustomField = EntityBase<"EnumProjectCustomField">
export type BuildProjectCustomField = EntityBase<"BuildProjectCustomField">
export type StateProjectCustomField = EntityBase<"StateProjectCustomField">
export type VersionProjectCustomField = EntityBase<"VersionProjectCustomField">
export type OwnedProjectCustomField = EntityBase<"OwnedProjectCustomField">
export type UserProjectCustomField = EntityBase<"UserProjectCustomField">
export type GroupProjectCustomField = EntityBase<"GroupProjectCustomField">
export type SimpleProjectCustomField = EntityBase<"SimpleProjectCustomField">
export type DateProjectCustomField = EntityBase<"DateProjectCustomField">
export type PeriodProjectCustomField = EntityBase<"PeriodProjectCustomField">
export type TextProjectCustomField = EntityBase<"TextProjectCustomField">

export type ProjectCustomFieldType =
  | EnumProjectCustomField
  | BuildProjectCustomField
  | StateProjectCustomField
  | VersionProjectCustomField
  | OwnedProjectCustomField
  | UserProjectCustomField
  | GroupProjectCustomField
  | SimpleProjectCustomField
  | DateProjectCustomField
  | PeriodProjectCustomField
  | TextProjectCustomField

export type CustomFieldDefaults = EntityBase<"CustomFieldDefaults"> & {
  canBeEmpty: boolean // Indicates whether this field can have empty value in the issue.
  emptyFieldText: string | null // The text that is shown as a placeholder when the field is empty. Can be null.
  isPublic: boolean // If `true`, then a user needs Read Issue and Update Issue permissions to access this field. Otherwise, the field is considered private, and Read Issue Private Fields and Update Issue Private Fields permissions are required.
  parent: CustomField // Reference to the custom field.
}

export type ProjectCustomField = EntityBase<"ProjectCustomField"> & {
  bundle: ProjectCustomFieldBundle | null // The bundle that the custom field belongs to. Can be null.
  field: CustomField | null // The custom field in the project. Can be null.
  project: Project | null // The project where the custom field belongs. Can be null.
  canBeEmpty: boolean // If true, the custom field can have empty value, otherwise false.
  emptyFieldText: string | null // The text that is shown as a placeholder when the custom field has an empty value. Can be null.
  ordinal: number // The position number of this field on the list of project custom fields.
  isPublic: boolean // If true, the basic Read Issue and Update Issue permissions are sufficient to access this field. If false, the Read Issue Private Fields and Update Issue Private Fields permissions are required.
  hasRunningJob: boolean // If true, there is a background job running for this field. In this case, some field operations may be temporary inaccessible.
  condition: CustomFieldCondition | null // The condition for showing the custom field. Can be null.
}
