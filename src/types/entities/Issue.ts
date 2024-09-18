import type { ProjectCustomField } from "./CustomFields"
import type { EntityBase, PeriodValue } from "./Entity"
import type {
  BuildBundleElement,
  BundleElement,
  EnumBundleElement,
  OwnedBundleElement,
  StateBundleElement,
  VersionBundleElement,
} from "./BundleElement"
import type { IssueWorkItem } from "./WorkItem"
import type { Visibility } from "./Visibility"
import type { Attachment } from "./Attachment"
import type { UserGroup } from "./UserGroup"
import type { IssueFolder } from "./Search"
import type { Project } from "./Project"
import type { Comment } from "./Comment"
import type { User } from "./User"
import type { Tag } from "./Tag"

export type Issue = EntityBase<"Issue"> & {
  id: string // The database ID of the issue. Read-only.
  attachments: IssueAttachment[] // The list of attachments in the issue.
  comments: IssueComment[] // A list of comments for the issue.
  commentsCount: number // The number of comments in the issue. Read-only.
  created: number // The timestamp in milliseconds indicating the moment when the issue was created. Stored as a unix timestamp at UTC. Read-only.
  customFields: IssueCustomField[] // The collection of custom fields that are present in the issue. Read-only.
  description: string | null // The issue description. Can be null.
  draftOwner: User | null // The creator of the draft if the issue is a draft. null if the issue is reported. Read-only. Can be null.
  externalIssue: ExternalIssue | null // Reference to the issue or similar object in an originating third-party system. Read-only. Can be null.
  idReadable: string // The issue ID as seen in the YouTrack interface. Read-only.
  isDraft: boolean // true if this issue is a draft, false if it is reported. Read-only.
  links: IssueLink[] // Issue links (for example, `relates to`, `parent for`, and so on). Read-only.
  numberInProject: number // The issue number in the project. Read-only.
  parent: IssueLink | null // The parent issue for the current one. If the issue is not a sub-task of any issue, then null. Read-only.
  pinnedComments: IssueComment[] // The list of comments that are pinned in the issue. Read-only.
  project: Project | null // The project where the issue belongs. Can be null.
  reporter: User | null // The user who reported (created) the issue. Read-only. Can be null.
  resolved: number | null // The timestamp in milliseconds indicating the moment when the issue was assigned a state that is considered to be resolved. Stored as a unix timestamp at UTC. null if the issue is still in an unresolved state. Read-only. Can be null.
  subtasks: IssueLink[] // The list of sub-tasks of the issue. Read-only.
  summary: string | null // The issue summary. Can be null.
  tags: Tag[] // The list of tags that are added to the issue.
  updated: number // The timestamp in milliseconds indicating the last update of the issue. Stored as a unix timestamp at UTC. Read-only.
  updater: User | null // The user who last updated the issue. Read-only. Can be null.
  visibility: Visibility | null // Visibility settings of the issue. They describe who is allowed to see the issue. Can be null.
  voters: IssueVoters // Object that contains data about voters for the issue and for its duplicates. Read-only.
  votes: number // The sum of votes for this issue and votes for its duplicates. A reporter of a duplicate issue automatically becomes a voter for the main issue. Read-only.
  watchers: IssueWatchers // Object that contains data about users watching this issue or its duplicates. Read-only.
  wikifiedDescription: string // The issue description as shown in the UI after processing wiki/Markdown markup (including HTML markup). Read-only.
}

export type IssueKey = EntityBase<"IssueKey"> & {
  project: Project // The project where the issue belongs or previously belonged. Read-only.
  numberInProject: number // The sequential number of the issue in a project. Read-only.
}

export type IssueAttachment = Attachment<"IssueAttachment"> & {
  issue: Issue | null // The issue that the file is attached to. Read-only. Can be null.
  comment: IssueComment | null // The comment that the file is attached to. Returns null, if the file was attached directly to the issue. Read-only.
  thumbnailURL: string | null // URL of the attachment thumbnail. Read-only. Can be null.
}

export type IssueComment = Comment<"IssueComment"> & {
  attachments: IssueAttachment[] // The list of attachments that are attached to the comment.
  deleted: boolean // When true, the comment is considered to be deleted, otherwise false.
  issue: Issue | null // The issue the comment belongs to. Read-only. Can be null.
  textPreview: string // The comment text as it is shown in UI after processing with wiki/markdown (including HTML markup). Read-only.
}

export type IssueCustomField =
  | SimpleIssueCustomField
  | DateIssueCustomField
  | PeriodIssueCustomField
  | SingleBuildIssueCustomField
  | SingleGroupIssueCustomField
  | SingleOwnedIssueCustomField
  | SingleUserIssueCustomField
  | SingleVersionIssueCustomField
  | StateIssueCustomField
  | StateMachineIssueCustomField
  | MultiBuildIssueCustomField
  | MultiEnumIssueCustomField
  | MultiEnumIssueCustomField
  | MultiGroupIssueCustomField
  | MultiOwnedIssueCustomField
  | MultiUserIssueCustomField
  | MultiVersionIssueCustomField
  | TextIssueCustomField

export type IssueCustomFieldBase<T extends string = "IssueCustomField"> = EntityBase<T> & {
  id: string // The ID of the custom field in the issue. Read-only.
  projectCustomField: ProjectCustomField // Reference to the custom field settings for the particular project. Read-only.
  name: string // The name of the custom field. Read-only.
  value: any // The value assigned to the custom field in the issue. Depending on the type of the field, this attribute can store a single value or an array of values. Read-only.
}

export type SimpleIssueCustomField = IssueCustomFieldBase<"SimpleIssueCustomField"> & {
  value: string | number // The value assigned to the custom field in the issue.
}

export type TextIssueCustomField = IssueCustomFieldBase<"TextIssueCustomField"> & {
  value: string
}

export type DateIssueCustomField = IssueCustomFieldBase<"DateIssueCustomField"> & {
  value: number // The value assigned to the custom field in the issue. For a field with the type "Date and time", its value is represented by the exact timestamp in milliseconds. Stored as a unix timestamp at UTC. Timestamps are presented by a value of the type Long.
}

export type PeriodIssueCustomField = IssueCustomFieldBase<"PeriodIssueCustomField"> & {
  value: PeriodValue // The value assigned to the custom field in the issue.
}

export type SingleBuildIssueCustomField = IssueCustomFieldBase<"SingleBuildIssueCustomField"> & {
  value: BuildBundleElement // The value assigned to the custom field in the issue.
}

export type SingleGroupIssueCustomField = IssueCustomFieldBase<"SingleGroupIssueCustomField"> & {
  value: UserGroup // The value assigned to the custom field in the issue
}

export type SingleOwnedIssueCustomField = IssueCustomFieldBase<"SingleOwnedIssueCustomField"> & {
  value: OwnedBundleElement // The value assigned to the custom field in the issue
}

export type SingleUserIssueCustomField = IssueCustomFieldBase<"SingleUserIssueCustomField"> & {
  value: User // The value assigned to the custom field in the issue
}

export type SingleVersionIssueCustomField = IssueCustomFieldBase<"SingleVersionIssueCustomField"> & {
  value: VersionBundleElement // The value assigned to the custom field in the issue
}

export type StateIssueCustomField = IssueCustomFieldBase<"StateIssueCustomField"> & {
  value: StateBundleElement // The value assigned to the custom field in the issue
}

export type StateMachineIssueCustomField = IssueCustomFieldBase<"StateMachineIssueCustomField"> & {
  value:
    | StateBundleElement
    | BuildBundleElement
    | VersionBundleElement
    | OwnedBundleElement
    | EnumBundleElement
    | UserGroup
    | User
}

export type MultiBuildIssueCustomField = IssueCustomFieldBase<"MultiBuildIssueCustomField"> & {
  value: BundleElement[] // The value assigned to the custom field in the issue
}

export type MultiEnumIssueCustomField = IssueCustomFieldBase<"MultiEnumIssueCustomField"> & {
  value: EnumBundleElement[] // The value assigned to the custom field in the issue
}

export type MultiGroupIssueCustomField = IssueCustomFieldBase<"MultiGroupIssueCustomField"> & {
  value: UserGroup[] // The list of user groups that are set as values for the custom field in the issue.
}

export type MultiOwnedIssueCustomField = IssueCustomFieldBase<"MultiOwnedIssueCustomField"> & {
  value: OwnedBundleElement[] // The list of owned values that are set for the custom field in the issue.
}

export type MultiUserIssueCustomField = IssueCustomFieldBase<"MultiUserIssueCustomField"> & {
  value: User[] // The list of owned values that are set for the custom field in the issue.
}

export type MultiVersionIssueCustomField = IssueCustomFieldBase<"MultiVersionIssueCustomField"> & {
  value: VersionBundleElement[] // The list of versions that are set as values for the issue custom field.
}

export type ExternalIssue = EntityBase<"ExternalIssue"> & {
  name: string // The name of the external service.
  url: string | null // The URL of the external service. Can be null.
  key: string | null // Issue key in the external system. Can be null.
}

export type IssueLink = EntityBase<"IssueLink"> & {
  direction: "OUTWARD" | "INWARD" | "BOTH" // Link direction. Supported values are OUTWARD, INWARD, and BOTH.
  linkType: IssueLinkType | null // Link type. Can be null.
  issues: Issue[] // List of issues that are linked with this type.
  trimmedIssues: Issue[] // The trimmed list of issues. Use $topLinks and $skipLinks parameters to request a particular part of the whole list.
}

export type IssueLinkType = EntityBase<"IssueLinkType"> & {
  name: string | null // The name of the issue link type. Can be null.
  localizedName: string | null // The localized name of the issue link type. Can be null.
  sourceToTarget: string | null // The outward name of the issue link type. Can be null.
  localizedSourceToTarget: string | null // The localized outward name of the issue link type. Can be null.
  targetToSource: string | null // The inward name of the issue link type. Can be null.
  localizedTargetToSource: string | null // The localized inward name of the issue link type. Can be null.
  directed: boolean // If true, the link is directed. Otherwise, false.
  aggregation: boolean // If true, the link represents aggregation relation. Otherwise, false.
  readOnly: boolean // If true, link settings cannot be updated. Otherwise, false.
}

export type IssueVoters = EntityBase<"IssueVoters"> & {
  hasVote: boolean // Indicates whether the user has voted for the issue or one of its duplicates.
  original: User[] // Users that voted for this particular issue.
  duplicate: DuplicateVote[] // Users who voted for duplicate issues.
}

export type DuplicateVote = EntityBase<"DuplicateVote"> & {
  issue: Issue | null // The duplicate issue that a user voted for.
  user: User | null // The user who voted for the duplicate issue.
}

export type IssueWatchers = EntityBase<"IssueWatchers"> & {
  hasStar: boolean // true if the current user added the "Star" tag to this issue, otherwise false.
  issueWatchers: Array<IssueWatcher> // The list of users who subscribed for notifications about this specific issue.
  duplicateWatchers: Array<IssueWatcher> // The list of users who subscribed to receive notifications about duplicates of this issue.
}

export type IssueWatcher = EntityBase<"IssueWatcher"> & {
  user: User | null // The user who is subscribed to the issue notifications. Can be null.
  issue: Issue | null // The original issue that the user subscribed to. Can be null.
  isStarred: boolean // true if the user added the "Star" tag to this issue, otherwise false.
}

export type IssueCountResponse = EntityBase<"IssueCountResponse"> & {
  count?: number // The number of issues found by the search. If this number equals -1, it means that YouTrack hasn't finished counting the issues yet. Can be null.
  unresolvedOnly?: boolean // true when the Hide resolved issues control is enabled. Can be null.
  query?: string // The search query. Can be null.
  folder?: IssueFolder // The currently selected search context. Can be null.
}

export type IssueTimeTracking = EntityBase<"IssueTimeTracking"> & {
  workItems: Array<IssueWorkItem> // Collection of work items of the issue.
  enabled: boolean // Indicates whether the time tracking is enabled in the project that the issue belongs to. Read-only.
}
