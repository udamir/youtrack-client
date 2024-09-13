import type { Entity, FieldsParam, ListParams, Schema } from "../types"
import type { GetIssuesParams, IssueEntity, IssueSchema } from "./Issues"
import { fields, arrayParams } from "../utils/fetchHelpers"
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

  async getList<TSchema extends TagSchema>(params?: GetTagsParams<TSchema>): Promise<TagEntity<TSchema>[]> {
    return this.fetch<TagEntity<TSchema>[]>(...new RequestBuilder(
      "api/tags",
      { fields, $skip: "string", $top: "string", query: "string" },
      params,
    ).get())
  }

  async getIssues<TSchema extends IssueSchema>(
    tagId: string,
    params?: GetIssuesParams<TSchema>,
  ): Promise<IssueEntity<TSchema>[]> {
    return this.fetch<IssueEntity<TSchema>[]>(...new RequestBuilder(
      `api/tags/${tagId}/issues`,
      { fields, $skip: "string", $top: "string", ...arrayParams("customFields") },
      params,
    ).get())
  }
}
