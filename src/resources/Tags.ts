import type { FetchApi, FieldsParam, FilterFields, ListParams, Schema } from "../types"
import type { GetIssuesParams, IssueFiltered, IssueSchema } from "./Issues"
import { fields, arrayParams } from "../utils/fetchHelpers"
import { RequestBuilder } from "../utils/queryBuilder"
import type { Tag } from "../types/entities/Tag"

export type TagSchema = Schema<Tag>
export type TagFiltered<TSchema extends TagSchema> = FilterFields<Tag, TSchema>

export type GetTagsParams<TFields extends Schema<Tag>> = ListParams &
  FieldsParam<TFields> & {
    query?: string
  }

export class TagsApi {
  constructor(private fetch: FetchApi) {}

  async getList<TSchema extends TagSchema>(params?: GetTagsParams<TSchema>): Promise<TagFiltered<TSchema>[]> {
    return this.fetch<TagFiltered<TSchema>[]>(...new RequestBuilder(
      "api/tags",
      { fields, $skip: "string", $top: "string", query: "string" },
      params,
    ).get())
  }

  async getIssues<TSchema extends IssueSchema>(
    tagId: string,
    params?: GetIssuesParams<TSchema>,
  ): Promise<IssueFiltered<TSchema>[]> {
    return this.fetch<IssueFiltered<TSchema>[]>(...new RequestBuilder(
      `api/tags/${tagId}/issues`,
      { fields, $skip: "string", $top: "string", ...arrayParams("customFields") },
      params,
    ).get())
  }
}
