import type { Entity, Issue, User, Project, IssueComment, CustomField, Sprint, Agile } from "../../src"

/**
 * Project Fields
 */
export const PROJECT_BASE_FIELDS = "id,name,shortName" as const
export const PROJECT_DETAILED_FIELDS = "id,name,shortName,description,archived,createdBy(id,login)" as const
export const PROJECT_FULL_FIELDS =
  "id,name,shortName,description,archived,createdBy(id,login,fullName),customFields(id,field(id,name,fieldType(id,valueType))),team(id,login,fullName)" as const
export const PROJECT_CUSTOM_FIELD_FIELDS = "id,bundle(id),field(id,name,localizedName,fieldType(id,valueType))" as const

/**
 * Issue Fields
 */
export const ISSUE_BASE_FIELDS = "id,idReadable,summary" as const
export const ISSUE_DETAILED_FIELDS =
  "id,idReadable,summary,description,created,updated,reporter(id,login),updater(id,login),project(id,name,shortName)" as const
export const ISSUE_FULL_FIELDS =
  "id,idReadable,summary,description,created,updated,resolved,numberInProject,reporter(id,login,fullName),updater(id,login,fullName),project(id,name,shortName),customFields(id,name,value,field(id,name)),tags(id,name),votes,commentsCount" as const
export const ISSUE_WITH_COMMENTS_FIELDS =
  "id,idReadable,summary,comments(id,text,created,updated,author(id,login))" as const

/**
 * User Fields
 */
export const USER_BASE_FIELDS = "id,login" as const
export const USER_DETAILED_FIELDS = "id,login,fullName,email" as const
export const USER_FULL_FIELDS = "id,login,fullName,email,guest,online,banned,avatarUrl" as const

/**
 * Custom Field Fields
 */
export const CUSTOM_FIELD_BASE_FIELDS = "id,name" as const
export const CUSTOM_FIELD_DETAILED_FIELDS =
  "id,name,fieldType(id,valueType),isAutoAttached,isDisplayedInIssueList" as const
export const CUSTOM_FIELD_FULL_FIELDS =
  "id,name,fieldType(id,valueType),isAutoAttached,isDisplayedInIssueList,ordinal,aliases,fieldDefaults(id,canBeEmpty,isPublic)" as const
export const CUSTOM_FIELD_FIELDS = "id,name,fieldType(id,valueType),isAutoAttached,isDisplayedInIssueList" as const

/**
 * Comment Fields
 */
export const COMMENT_BASE_FIELDS = "id,text" as const
export const COMMENT_DETAILED_FIELDS = "id,text,created,updated,author(id,login)" as const
export const COMMENT_FULL_FIELDS =
  "id,text,created,updated,author(id,login,fullName),issue(id,idReadable),attachments(id,name),deleted" as const

/**
 * Work Item Fields
 */
export const WORK_ITEM_BASE_FIELDS = "id,date,duration" as const
export const WORK_ITEM_DETAILED_FIELDS = "id,date,duration,author(id,login),issue(id,idReadable)" as const
export const WORK_ITEM_FULL_FIELDS =
  "id,date,duration,author(id,login,fullName),issue(id,idReadable,summary),created,updated,text,type(id,name)" as const

/**
 * Agile Fields
 */
export const AGILE_BASE_FIELDS = "id,name" as const
export const AGILE_DETAILED_FIELDS = "id,name,owner(id,login),projects(id,name)" as const
export const AGILE_FULL_FIELDS =
  "id,name,owner(id,login,fullName),projects(id,name,shortName),sprints(id,name),currentSprint(id,name),status(id,valid,errors)" as const

/**
 * Sprint Fields
 */
export const SPRINT_BASE_FIELDS = "id,name" as const
export const SPRINT_DETAILED_FIELDS = "id,name,goal,start,finish,archived" as const
export const SPRINT_FULL_FIELDS = "id,name,goal,start,finish,archived,isDefault,agile(id,name)" as const

/**
 * Tag Fields
 */
export const TAG_BASE_FIELDS = "id,name" as const
export const TAG_FULL_FIELDS = "id,name,owner(id,login)" as const

/**
 * Attachment Fields
 */
export const ATTACHMENT_BASE_FIELDS = "id,name,url" as const
export const ATTACHMENT_DETAILED_FIELDS = "id,name,url,mimeType,created,author(id,login)" as const
export const ATTACHMENT_FULL_FIELDS =
  "id,name,url,mimeType,thumbnailURL,created,author(id,login,fullName),issue(id,idReadable)" as const

/**
 * User Group Fields
 */
export const USER_GROUP_BASE_FIELDS = "id,name" as const
export const USER_GROUP_DETAILED_FIELDS = "id,name,description,allUsersGroup" as const
export const USER_GROUP_FULL_FIELDS = "id,name,description,allUsersGroup,teamForProject(id,name)" as const

/**
 * Saved Query Fields
 */
export const SAVED_QUERY_BASE_FIELDS = "id,name,query" as const
export const SAVED_QUERY_FULL_FIELDS = "id,name,query,owner(id,login),visibleFor(id,name),pinned" as const

/**
 * Type definitions for entity field strings
 */
type ProjectSchema = typeof PROJECT_BASE_FIELDS | typeof PROJECT_DETAILED_FIELDS | typeof PROJECT_FULL_FIELDS
type IssueSchema =
  | typeof ISSUE_BASE_FIELDS
  | typeof ISSUE_DETAILED_FIELDS
  | typeof ISSUE_FULL_FIELDS
  | typeof ISSUE_WITH_COMMENTS_FIELDS
type UserSchema = typeof USER_BASE_FIELDS | typeof USER_DETAILED_FIELDS | typeof USER_FULL_FIELDS
type CustomFieldSchema =
  | typeof CUSTOM_FIELD_BASE_FIELDS
  | typeof CUSTOM_FIELD_DETAILED_FIELDS
  | typeof CUSTOM_FIELD_FULL_FIELDS
  | typeof CUSTOM_FIELD_FIELDS
type CommentSchema = typeof COMMENT_BASE_FIELDS | typeof COMMENT_DETAILED_FIELDS | typeof COMMENT_FULL_FIELDS
type WorkItemSchema = typeof WORK_ITEM_BASE_FIELDS | typeof WORK_ITEM_DETAILED_FIELDS | typeof WORK_ITEM_FULL_FIELDS
type AgileSchema = typeof AGILE_BASE_FIELDS | typeof AGILE_DETAILED_FIELDS | typeof AGILE_FULL_FIELDS
type SprintSchema = typeof SPRINT_BASE_FIELDS | typeof SPRINT_DETAILED_FIELDS | typeof SPRINT_FULL_FIELDS
type TagSchema = typeof TAG_BASE_FIELDS | typeof TAG_FULL_FIELDS
type AttachmentSchema =
  | typeof ATTACHMENT_BASE_FIELDS
  | typeof ATTACHMENT_DETAILED_FIELDS
  | typeof ATTACHMENT_FULL_FIELDS
type UserGroupSchema = typeof USER_GROUP_BASE_FIELDS | typeof USER_GROUP_DETAILED_FIELDS | typeof USER_GROUP_FULL_FIELDS
type SavedQuerySchema = typeof SAVED_QUERY_BASE_FIELDS | typeof SAVED_QUERY_FULL_FIELDS

/**
 * Entity response types with field parameters
 */
export type ProjectTestEntity = Entity<Project, ProjectSchema>
export type IssueTestEntity = Entity<Issue, IssueSchema>
export type UserTestEntity = Entity<User, UserSchema>
export type CustomFieldTestEntity = Entity<CustomField, CustomFieldSchema>
export type CommentTestEntity = Entity<IssueComment, CommentSchema>
export type WorkItemTestEntity = Entity<any, WorkItemSchema>
export type AgileTestEntity = Entity<Agile, AgileSchema>
export type SprintTestEntity = Entity<Sprint, SprintSchema>
export type TagTestEntity = Entity<any, TagSchema>
export type AttachmentTestEntity = Entity<any, AttachmentSchema>
export type UserGroupTestEntity = Entity<any, UserGroupSchema>
export type GroupTestEntity = UserGroupTestEntity
export type SavedQueryTestEntity = Entity<any, SavedQuerySchema>
