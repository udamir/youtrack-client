import type { Entity, FieldsParam, ListParams, Schema } from "../types"
import { fields, arrayParams } from "../utils/fetchHelpers"
import type { IssueEntity, IssueSchema } from "./Issues"
import { RequestBuilder } from "../utils/queryBuilder"
import type { Tag } from "../types/entities/Tag"
import { ResourceApi } from "./common"

export type TagSchema = Schema<Tag>
export type TagEntity<TSchema extends TagSchema> = Entity<Tag, TSchema>

export type GetTagsParams<TFields extends Schema<Tag>> = ListParams &
  FieldsParam<TFields> & {
    query?: string
  }

export class TagsApi extends ResourceApi {
  /**
   * Get all tags that are visible to the current user.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of Tag attributes to include in the response. If not specified, only the entityId is returned.
   * @param params.$skip - The number of entries to skip in the response. Useful for pagination.
   * @param params.$top - The maximum number of entries to return. If not specified, the server limits the number of entries returned.
   * @param params.query - A search query to filter the list of tags by name. For more details on query syntax, see Query Syntax.
   * @returns A list of tags visible to the current user that match the specified criteria.
   */
  async getTags<TSchema extends TagSchema>(
    params?: ListParams & FieldsParam<TSchema> & { query?: string },
  ): Promise<TagEntity<TSchema>[]> {
    return this.fetch<TagEntity<TSchema>[]>(
      ...new RequestBuilder(
        "api/tags",
        { fields, $skip: "number", $top: "number", query: "string" },
        params,
      ).get()
    )
  }

  /**
   * Get settings of the tag with the specified Id.
   * @param tagId - The Id of the tag to retrieve.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of Tag attributes to include in the response. If not specified, only the entityId is returned.
   * @returns The details of the specified tag.
   */
  async getTagById<TSchema extends TagSchema>(
    tagId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<TagEntity<TSchema>> {
    return this.fetch<TagEntity<TSchema>>(
      ...new RequestBuilder(`/api/tags/${tagId}`, { fields }, params).get(),
    );
  }

  /**
   * Create a new tag.
   * @param body - The tag details to create. Must include the `name` field.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of Tag attributes to include in the response. If not specified, only the entityID is returned.
   * @returns The newly created tag.
   */
  async createTag<TSchema extends TagSchema>(
    body: Partial<Omit<Tag, 'id'>>,
    params?: FieldsParam<TSchema>,
  ): Promise<TagEntity<TSchema>> {
    return this.fetch<TagEntity<TSchema>>(
      ...new RequestBuilder("api/tags", { fields }, params).post(body),
    )
  }

  /**
   * Update settings of the tag with the specified ID.
   * @param tagId - The database Id of the tag to update.
   * @param body - The updated tag details. Must include any fields that need to be modified.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of Tag attributes to include in the response. If not specified, only the entityId is returned.
   * @returns The updated tag.
   */
  async updateTag<TSchema extends TagSchema>(
    tagId: string,
    body: Partial<Omit<Tag, 'id'>>,
    params?: FieldsParam<TSchema>,
  ): Promise<TagEntity<TSchema>> {
    return this.fetch<TagEntity<TSchema>>(
      ...new RequestBuilder(`/api/tags/${tagId}`, { fields }, params).post(body),
    );
  }

  /**
   * Delete a tag with the specified Id.
   * @param tagId - The database Id of the tag to delete.
   * @param params - Optional parameters for the request.
   * @param params.fields - A comma-separated list of Tag attributes to include in the response. If not specified, only the entityId is returned.
   * @returns The deleted tag.
   */
  async deleteTag<TSchema extends TagSchema>(
    tagId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<TagEntity<TSchema>> {
    return this.fetch<TagEntity<TSchema>>(
      ...new RequestBuilder(`/api/tags/${tagId}`, { fields }, params).delete(),
    );
  }

  /**
   * Get all issues that the specific tag is added to.
   * @param tagId - The database Id of the tag.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of Issue attributes to include in the response. If not specified, only the entityId is returned.
   * @param params.$skip - The number of entries to skip in the response. Useful for pagination.
   * @param params.$top - The maximum number of entries to return. If not specified, the server limits the number of entries returned.
   * @param params.customFields - Specifies the custom fields to show in the response. Can be used multiple times to include multiple custom fields.
   * @returns A list of issues that the specified tag is associated with.
   */
  async getIssuesByTag<TSchema extends IssueSchema>(
    tagId: string,
    params?: ListParams & FieldsParam<TSchema> & { customFields?: string[] },
  ): Promise<IssueEntity<TSchema>[]> {
    return this.fetch<IssueEntity<TSchema>[]>(
      ...new RequestBuilder(
        `/api/tags/${tagId}/issues`,
        {
          fields,
          $skip: "number",
          $top: "number",
          ...arrayParams("customFields"),
        },
        params,
      ).get(),
    );
  }
}
