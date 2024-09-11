import type { IssueAttachment, IssueKey, Issue, IssueComment } from "./Issue"
import type { CustomField } from "./CustomFields"
import type { UserGroup } from "./UserGroup"
import type { FilterField } from "./Field"
import type { EntityBase } from "./Entity"
import type { VcsChange } from "./Vcs"
import type { Sprint } from "./Agile"
import type { User } from "./User"
import type { Tag } from "./Tag"

export type ActivityItem =
  | CommentAttachmentsActivityItem // Activity for comment attachments
  | TagsActivityItem // Activity for tags
  | AttachmentRecognizedTextActivityItem // Activity for recognized text in attachments
  | AttachmentRenameActivityItem // Activity for renaming attachments
  | VisibilityUserActivityItem // Activity for visibility changes related to users
  | VisibilityGroupActivityItem // Activity for visibility changes related to user groups
  | AttachmentActivityItem // Activity for issue attachments
  | TextMarkupActivityItem // Activity for text markup in comments or descriptions
  | UsesMarkupActivityItem // Activity for markdown usage in comments or issues
  | CommentActivityItem // Activity for issue comments
  | CustomFieldActivityItem // Activity for custom fields
  | TextCustomFieldActivityItem // Activity for custom text fields
  | IssueCreatedActivityItem // Activity for issue creation
  | IssueResolvedActivityItem // Activity for issue resolution
  | LinksActivityItem // Activity for issue links
  | ProjectActivityItem // Activity for project changes
  | SprintActivityItem // Activity for sprint changes
  | SummaryActivityItem // Activity for summary changes
  | TotalVotesActivityItem // Activity for total votes changes
  | VcsChangeActivityItem // Activity for VCS changes
  | VcsChangeStateActivityItem // Activity for VCS change state
  | VotersActivityItem // Activity for voter changes

export type BaseActivityItem<TCategory extends string, TItem, TTarget> = EntityBase<"ActivityItem"> & {
  added: TItem[] // Single value or list of values added to a property of the target entity. Read-only.
  author: User // The user who performed the action. Read-only.
  category: TCategory // The category of the activity. Read-only.
  field: FilterField | null // The filter field containing additional info about the modified property. Can be null. Read-only.
  removed: TItem[] // Single value or list of values removed from a property of the target entity. Read-only.
  target: TTarget // The entity that is the target of the performed action. Read-only.
  targetMember: string | null // The name of the modified property of the target entity. Can be null. Read-only.
  targetSubMember: string | null // The name of property refining targetMember. Read-only. Can be null.
  timestamp: number // The timestamp of the activity event in milliseconds (unix timestamp at UTC). Read-only.
}

export type SimpleValueActivityItem<TCategory extends string, TValueType> = BaseActivityItem<TCategory, TValueType, any>

export type CommentAttachmentsActivityItem = BaseActivityItem<
  "ArticleCommentAttachmentsCategory" | "CommentAttachmentsCategory",
  IssueAttachment,
  IssueComment
>
export type TagsActivityItem = BaseActivityItem<"ArticleTagsCategory" | "TagsCategory", Tag, Issue>
export type AttachmentRecognizedTextActivityItem = SimpleValueActivityItem<"AttachmentRecognizedTextCategory", string>
export type AttachmentRenameActivityItem = SimpleValueActivityItem<"AttachmentRenameCategory", string>
export type VisibilityUserActivityItem = BaseActivityItem<
  "VisibilityUserCategory" | "CommentVisibilityCategory" | "IssueVisibilityCategory",
  User,
  unknown
>
export type VisibilityGroupActivityItem = BaseActivityItem<
  "VisibilityGroupCategory" | "CommentVisibilityCategory" | "IssueVisibilityCategory",
  UserGroup,
  unknown
>
export type AttachmentActivityItem = BaseActivityItem<"AttachmentsCategory", IssueAttachment, IssueAttachment>
export type TextMarkupActivityItem = BaseActivityItem<"CommentTextCategory" | "DescriptionCategory", string, unknown>
export type UsesMarkupActivityItem = BaseActivityItem<
  "CommentUsesMarkdownCategory" | "IssueUsesMarkdownCategory",
  boolean,
  unknown
>
export type CommentActivityItem = BaseActivityItem<"CommentsCategory", IssueComment, IssueComment>
export type CustomFieldActivityItem = BaseActivityItem<"CustomFieldCategory", CustomField, Issue> // TODO: check
export type TextCustomFieldActivityItem = BaseActivityItem<"CustomFieldCategory", CustomField, Issue> // TODO: check
export type IssueCreatedActivityItem = BaseActivityItem<"IssueCreatedCategory", Issue, Issue>
export type IssueResolvedActivityItem = BaseActivityItem<"IssueResolvedCategory", number, unknown>
export type LinksActivityItem = BaseActivityItem<"LinksCategory", Issue, Issue>
export type ProjectActivityItem = BaseActivityItem<"ProjectCategory", IssueKey, Issue>
export type SprintActivityItem = BaseActivityItem<"SprintCategory", Sprint, Issue>
export type SummaryActivityItem = SimpleValueActivityItem<"SummaryCategory", string>
export type TotalVotesActivityItem = SimpleValueActivityItem<"TotalVotesCategory", number>
export type VcsChangeActivityItem = BaseActivityItem<"VcsChangeCategory", VcsChange, unknown>
export type VcsChangeStateActivityItem = SimpleValueActivityItem<"VcsChangeStateCategory", number>
export type VotersActivityItem = BaseActivityItem<"VotersCategory", User, Issue>
