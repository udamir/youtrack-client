import type {
  Article,
  ArticleAttachment,
  ArticleComment,
  DeepPartial,
  Entity,
  FieldsParam,
  ListParams,
  MuteUpdateNotificationsParam,
  Reaction,
  Schema,
  Tag,
} from "../types"
import { fields, queryParams, RequestBuilder } from "../utils"
import { ResourceApi } from "./common"

type ArticleSchema = Schema<Article>
type ArticleCommentSchema = Schema<ArticleComment>
type ArticleAttachmentSchema = Schema<ArticleAttachment>
type ReactionSchema = Schema<Reaction>
type TagSchema = Schema<Tag>

type ArticleEntity<TSchema extends ArticleSchema> = Entity<Article, TSchema>
type ArticleCommentEntity<TSchema extends ArticleCommentSchema> = Entity<ArticleComment, TSchema>
type ArticleAttachmentEntity<TSchema extends ArticleAttachmentSchema> = Entity<ArticleAttachment, TSchema>
type ReactionEntity<TSchema extends ReactionSchema> = Entity<Reaction, TSchema>
type TagEntity<TSchema extends TagSchema> = Entity<Tag, TSchema>

/**
 * This resource lets you access articles in the YouTrack knowledge base.
 * https://www.jetbrains.com/help/youtrack/devportal/resource-api-articles.html
 */
export class ArticlesApi extends ResourceApi {
  /**
   * Gets all articles.
   * @param params.fields - A list of Article attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Specifies the maximum number of entries that are returned in the response.
   * @param params.$skip - Optional. Specifies the number of returned entities to skip before returning the first one.
   * @returns The list of articles.
   */
  async getArticles<TSchema extends ArticleSchema>(
    params?: ListParams & FieldsParam<TSchema>,
  ): Promise<ArticleEntity<TSchema>[]> {
    return this.youtrack.fetch<ArticleEntity<TSchema>[]>(
      new RequestBuilder("api/articles", { fields, ...queryParams("$top", "$skip") }, params).get(),
    )
  }

  /**
   * Creates a new article.
   * @param body - Required fields: id (the database ID of the article to be linked as a sub-article).
   * @param params.fields - A list of Article attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.draftId - ID of a draft to publish as a new article. If no draftId is provided, the article is created from scratch. In this case, you must specify the project in the request payload.
   * @param params.muteUpdateNotifications - Set to true if no notifications should be sent on changes made by this request.
   * @returns The created article.
   */
  async createArticle<TSchema extends ArticleSchema>(
    body: { id: string } | Partial<Article>,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam & { draftId?: string },
  ): Promise<ArticleEntity<TSchema>> {
    return this.youtrack.fetch<ArticleEntity<TSchema>>(
      new RequestBuilder("api/articles", { fields, ...queryParams("muteUpdateNotifications", "draftId") }, params).post(
        body,
      ),
    )
  }

  /**
   * Reads an article with a specific ID.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param params.fields - A list of Article attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The requested article.
   */
  async getArticle<TSchema extends ArticleSchema>(
    articleId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ArticleEntity<TSchema>> {
    return this.youtrack.fetch<ArticleEntity<TSchema>>(
      new RequestBuilder(`api/articles/${articleId}`, { fields }, params).get(),
    )
  }

  /**
   * Updates a single article.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param body - The updated article data.
   * @param params.fields - A list of Article attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set this parameter to true if no notifications should be sent on changes made by this request. This doesn't mute notifications sent by any workflow rules. Using this parameter requires Apply Commands Silently permission in all projects affected by the request.
   * @returns The updated article.
   */
  async updateArticle<TSchema extends ArticleSchema>(
    articleId: string,
    body: DeepPartial<Article>,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<ArticleEntity<TSchema>> {
    return this.youtrack.fetch<ArticleEntity<TSchema>>(
      new RequestBuilder(`api/articles/${articleId}`, { fields, muteUpdateNotifications: "string" }, params).post(body),
    )
  }

  /**
   * Deletes an article. Note that this operation cannot be undone.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param params.fields - A list of Article attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The deleted article.
   */
  async deleteArticle<TSchema extends ArticleSchema>(
    articleId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ArticleEntity<TSchema>> {
    return this.youtrack.fetch<ArticleEntity<TSchema>>(
      new RequestBuilder(`api/articles/${articleId}`, { fields }, params).delete(),
    )
  }

  /**
   * Gets a list of all attachments to a specific article.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param params.fields - A list of ArticleAttachment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Specifies the maximum number of entries that are returned in the response.
   * @param params.$skip - Optional. Specifies the number of returned entities to skip before returning the first one.
   * @returns The list of attachments for the specified article.
   */
  async getArticleAttachments<TSchema extends ArticleAttachmentSchema>(
    articleId: string,
    params?: ListParams & FieldsParam<TSchema>,
  ): Promise<ArticleAttachmentEntity<TSchema>[]> {
    return this.youtrack.fetch<ArticleAttachmentEntity<TSchema>[]>(
      new RequestBuilder(
        `api/articles/${articleId}/attachments`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Adds an attachment to the article.
   * @param articleId - ID of the article to which the attachment will be added. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param body - A FormData object with attachment data.
   * @param params.fields - A list of ArticleAttachment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set to true if no notifications should be sent on changes made by this request.
   * @returns The added attachment.
   */
  async createArticleAttachment<TSchema extends ArticleAttachmentSchema>(
    articleId: string,
    body: FormData,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<ArticleAttachmentEntity<TSchema>> {
    return this.youtrack.fetch<ArticleAttachmentEntity<TSchema>>(
      new RequestBuilder(
        `api/articles/${articleId}/attachments`,
        { fields, muteUpdateNotifications: "string" },
        params,
      ).postFile(body),
    )
  }

  /**
   * Reads a specific attachment in the article.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param attachmentId - The database ID of the attachment.
   * @param params.fields - A list of ArticleAttachment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The requested article attachment.
   */
  async getArticleAttachment<TSchema extends ArticleAttachmentSchema>(
    articleId: string,
    attachmentId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ArticleAttachmentEntity<TSchema>> {
    return this.youtrack.fetch<ArticleAttachmentEntity<TSchema>>(
      new RequestBuilder(`api/articles/${articleId}/attachments/${attachmentId}`, { fields }, params).get(),
    )
  }

  /**
   * Updates a specific attachment in the article.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param attachmentId - The database ID of the attachment.
   * @param body - The fields of the attachment to update.
   * @param params.fields - A list of ArticleAttachment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The updated article attachment.
   */
  async updateArticleAttachment<TSchema extends ArticleAttachmentSchema>(
    articleId: string,
    attachmentId: string,
    body: DeepPartial<ArticleAttachment>,
    params?: FieldsParam<TSchema>,
  ): Promise<ArticleAttachmentEntity<TSchema>> {
    return this.youtrack.fetch<ArticleAttachmentEntity<TSchema>>(
      new RequestBuilder(`api/articles/${articleId}/attachments/${attachmentId}`, { fields }, params).post(body),
    )
  }

  /**
   * Deletes a specific attachment from the article.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param attachmentId - The database ID of the attachment.
   * @param params.fields - A list of ArticleAttachment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The deleted article attachment.
   */
  async deleteArticleAttachment<TSchema extends ArticleAttachmentSchema>(
    articleId: string,
    attachmentId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<void> {
    return this.youtrack.fetch<void>(
      new RequestBuilder(`api/articles/${articleId}/attachments/${attachmentId}`, { fields }, params).delete(),
    )
  }

  /**
   * Gets the list of sub-articles of the current article.
   * @param articleId - ID of the parent article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param params.fields - A list of Article attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Specifies the maximum number of entries that are returned in the response.
   * @param params.$skip - Optional. Specifies the number of returned entities to skip before returning the first one.
   * @returns The list of sub-articles.
   */
  async getChildArticles<TSchema extends ArticleSchema>(
    articleId: string,
    params?: ListParams & FieldsParam<TSchema>,
  ): Promise<ArticleEntity<TSchema>[]> {
    return this.youtrack.fetch<ArticleEntity<TSchema>[]>(
      new RequestBuilder(
        `api/articles/${articleId}/childArticles`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Adds a new sub-article to the current article.
   * @param articleId - ID of the parent article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param body - Contains the ID of the sub-article to be linked.
   * @param params.fields - A list of Article attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Optional. Set to true to mute notifications sent on changes made by this request.
   * @returns The updated parent article with the sub-article.
   */
  async addChildArticle<TSchema extends ArticleSchema>(
    articleId: string,
    body: { id: string } | Partial<Article>,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<ArticleEntity<TSchema>> {
    return this.youtrack.fetch<ArticleEntity<TSchema>>(
      new RequestBuilder(
        `api/articles/${articleId}/childArticles`,
        { fields, ...queryParams("muteUpdateNotifications") },
        params,
      ).post(body),
    )
  }

  /**
   * Gets a specific sub-article of the current article.
   * @param articleId - Id of the parent article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param subArticleId - Id of the sub-article to retrieve.
   * @param params.fields - A list of Article attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The requested sub-article.
   */
  async getChildArticle<TSchema extends ArticleSchema>(
    articleId: string,
    subArticleId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ArticleEntity<TSchema>> {
    return this.youtrack.fetch<ArticleEntity<TSchema>>(
      new RequestBuilder(`api/articles/${articleId}/childArticles/${subArticleId}`, { fields }, params).get(),
    )
  }

  /**
   * Updates a specific sub-article.
   * @param articleId - ID of the parent article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param subArticleId - ID of the sub-article to update.
   * @param body - The updated sub-article content.
   * @param params.fields - A list of Article attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set to true if no notifications should be sent on changes made by this request.
   * @returns The updated sub-article.
   */
  async updateChildArticle<TSchema extends ArticleSchema>(
    articleId: string,
    subArticleId: string,
    body: DeepPartial<Article>,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<ArticleEntity<TSchema>> {
    return this.youtrack.fetch<ArticleEntity<TSchema>>(
      new RequestBuilder(
        `api/articles/${articleId}/childArticles/${subArticleId}`,
        { fields, muteUpdateNotifications: "boolean" },
        params,
      ).post(body),
    )
  }

  /**
   * Removes the parent-child link between the specific sub-article and the current article.
   * This operation does not delete the specified sub-article.
   * @param articleId - ID of the parent article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param subArticleId - ID of the sub-article to unlink.
   * @param params.fields - A list of Article attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The unlinked sub-article entity.
   */
  async removeChildArticleLink<TSchema extends ArticleSchema>(
    articleId: string,
    subArticleId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ArticleEntity<TSchema>> {
    return this.youtrack.fetch<ArticleEntity<TSchema>>(
      new RequestBuilder(`api/articles/${articleId}/childArticles/${subArticleId}`, { fields }, params).delete(),
    )
  }

  /**
   * Gets all accessible comments to a specific article.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param params.fields - A list of ArticleComment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Specifies the maximum number of entries that are returned in the response.
   * @param params.$skip - Optional. Specifies the number of returned entities to skip before returning the first one.
   * @returns The list of article comments.
   */
  async getArticleComments<TSchema extends ArticleCommentSchema>(
    articleId: string,
    params?: ListParams & FieldsParam<TSchema>,
  ): Promise<ArticleCommentEntity<TSchema>[]> {
    return this.youtrack.fetch<ArticleCommentEntity<TSchema>[]>(
      new RequestBuilder(
        `api/articles/${articleId}/comments`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Adds a new comment to the article.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param body - Required fields: text.
   * @param params.fields - A list of ArticleComment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.draftId - Optional. The ID of an existing draft that should be published.
   * @param params.muteUpdateNotifications - Optional. Set this to true to suppress notifications on changes made by this request.
   * @returns The added comment.
   */
  async createArticleComment<TSchema extends ArticleCommentSchema>(
    articleId: string,
    body: { text: string } | DeepPartial<ArticleComment>,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam & { draftId?: string },
  ): Promise<ArticleCommentEntity<TSchema>> {
    return this.youtrack.fetch<ArticleCommentEntity<TSchema>>(
      new RequestBuilder(
        `api/articles/${articleId}/comments`,
        { fields, ...queryParams("draftId", "muteUpdateNotifications") },
        params,
      ).post(body),
    )
  }

  /**
   * Reads a comment with a specific ID.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param commentId - The database ID of the comment.
   * @param params.fields - A list of ArticleComment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The specified comment.
   */
  async getArticleComment<TSchema extends ArticleCommentSchema>(
    articleId: string,
    commentId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ArticleCommentEntity<TSchema>> {
    return this.youtrack.fetch<ArticleCommentEntity<TSchema>>(
      new RequestBuilder(`api/articles/${articleId}/comments/${commentId}`, { fields }, params).get(),
    )
  }

  /**
   * Updates an existing comment to a specific article.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param commentId - The database ID of the comment.
   * @param body - Comment parameters
   * @param params.fields - A list of ArticleComment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set this parameter to true if no notifications should be sent on changes made by this request.
   * @returns The updated comment.
   */
  async updateArticleComment<TSchema extends ArticleCommentSchema>(
    articleId: string,
    commentId: string,
    body: { text: string } | DeepPartial<ArticleComment>,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<ArticleCommentEntity<TSchema>> {
    return this.youtrack.fetch<ArticleCommentEntity<TSchema>>(
      new RequestBuilder(
        `api/articles/${articleId}/comments/${commentId}`,
        { fields, muteUpdateNotifications: "boolean" },
        params,
      ).post(body),
    )
  }

  /**
   * Deletes an existing comment to a specific article.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param commentId - The database ID of the comment.
   * @param params.fields - A list of ArticleComment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The deleted comment.
   */
  async deleteArticleComment<TSchema extends ArticleCommentSchema>(
    articleId: string,
    commentId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ArticleCommentEntity<TSchema>> {
    return this.youtrack.fetch<ArticleCommentEntity<TSchema>>(
      new RequestBuilder(`api/articles/${articleId}/comments/${commentId}`, { fields }, params).delete(),
    )
  }

  /**
   * Gets all accessible reactions to a specific article comment.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param commentId - The database ID of the comment.
   * @param params.fields - A list of Reaction attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Specifies the maximum number of entries that are returned in the response.
   * @param params.$skip - Optional. Specifies the number of returned entities to skip before returning the first one.
   * @returns The list of reactions to the comment.
   */
  async getArticleCommentReactions<TSchema extends ReactionSchema>(
    articleId: string,
    commentId: string,
    params?: ListParams & FieldsParam<TSchema>,
  ): Promise<ReactionEntity<TSchema>[]> {
    return this.youtrack.fetch<ReactionEntity<TSchema>[]>(
      new RequestBuilder(
        `api/articles/${articleId}/comments/${commentId}/reactions`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Adds a new reaction to a comment with a specific ID.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param commentId - The database ID of the comment.
   * @param body - The reaction paramenters. Required fields: reaction.
   * @param params.fields - A list of Reaction attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The added reaction.
   */
  async createCommentReaction<TSchema extends ReactionSchema>(
    articleId: string,
    commentId: string,
    body: { reaction: string } | DeepPartial<Reaction>,
    params?: FieldsParam<TSchema>,
  ): Promise<ReactionEntity<TSchema>> {
    return this.youtrack.fetch<ReactionEntity<TSchema>>(
      new RequestBuilder(`api/articles/${articleId}/comments/${commentId}/reactions`, { fields }, params).post(body),
    )
  }

  /**
   * Gets a reaction with a specific ID.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param commentId - The database ID of the comment.
   * @param reactionId - The database ID of the reaction.
   * @param params.fields - A list of Reaction attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The specified reaction.
   */
  async getCommnetReaction<TSchema extends ReactionSchema>(
    articleId: string,
    commentId: string,
    reactionId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ReactionEntity<TSchema>> {
    return this.youtrack.fetch<ReactionEntity<TSchema>>(
      new RequestBuilder(
        `api/articles/${articleId}/comments/${commentId}/reactions/${reactionId}`,
        { fields },
        params,
      ).get(),
    )
  }

  /**
   * Removes a reaction from a comment. Only the author of the reaction can remove it.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param commentId - The database ID of the comment.
   * @param reactionId - The database ID of the reaction.
   * @param params.fields - A list of Reaction attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The result of the delete operation.
   */
  async removeCommnetReaction<TSchema extends ReactionSchema>(
    articleId: string,
    commentId: string,
    reactionId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ReactionEntity<TSchema>> {
    return this.youtrack.fetch<ReactionEntity<TSchema>>(
      new RequestBuilder(
        `api/articles/${articleId}/comments/${commentId}/reactions/${reactionId}`,
        { fields },
        params,
      ).delete(),
    )
  }

  /**
   * Gets the article that is the parent for the current one.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param params.fields - A list of Article attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The parent article.
   */
  async getParentArticle<TSchema extends ArticleSchema>(
    articleId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ArticleEntity<TSchema>> {
    return this.youtrack.fetch<ArticleEntity<TSchema>>(
      new RequestBuilder(`api/articles/${articleId}/parentArticle`, { fields }, params).get(),
    )
  }

  /**
   * Gets all tags added to the article that are visible to the current user.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param params.fields - A list of Tag attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Specifies the maximum number of entries that are returned in the response.
   * @param params.$skip - Optional. Specifies the number of returned entities to skip before returning the first one.
   * @returns The list of tags.
   */
  async getArticleTags<TSchema extends TagSchema>(
    articleId: string,
    params?: ListParams & FieldsParam<TSchema>,
  ): Promise<TagEntity<TSchema>[]> {
    return this.youtrack.fetch<TagEntity<TSchema>[]>(
      new RequestBuilder(`api/articles/${articleId}/tags`, { fields, ...queryParams("$top", "$skip") }, params).get(),
    )
  }

  /**
   * Tags the article with an existing tag.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param body - Tag parameters. Required fields: id - the database ID of the tag.
   * @param params.fields - A list of Tag attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The tagged article with updated information.
   */
  async createArticleTag<TSchema extends TagSchema>(
    articleId: string,
    body: { id: string } | DeepPartial<Tag>,
    params?: FieldsParam<TSchema>,
  ): Promise<TagEntity<TSchema>> {
    return this.youtrack.fetch<TagEntity<TSchema>>(
      new RequestBuilder(`api/articles/${articleId}/tags`, { fields }, params).post(body),
    )
  }

  /**
   * Reads a specific tag added to the article.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param tagId - The database ID of the tag.
   * @param params.fields - A list of Tag attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The requested tag.
   */
  async getArticleTag<TSchema extends TagSchema>(
    articleId: string,
    tagId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<TagEntity<TSchema>> {
    return this.youtrack.fetch<TagEntity<TSchema>>(
      new RequestBuilder(`api/articles/${articleId}/tags/${tagId}`, { fields }, params).get(),
    )
  }

  /**
   * Removes a specific tag from the article.
   * @param articleId - ID of the article. You can specify either the database ID (for example, 226-0) or the article ID in the project (for example, NP-A-1).
   * @param tagId - Database ID of the tag.
   * @param params.fields - A list of Tag attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The response after removing the tag.
   */
  async removeArticleTag<TSchema extends TagSchema>(
    articleId: string,
    tagId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<TagEntity<TSchema>> {
    return this.youtrack.fetch<TagEntity<TSchema>>(
      new RequestBuilder(`api/articles/${articleId}/tags/${tagId}`, { fields }, params).delete(),
    )
  }
}
