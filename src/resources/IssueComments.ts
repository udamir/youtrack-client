import type {
  Entity,
  FieldsParam,
  ListParams,
  MuteUpdateNotificationsParam,
  Reaction,
  Schema,
  IssueComment,
  DeepPartial,
} from "../types"
import { fields, queryParams, RequestBuilder } from "../utils"
import { ResourceApi } from "./common"

type IssueCommentSchema = Schema<IssueComment>
type ReactionSchema = Schema<Reaction>

type IssueCommentEntity<TSchema extends IssueCommentSchema> = Entity<IssueComment, TSchema>
type ReactionEntity<TSchema extends ReactionSchema> = Entity<Reaction, TSchema>

/**
 * Resource that provides access to issues.
 * https://www.jetbrains.com/help/youtrack/devportal/resource-api-issues.html
 */
export class IssueCommentsApi extends ResourceApi {
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
    body: { text: string } & DeepPartial<IssueComment>,
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
    body: DeepPartial<IssueComment>,
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
}
