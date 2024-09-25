import type { Entity, FieldsParam, ListParams, Schema, Tag } from "../types"
import { fields, queryParams, RequestBuilder } from "../utils"
import { ResourceApi } from "./common"

type TagSchema = Schema<Tag>
type TagEntity<TSchema extends TagSchema> = Entity<Tag, TSchema>

/**
 * Resource that provides access to issues.
 * https://www.jetbrains.com/help/youtrack/devportal/resource-api-issues.html
 */
export class IssueTagsApi extends ResourceApi {
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
    return this.youtrack.fetch<TagEntity<TSchema>[]>(
      new RequestBuilder(
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
    return this.youtrack.fetch<TagEntity<TSchema>>(
      new RequestBuilder(
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
    return this.youtrack.fetch<TagEntity<TSchema>>(
      new RequestBuilder(
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
    return this.youtrack.fetch<TagEntity<TSchema>>(
      new RequestBuilder(
        `api/issues/${issueId}/tags/${tagId}`,
        {
          fields,
        },
        params,
      ).delete(),
    )
  }
}
