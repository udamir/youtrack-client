import type {
  ActivityCursorPage,
  ActivityItem,
  CustomField,
  CustomFieldsParam,
  Entity,
  FieldsParam,
  IssueWorkItem,
  ListParams,
  MuteUpdateNotificationsParam,
  Project,
  QueryParam,
  Reaction,
  Schema,
  Sprint,
  Tag,
  VcsChange,
  Issue,
  IssueAttachment,
  IssueComment,
  IssueCountResponse,
  IssueCustomField,
  IssueLink,
  IssueTimeTracking,
} from "../types"
import { fields, queryParams, RequestBuilder } from "../utils"
import { ResourceApi } from "./common"

type IssueSchema = Schema<Issue>
type ActivityItemSchema = Schema<ActivityItem>
type IssueCountResponseSchema = Schema<IssueCountResponse>
type ActivityCursorPageSchema = Schema<ActivityCursorPage>
type IssueAttachmentSchema = Schema<IssueAttachment>
type IssueCommentSchema = Schema<IssueComment>
type ReactionSchema = Schema<Reaction>
type IssueCustomFieldSchema = Schema<IssueCustomField>
type IssueLinkSchema = Schema<IssueLink>
type ProjectSchema = Schema<Project>
type SprintSchema = Schema<Sprint>
type TagSchema = Schema<Tag>
type IssueTimeTrackingSchema = Schema<IssueTimeTracking>
type IssueWorkItemSchema = Schema<IssueWorkItem>
type VcsChangeSchema = Schema<VcsChange>

type IssueEntity<TSchema extends IssueSchema> = Entity<Issue, TSchema>
type ActivityItemEntity<TSchema extends ActivityItemSchema> = Entity<ActivityItem, TSchema>
type IssueCountResponseEntity<TSchema extends IssueCountResponseSchema> = Entity<IssueCountResponse, TSchema>
type ActivityCursorPageEntity<TSchema extends ActivityCursorPageSchema> = Entity<ActivityCursorPage, TSchema>
type IssueAttachmentEntity<TSchema extends IssueAttachmentSchema> = Entity<IssueAttachment, TSchema>
type IssueCommentEntity<TSchema extends IssueCommentSchema> = Entity<IssueComment, TSchema>
type ReactionEntity<TSchema extends ReactionSchema> = Entity<Reaction, TSchema>
type IssueCustomFieldEntity<TSchema extends IssueCustomFieldSchema> = Entity<IssueCustomField, TSchema>
type IssueLinkEntity<TSchema extends IssueLinkSchema> = Entity<IssueLink, TSchema>
type ProjectEntity<TSchema extends ProjectSchema> = Entity<Project, TSchema>
type SprintEntity<TSchema extends SprintSchema> = Entity<Sprint, TSchema>
type TagEntity<TSchema extends TagSchema> = Entity<Tag, TSchema>
type IssueTimeTrackingEntity<TSchema extends IssueTimeTrackingSchema> = Entity<IssueTimeTracking, TSchema>
type IssueWorkItemEntity<TSchema extends IssueWorkItemSchema> = Entity<IssueWorkItem, TSchema>
type VcsChangeEntity<TSchema extends VcsChangeSchema> = Entity<VcsChange, TSchema>

/**
 * Resource that provides access to issues.
 * https://www.jetbrains.com/help/youtrack/devportal/resource-api-issues.html
 */
export class IssuesApi extends ResourceApi {
  /**
   * Get all issues that match the specified query.
   * @param fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Lets you specify the maximum number of entries that are returned in the response. If you don't set the $top value, the server limits the maximum number of returned entries.
   * @param params.$skip - Optional. Lets you set a number of returned entities to skip before returning the first one.
   * @param params.query - Issue search query. Read more about the search syntax here: Search Query Reference.
   * @param params.customFields - The name of the custom field to show in the response. When you use this parameter and request the custom field data in the request URL, the response only shows the requested custom fields instead of all of them.
   * @returns The list of issues that match the specified query.
   */
  async getIssues<TSchema extends IssueSchema>(
    params?: FieldsParam<TSchema> | ListParams | CustomFieldsParam | QueryParam,
  ): Promise<IssueEntity<TSchema>[]> {
    return this.fetch<IssueEntity<TSchema>[]>(
      ...new RequestBuilder(
        "api/issues",
        { fields, ...queryParams("$top", "$skip", "query", "customFields") },
        params,
      ).get(),
    )
  }

  /**
   * Create an issue.
   * @param body - Required fields: summary, project (id). Optional: other issue fields.
   * @param params.fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.draftId - ID of a draft to report as the new issue. If no draftId is provided, the issue is created from scratch. In this case, you must specify the summary and the project in the request payload.
   * @param params.muteUpdateNotifications - Set this parameter to true if no notifications should be sent on changes made by this request. This doesn't mute notifications sent by any workflow rules. Using this parameter requires Apply Commands Silently permission in all projects affected by the request.
   * @returns The created issue.
   */
  async createIssue<TSchema extends IssueSchema>(
    body: { summary: string; project: string } | Partial<Omit<Issue, "id">>,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam & { draftId?: string },
  ): Promise<IssueEntity<TSchema>> {
    return this.fetch<IssueEntity<TSchema>>(
      ...new RequestBuilder(
        "api/issues",
        { fields, ...queryParams("draftId", "muteUpdateNotifications") },
        params,
      ).post(body),
    )
  }

  /**
   * Read an issue with specific ID.
   * @param issueId - The database ID or project ID of the issue.
   * @param params.fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The requested issue.
   */
  async getIssueById<TSchema extends IssueSchema>(
    issueId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueEntity<TSchema>> {
    return this.fetch<IssueEntity<TSchema>>(...new RequestBuilder(`api/issues/${issueId}`, { fields }, params).get())
  }

  /**
   * Update a single issue.
   * @param issueId - The database ID or project ID of the issue.
   * @param params.fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set to true if no notifications should be sent on changes made by this request.
   * @returns The updated issue.
   */
  async updateIssue<TSchema extends IssueSchema>(
    issueId: string,
    body: Partial<Omit<Issue, "id">>,
    params: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<IssueEntity<TSchema>> {
    return this.fetch<IssueEntity<TSchema>>(
      ...new RequestBuilder(`api/issues/${issueId}`, { fields, muteUpdateNotifications: "boolean" }, params).post(body),
    )
  }

  /**
   * Delete the issue. Note that this operation cannot be undone.
   * @param issueId - The database ID or project ID of the issue.
   * @param params.fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves when the issue is deleted.
   */
  async deleteIssue<TSchema extends IssueSchema>(
    issueId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueEntity<TSchema>> {
    return this.fetch<IssueEntity<TSchema>>(...new RequestBuilder(`api/issues/${issueId}`, { fields }, params).delete())
  }

  /**
   * Get the number of issues found by a search.
   * @param query - The search query to get the number of issues for.
   * @param fields - A list of IssueCountResponse attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the count of issues.
   */
  async getIssueCount<TSchema extends IssueCountResponseSchema>(
    body: { query: string },
    params?: FieldsParam<TSchema>,
  ): Promise<{ count: number } & IssueCountResponseEntity<TSchema>> {
    const response = await this.fetch<{ count: number } & IssueCountResponseEntity<TSchema>>(
      ...new RequestBuilder("api/issuesGetter/count", { fields }).post(body),
    )
    if (response.count === -1) {
      // TODO: add pause
      return this.getIssueCount(body, params)
    }
    return response
  }

  /**
   * Get a list of all activities in the specific issue.
   * @param issueId - The ID of the issue.
   * @param params.fields - A list of ActivityItem attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.categories - Mandatory. Filters returned activities by categories. You must specify at least one category per request.
   * @param params.reverse - Indicates whether the order of returning activities is from newest to oldest or the opposite. Default is false.
   * @param params.start - The start of the time interval for the activity timestamp in milliseconds. If not set, defaults to 0.
   * @param params.end - The end of the time interval for the activity timestamp in milliseconds. If not set, defaults to Long.MAX_VALUE.
   * @param params.author - Filters activities by the author. Can be the database ID, login, Hub ID, or 'me' for the currently logged in user.
   * @param params.$top - Optional. Specifies the maximum number of entries to return in the response. Default limits apply if not set.
   * @param params.$skip - Optional. Lets you set a number of returned entities to skip before returning the first one.
   * @returns A promise that resolves to a list of activities.
   */
  async getIssueActivities<TSchema extends ActivityItemSchema>(
    issueId: string,
    params?: FieldsParam<TSchema> &
      ListParams & {
        categories: string
        reverse?: boolean
        start?: string
        end?: string
        author?: string
      },
  ): Promise<ActivityItemEntity<TSchema>[]> {
    return this.fetch<ActivityItemEntity<TSchema>[]>(
      ...new RequestBuilder(
        `api/issues/${issueId}/activities`,
        {
          fields,
          ...queryParams("$top", "$skip", "categories", "reverse", "start", "end", "author"),
        },
        params,
      ).get(),
    )
  }

  /**
   * Get information about the specific activity in the specific issue.
   * @param issueId - The Id of the issue.
   * @param itemId - The database ID of the activity item.
   * @param params.fields - A list of ActivityItem attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the activity item.
   */
  async getIssueActivity<TSchema extends ActivityItemSchema>(
    issueId: string,
    itemId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ActivityItemEntity<TSchema>> {
    return this.fetch<ActivityItemEntity<TSchema>>(
      ...new RequestBuilder(`api/issues/${issueId}/activities/${itemId}`, { fields }, params).get(),
    )
  }

  /**
   * Read a page of activities in the specific issue.
   * @param issueId - The Id of the issue.
   * @param params - Parameters for the request.
   * @param params.fields - A list of ActivityCursorPage attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.categories - Mandatory. Filters returned activities by categories. You must specify at least one category per request.
   * @param params.reverse - Indicates whether the order of returning activities is from newest to oldest (true) or oldest to newest (false). Defaults to false.
   * @param params.start - The timestamp in milliseconds indicating the start of the time interval for the activity timestamp. Defaults to 0 if not set.
   * @param params.end - The timestamp in milliseconds indicating the end of the time interval for the activity timestamp. Defaults to Long.MAX_VALUE if not set.
   * @param params.author - Filters activities by the author. You can specify the database ID, login, Hub ID, or 'me' for the currently logged in user.
   * @param params.cursor - For pagination. Use the cursor from the returned activity page to request the next page.
   * @param params.activityId - ID of the activity to include in the page. This activity is centered on the page.
   * @returns A promise that resolves to the page of activity items.
   */
  async getActivitiesPage<TSchema extends ActivityCursorPageSchema>(
    issueId: string,
    params: FieldsParam<TSchema> & {
      categories: string
      reverse?: boolean
      start?: string
      end?: string
      author?: string
      cursor?: string
      activityId?: string
    },
  ): Promise<ActivityCursorPageEntity<TSchema>> {
    return this.fetch<ActivityCursorPageEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/activitiesPage`,
        { fields, ...queryParams("categories", "reverse", "start", "end", "author", "cursor", "activityId") },
        params,
      ).get(),
    )
  }

  /**
   * Get a list of all attachments of the specific issue.
   * @param issueId - The Id of the issue.
   * @param params - Parameters for the request.
   * @param params.fields - A list of IssueAttachment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Specifies the maximum number of entries to be returned. Defaults to the server limit if not set.
   * @param params.$skip - Optional. Specifies the number of entities to skip before returning the first one.
   * @returns A promise that resolves to the list of issue attachments.
   */
  async getIssueAttachments<TSchema extends IssueAttachmentSchema>(
    issueId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<IssueAttachmentEntity<TSchema>[]> {
    return this.fetch<IssueAttachmentEntity<TSchema>[]>(
      ...new RequestBuilder(
        `api/issues/${issueId}/attachments`,
        { fields, ...queryParams("$skip", "$top") },
        params,
      ).get(),
    )
  }

  /**
   * Add an attachment to the issue.
   * @param issueId - The Id of the issue.
   * @param attachment - The attachment data to be added.
   * @param params - Parameters for the request.
   * @param params.fields - A list of IssueAttachment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set to true if no notifications should be sent on changes made by this request.
   * @returns A promise that resolves to the added issue attachment.
   */
  async createIssueAttachment<TSchema extends IssueAttachmentSchema>(
    issueId: string,
    body: FormData,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<IssueAttachmentEntity<TSchema>> {
    return this.fetch<IssueAttachmentEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/attachments`,
        { fields, muteUpdateNotifications: "boolean" },
        params,
      ).postFile(body),
    )
  }

  /**
   * Read a specific attachment of the issue.
   * @param issueId - The Id of the issue.
   * @param attachmentId - The database ID of the attachment.
   * @param params - Parameters for the request.
   * @param params.fields - A list of IssueAttachment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the issue attachment.
   */
  async getIssueAttachmentById<TSchema extends IssueAttachmentSchema>(
    issueId: string,
    attachmentId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueAttachmentEntity<TSchema>> {
    return this.fetch<IssueAttachmentEntity<TSchema>>(
      ...new RequestBuilder(`api/issues/${issueId}/attachments/${attachmentId}`, { fields }, params).get(),
    )
  }

  /**
   * Update a specific attachment.
   * @param issueId - The Id of the issue.
   * @param attachmentId - The database ID of the attachment.
   * @param params - Parameters for the request.
   * @param params.fields - A list of IssueAttachment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the updated issue attachment.
   */
  async updateIssueAttachment<TSchema extends IssueAttachmentSchema>(
    issueId: string,
    attachmentId: string,
    body: Partial<Omit<IssueAttachment, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueAttachmentEntity<TSchema>> {
    return this.fetch<IssueAttachmentEntity<TSchema>>(
      ...new RequestBuilder(`api/issues/${issueId}/attachments/${attachmentId}`, { fields }, params).post(body),
    )
  }

  /**
   * Delete a specific attachment.
   * @param issueId - The Id of the issue.
   * @param attachmentId - The database ID of the attachment.
   * @param params - Parameters for the request.
   * @param params.fields - A list of IssueAttachment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves when the attachment is deleted.
   */
  async deleteIssueAttachment<TSchema extends IssueAttachmentSchema>(
    issueId: string,
    attachmentId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueAttachmentEntity<TSchema>> {
    return this.fetch<IssueAttachmentEntity<TSchema>>(
      ...new RequestBuilder(`api/issues/${issueId}/attachments/${attachmentId}`, { fields }, params).delete(),
    )
  }

  /**
   * Get all accessible comments of the specific issue.
   * @param issueId - The Id of the issue.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of IssueComment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - The maximum number of entries to return. Defaults are applied if not specified.
   * @param params.$skip - The number of entries to skip before returning the first one.
   * @returns A promise that resolves to a list of issue comments.
   */
  async getIssueComments<TSchema extends IssueCommentSchema>(
    issueId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<IssueCommentEntity<TSchema>[]> {
    return this.fetch<IssueCommentEntity<TSchema>[]>(
      ...new RequestBuilder(
        `api/issues/${issueId}/comments`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Add a new comment to an issue with a specific ID.
   * @param issueId - The Id of the issue to which the comment will be added.
   * @param body - The comment text to be added.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of IssueComment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.draftId - ID of an existing draft to publish. Optional.
   * @param params.muteUpdateNotifications - Set to true if no notifications should be sent on changes made by this request.
   * @returns A promise that resolves to the created comment.
   */
  async createIssueComment<TSchema extends IssueCommentSchema>(
    issueId: string,
    body: { text: string } & Partial<Omit<IssueComment, "id">>,
    params?: FieldsParam<TSchema> &
      MuteUpdateNotificationsParam & {
        draftId?: string
      },
  ): Promise<IssueCommentEntity<TSchema>> {
    return this.fetch<IssueCommentEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/comments`,
        { fields, ...queryParams("draftId", "muteUpdateNotifications") },
        params,
      ).post(body),
    )
  }

  /**
   * Read a comment with a specific ID.
   * @param issueId - The Id of the issue that the comment belongs to.
   * @param commentId - The database ID of the comment to be read.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of IssueComment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the comment.
   */
  async getIssueCommentById<TSchema extends IssueCommentSchema>(
    issueId: string,
    commentId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueCommentEntity<TSchema>> {
    return this.fetch<IssueCommentEntity<TSchema>>(
      ...new RequestBuilder(`api/issues/${issueId}/comments/${commentId}`, { fields }, params).get(),
    )
  }

  /**
   * Update an existing comment of the specific issue.
   * @param issueId - The ID of the issue that the comment belongs to.
   * @param commentId - The database ID of the comment to be updated.
   * @param body - The updated comment data.
   * @param params.fields - Optional. A list of IssueComment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Optional. Set this parameter to true if no notifications should be sent on changes made by this request. This doesn't mute notifications sent by any workflow rules. Using this parameter requires Apply Commands Silently permission in all projects affected by the request.
   * @returns A promise that resolves to the updated comment.
   */
  async updateIssueComment<TSchema extends IssueCommentSchema>(
    issueId: string,
    commentId: string,
    body: Partial<Omit<IssueComment, "id">>,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<IssueCommentEntity<TSchema>> {
    return this.fetch<IssueCommentEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/comments/${commentId}`,
        { fields, muteUpdateNotifications: "boolean" },
        params,
      ).post(body),
    )
  }

  /**
   * Delete an existing comment of the specific issue.
   * This request deletes a comment from the database completely.
   * You can also remove a comment from an issue temporarily by updating the comment.
   * @param issueId - The ID of the issue that the comment belongs to.
   * @param commentId - The database ID of the comment to be deleted.
   * @param params.fields - Optional. A list of IssueComment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves when the comment has been deleted.
   */
  async deleteIssueComment<TSchema extends IssueCommentSchema>(
    issueId: string,
    commentId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueCommentEntity<TSchema>> {
    return this.fetch<IssueCommentEntity<TSchema>>(
      ...new RequestBuilder(`api/issues/${issueId}/comments/${commentId}`, { fields }, params).delete(),
    )
  }

  /**
   * Get a reaction with a specific ID.
   * Requires permissions: Read Issue, Read Issue Comment.
   * @param issueId - The ID of the issue that the comment belongs to.
   * @param commentId - The database ID of the comment that the reaction belongs to.
   * @param reactionId - The database ID of the reaction to retrieve.
   * @param params.fields - Optional. A list of Reaction attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the reaction.
   */
  async getIssueCommnetReaction<TSchema extends ReactionSchema>(
    issueId: string,
    commentId: string,
    reactionId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ReactionEntity<TSchema>> {
    return this.fetch<ReactionEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/comments/${commentId}/reactions/${reactionId}`,
        { fields },
        params,
      ).get(),
    )
  }

  /**
   * Remove a reaction from a comment. Only the author of the reaction can remove it.
   * Requires permissions: Read Issue, Read Issue Comment.
   * @param issueId - The ID of the issue that the comment belongs to.
   * @param commentId - The database ID of the comment that the reaction belongs to.
   * @param reactionId - The database ID of the reaction to remove.
   * @param params.fields - Optional. A list of Reaction attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the deleted reaction.
   */
  async deleteIssueCommnetReaction<TSchema extends ReactionSchema>(
    issueId: string,
    commentId: string,
    reactionId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ReactionEntity<TSchema>> {
    return this.fetch<ReactionEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/comments/${commentId}/reactions/${reactionId}`,
        { fields },
        params,
      ).delete(),
    )
  }

  /**
   * Get the list of available custom fields of the issue.
   * @param issueId - The ID of the issue.
   * @param params.fields - A list of IssueCustomField attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Specifies the maximum number of entries to return. The server returns a maximum of 42 entries if not specified.
   * @param params.$skip - Optional. Specifies the number of entries to skip before returning the first one.
   * @returns A promise that resolves to the list of custom fields.
   */
  async getIssueCustomFields<TSchema extends IssueCustomFieldSchema>(
    issueId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<IssueCustomFieldEntity<TSchema>[]> {
    return this.fetch<IssueCustomFieldEntity<TSchema>[]>(
      ...new RequestBuilder(
        `api/issues/${issueId}/customFields`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Get a specific custom field in the issue.
   * @param issueId - The ID of the issue.
   * @param fieldId - The entity ID of the custom field in the issue.
   * @param params.fields - A list of IssueCustomField attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the custom field.
   */
  async getIssueCustomFieldById<TSchema extends IssueCustomFieldSchema>(
    issueId: string,
    fieldId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueCustomFieldEntity<TSchema>> {
    return this.fetch<IssueCustomFieldEntity<TSchema>>(
      ...new RequestBuilder(`api/issues/${issueId}/customFields/${fieldId}`, { fields }, params).get(),
    )
  }

  /**
   * Update a specific custom field in the issue.
   * @param issueId - The ID of the issue.
   * @param fieldId - The entity ID of the custom field in the issue.
   * @param body - The new value to set for the custom field.
   * @param params.fields - A list of IssueCustomField attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set to true to suppress notifications about changes made by this request.
   * @returns A promise that resolves to the updated custom field.
   */
  async updateIssueCustomField<TSchema extends IssueCustomFieldSchema>(
    issueId: string,
    fieldId: string,
    body: Partial<Omit<CustomField, "id">>,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<IssueCustomFieldEntity<TSchema>> {
    return this.fetch<IssueCustomFieldEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/customFields/${fieldId}`,
        { fields, muteUpdateNotifications: "boolean" },
        params,
      ).post(body),
    )
  }

  /**
   * Get the list of links for the issue.
   * @param issueId - The ID of the issue to retrieve links for.
   * @param params.fields - A list of IssueLink attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Specifies the maximum number of entries to return in the response.
   * @param params.$skip - Optional. Specifies the number of entities to skip before returning the first one.
   * @returns A promise that resolves to the list of issue links.
   */
  async getIssueLinks<TSchema extends IssueLinkSchema>(
    issueId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<IssueLinkEntity<TSchema>[]> {
    return this.fetch<IssueLinkEntity<TSchema>[]>(
      ...new RequestBuilder(`api/issues/${issueId}/links`, { fields, ...queryParams("$top", "$skip") }, params).get(),
    )
  }

  /**
   * Get the data for a specific link of the issue.
   * @param issueId - The ID of the issue.
   * @param linkId - The database ID of the issue link.
   * @param params.fields - A list of IssueLink attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the issue link data.
   */
  async getIssueLinkById<TSchema extends IssueLinkSchema>(
    issueId: string,
    linkId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueLinkEntity<TSchema>> {
    return this.fetch<IssueLinkEntity<TSchema>>(
      ...new RequestBuilder(`api/issues/${issueId}/links/${linkId}`, { fields }, params).get(),
    )
  }

  /**
   * Get all issues that are linked to the current one with this link type.
   * @param issueId - The ID of the issue.
   * @param linkId - The database ID of the link type.
   * @param params.fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.top - Optional. Specifies the maximum number of entries that are returned in the response.
   * @param params.skip - Optional. Lets you set a number of returned entities to skip before returning the first one.
   * @returns A promise that resolves to the list of linked issues.
   */
  async getLinkedIssues<TSchema extends IssueSchema>(
    issueId: string,
    linkId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<IssueEntity<TSchema>[]> {
    return this.fetch<IssueEntity<TSchema>[]>(
      ...new RequestBuilder(
        `api/issues/${issueId}/links/${linkId}/issues`,
        {
          fields,
          ...queryParams("$skip", "$top"),
        },
        params,
      ).get(),
    )
  }

  /**
   * Link the current issue to another issue.
   * @param issueId - The ID of the current issue.
   * @param linkId - The database ID of the link type (with direction markers if applicable).
   * @param body - Required fields: id - the database ID of the issue you're linking to the current one.
   * @param params.fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set to true to avoid sending notifications for this update.
   * @returns A promise that resolves to the updated issue.
   */
  async linkIssue<TSchema extends IssueSchema>(
    issueId: string,
    linkId: string,
    body: { linkedIssueId: string } & Partial<Omit<IssueLink, "id">>,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<IssueEntity<TSchema>> {
    return this.fetch<IssueEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/links/${linkId}/issues`,
        {
          fields,
          muteUpdateNotifications: "boolean",
        },
        params,
      ).post(body),
    )
  }

  /**
   * Delete the link between issues.
   * @param issueId - The ID of the current issue.
   * @param linkId - The database ID of the link type (with direction markers if applicable).
   * @param linkedIssueId - The database ID of the issue to unlink from the current one.
   * @param params.fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the updated issue.
   */
  async unlinkIssue<TSchema extends IssueSchema>(
    issueId: string,
    linkId: string,
    linkedIssueId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueEntity<TSchema>> {
    return this.fetch<IssueEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/links/${linkId}/issues/${linkedIssueId}`,
        {
          fields,
        },
        params,
      ).delete(),
    )
  }

  /**
   * Get the project to which the issue belongs.
   * @param issueId - The ID of the issue.
   * @param params.fields - A list of Project attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the project.
   */
  async getIssueProject<TSchema extends ProjectSchema>(
    issueId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ProjectEntity<TSchema>> {
    return this.fetch<ProjectEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/project`,
        {
          fields,
        },
        params,
      ).get(),
    )
  }

  /**
   * Change the project of the issue. That is, move the issue to another project.
   * @param issueId - The ID of the issue to be moved.
   * @param body - Required fields: id - the database ID of the project.
   * @param params.fields - A list of Project attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set this to true if no notifications should be sent on changes made by this request. This doesn't mute notifications sent by any workflow rules. Requires Apply Commands Silently permission.
   * @returns A promise that resolves to the updated project.
   */
  async changeIssueProject<TSchema extends ProjectSchema>(
    issueId: string,
    body: { id: string },
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<ProjectEntity<TSchema>> {
    return this.fetch<ProjectEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/project`,
        {
          fields,
          muteUpdateNotifications: "boolean",
        },
        params,
      ).post(body),
    )
  }

  /**
   * Get the list of sprints where the issue belongs.
   * @param issueId - The ID of the issue for which to get the sprints.
   * @param params.fields - A list of Sprint attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$skip - Optional. Set the number of returned entities to skip before returning the first one.
   * @param params.$top - Optional. Specify the maximum number of entries to return in the response. If not set, the server limits the number of returned entries.
   * @returns A promise that resolves to the list of sprints associated with the issue.
   */
  async getIssueSprints<TSchema extends SprintSchema>(
    issueId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<SprintEntity<TSchema>[]> {
    return this.fetch<SprintEntity<TSchema>[]>(
      ...new RequestBuilder(
        `api/issues/${issueId}/sprints`,
        {
          fields,
          ...queryParams("$skip", "$top"),
        },
        params,
      ).get(),
    )
  }

  /**
   * Get all tags added to the issue that are visible to the current user.
   * @param issueId - The ID of the issue for which to get the tags.
   * @param params.fields - A list of Tag attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$skip - Optional. Set the number of returned entities to skip before returning the first one.
   * @param params.$top - Optional. Specify the maximum number of entries to return in the response. If not set, the server limits the number of returned entries.
   * @returns A promise that resolves to the list of tags associated with the issue.
   */
  async getIssueTags<TSchema extends TagSchema>(
    issueId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<TagEntity<TSchema>[]> {
    return this.fetch<TagEntity<TSchema>[]>(
      ...new RequestBuilder(
        `api/issues/${issueId}/tags`,
        {
          fields,
          ...queryParams("$top", "$skip"),
        },
        params,
      ).get(),
    )
  }

  /**
   * Tag the issue with an existing tag.
   * @param issueId - The ID of the issue to tag.
   * @param body - Required fields: id - the id of the tag to add to the issue.
   * @param params.fields - A list of Tag attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the tagged issue with the specified tag.
   */
  async addTagToIssue<TSchema extends TagSchema>(
    issueId: string,
    body: { id: string },
    params?: FieldsParam<TSchema>,
  ): Promise<TagEntity<TSchema>> {
    return this.fetch<TagEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/tags`,
        {
          fields,
        },
        params,
      ).post(body),
    )
  }

  /**
   * Read a specific tag added to the issue.
   * @param issueId - The ID of the issue.
   * @param tagId - The ID of the tag to retrieve.
   * @param params.fields - A list of Tag attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the specified tag on the issue.
   */
  async getIssueTagById<TSchema extends TagSchema>(
    issueId: string,
    tagId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<TagEntity<TSchema>> {
    return this.fetch<TagEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/tags/${tagId}`,
        {
          fields,
        },
        params,
      ).get(),
    )
  }

  /**
   * Remove a specific tag from the issue.
   * @param issueId - The ID of the issue.
   * @param tagId - The ID of the tag to remove.
   * @param params.fields - A list of Tag attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the response after removing the tag.
   */
  async deleteIssueTag<TSchema extends TagSchema>(
    issueId: string,
    tagId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<TagEntity<TSchema>> {
    return this.fetch<TagEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/tags/${tagId}`,
        {
          fields,
        },
        params,
      ).delete(),
    )
  }

  /**
   * Get work items of an issue and time tracking status.
   * @param issueId - The ID of the issue.
   * @param params.fields - A list of IssueTimeTracking attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the time tracking data for the issue.
   */
  async getIssueTimeTracking<TSchema extends IssueTimeTrackingSchema>(
    issueId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueTimeTrackingEntity<TSchema>> {
    return this.fetch<IssueTimeTrackingEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/timeTracking`,
        {
          fields,
        },
        params,
      ).get(),
    )
  }

  /**
   * Get the list of all work items of the specific issue.
   * @param issueId - The ID of the issue.
   * @param params - Optional parameters.
   * @param params.fields - A list of IssueWorkItem attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Specifies the maximum number of entries to return. If not provided, the server limits the number of entries.
   * @param params.$skip - Optional. Specifies the number of entries to skip before returning the first one.
   * @returns A promise that resolves to the list of work items for the issue.
   */
  async getIssueWorkItems<TSchema extends IssueWorkItemSchema>(
    issueId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<IssueWorkItemEntity<TSchema>[]> {
    return this.fetch<IssueWorkItemEntity<TSchema>[]>(
      ...new RequestBuilder(
        `api/issues/${issueId}/timeTracking/workItems`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Add a new work item to the issue.
   * @param issueId - The ID of the issue.
   * @param body - The work item details including duration.
   * @param params - Optional parameters.
   * @param params.fields - A list of IssueWorkItem attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set to true if no notifications should be sent on changes made by this request. This doesn't mute notifications sent by any workflow rules.
   * @returns A promise that resolves to the added work item.
   */
  async createIssueWorkItem<TSchema extends IssueWorkItemSchema>(
    issueId: string,
    body: { duration: number } & Partial<Omit<IssueWorkItem, "id">>,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<IssueWorkItemEntity<TSchema>> {
    return this.fetch<IssueWorkItemEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/timeTracking/workItems`,
        {
          fields,
          muteUpdateNotifications: "boolean",
        },
        params,
      ).post(body),
    )
  }

  /**
   * Get a specific work item of the issue.
   * @param issueId - The ID of the issue.
   * @param workItemId - The ID of the work item to retrieve.
   * @param params - Optional parameters.
   * @param params.fields - A list of IssueWorkItem attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the specific work item.
   */
  async getIssueWorkItemById<TSchema extends IssueWorkItemSchema>(
    issueId: string,
    workItemId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueWorkItemEntity<TSchema>> {
    return this.fetch<IssueWorkItemEntity<TSchema>>(
      ...new RequestBuilder(`api/issues/${issueId}/timeTracking/workItems/${workItemId}`, { fields }, params).get(),
    )
  }

  /**
   * Update a specific work item of the issue.
   * @param issueId - The ID of the issue.
   * @param workItemId - The ID of the work item to update.
   * @param body - The update payload for the work item.
   * @param params - Optional parameters.
   * @param params.fields - A list of IssueWorkItem attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set this to true if no notifications should be sent on changes made by this request. This doesn't mute notifications sent by any workflow rules.
   * @returns A promise that resolves to the updated work item.
   */
  async updateWorkItem<TSchema extends IssueWorkItemSchema>(
    issueId: string,
    workItemId: string,
    body: Partial<IssueWorkItem>,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<IssueWorkItemEntity<TSchema>> {
    return this.fetch<IssueWorkItemEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/timeTracking/workItems/${workItemId}`,
        { fields, muteUpdateNotifications: "boolean" },
        params,
      ).post(body),
    )
  }

  /**
   * Delete the specific work item in the issue.
   * @param issueId - The ID of the issue.
   * @param workItemId - The ID of the work item to delete.
   * @param params - Optional parameters.
   * @param params.fields - A list of IssueWorkItem attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the response of the deletion request.
   */
  async deleteIssueWorkItem<TSchema extends IssueWorkItemSchema>(
    issueId: string,
    workItemId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueWorkItemEntity<TSchema>> {
    return this.fetch<IssueWorkItemEntity<TSchema>>(
      ...new RequestBuilder(`api/issues/${issueId}/timeTracking/workItems/${workItemId}`, { fields }, params).delete(),
    )
  }

  /**
   * Get all accessible VCS changes linked to the specific issue.
   * @param issueId - The ID of the issue.
   * @param params - Optional parameters.
   * @param params.fields - A list of VcsChange attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Lets you specify the maximum number of entries that are returned in the response.
   * @param params.$skip - Optional. Lets you set a number of returned entities to skip before returning the first one.
   * @returns A promise that resolves to the list of VCS changes linked to the issue.
   */
  async getIssueVcsChanges<TSchema extends VcsChangeSchema>(
    issueId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<VcsChangeEntity<TSchema>[]> {
    return this.fetch<VcsChangeEntity<TSchema>[]>(
      ...new RequestBuilder(
        `api/issues/${issueId}/vcsChanges`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Link a new VCS change to an issue with a specific ID.
   * @param issueId - The ID of the issue.
   * @param vcsChange - The VCS change details.
   * @param params - Optional parameters.
   * @param params.fields - A list of VcsChange attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set to true if no notifications should be sent on issue changes caused by this request. Requires Apply Commands Silently permission.
   * @returns A promise that resolves to the linked VCS change.
   */
  async linkIssueVcsChange<TSchema extends VcsChangeSchema>(
    issueId: string,
    body: {
      version: string // Required. The version of the VCS change.
      state: string // Required. The state of the VCS change.
    },
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<VcsChangeEntity<TSchema>> {
    return this.fetch<VcsChangeEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/vcsChanges`,
        { fields, muteUpdateNotifications: "boolean" },
        params,
      ).post(body),
    )
  }

  /**
   * Read a VCS change with a specific ID.
   * @param issueId - The ID of the issue.
   * @param changeId - The database ID of the VCS change.
   * @param params - Optional parameters.
   * @param params.fields - A list of VcsChange attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the requested VCS change.
   */
  async getIssueVcsChangeById<TSchema extends VcsChangeSchema>(
    issueId: string,
    changeId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<VcsChangeEntity<TSchema>> {
    return this.fetch<VcsChangeEntity<TSchema>>(
      ...new RequestBuilder(`api/issues/${issueId}/vcsChanges/${changeId}`, { fields }, params).get(),
    )
  }

  /**
   * Update the state of an existing VCS change in a specific issue.
   * @param issueId - The ID of the issue.
   * @param changeId - The database ID of the VCS change.
   * @param body - Object containing the updated state of the VCS change.
   * @param params - Optional parameters.
   * @param params.fields - A list of VcsChange attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set to true to suppress update notifications. This doesn't mute notifications sent by workflow rules.
   * @returns A promise that resolves to the updated VCS change.
   */
  async updateIssueVcsChange<TSchema extends VcsChangeSchema>(
    issueId: string,
    changeId: string,
    body: { state: string },
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<VcsChangeEntity<TSchema>> {
    return this.fetch<VcsChangeEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/vcsChanges/${changeId}`,
        { fields, muteUpdateNotifications: "boolean" },
        params,
      ).post(body),
    )
  }

  /**
   * Detach a specific VCS change from a specific issue.
   * @param issueId - The ID of the issue.
   * @param changeId - The database ID of the VCS change.
   * @param params - Optional parameters.
   * @param params.fields - A list of VcsChange attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves once the VCS change is detached.
   */
  async detachIssueVcsChange<TSchema extends VcsChangeSchema>(
    issueId: string,
    changeId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<VcsChangeEntity<TSchema>> {
    return this.fetch<VcsChangeEntity<TSchema>>(
      ...new RequestBuilder(`api/issues/${issueId}/vcsChanges/${changeId}`, { fields }, params).delete(),
    )
  }
}
