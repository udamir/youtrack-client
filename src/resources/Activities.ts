import type { FetchApi, FieldsParam, FilterFields, ListParams, Schema } from "../types"
import { fields, stringParams, arrayParams } from "../utils/fetchHelpers"
import type { ActivityItem } from "../types/entities/Activity"
import { RequestBuilder } from "../utils/queryBuilder"

export type ActivityItemSchema = Schema<ActivityItem>
export type ActivityItemFiltered<TSchema extends ActivityItemSchema> = FilterFields<ActivityItem, TSchema>

export type GetActivitiesParams<TFields extends ActivityItemSchema> = ListParams &
  FieldsParam<TFields> & {
    categories?: string[]
    reverse?: boolean
    start?: string
    end?: string
    author?: string
    issueQuery?: string
  }

export class ActivitiesApi {
  constructor(private fetch: FetchApi) {}

  async getActivities<TSchema extends ActivityItemSchema>(
    params?: GetActivitiesParams<TSchema>,
  ): Promise<ActivityItemFiltered<TSchema>[]> {
    return this.fetch<ActivityItemFiltered<TSchema>[]>(
      ...new RequestBuilder(
        "api/activities",
        {
          fields,
          $skip: "number",
          $top: "number",
          reverse: "boolean",
          ...arrayParams("categories"),
          ...stringParams("author", "start", "end", "issueQuery"),
        },
        params,
      ).get(),
    )
  }

  async getActivityById<TSchema extends ActivityItemSchema>(
    id: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ActivityItemFiltered<TSchema>[]> {
    return this.fetch<ActivityItemFiltered<TSchema>[]>(
      ...new RequestBuilder(`/api/activities/${id}`, { fields }, params).get(),
    )
  }
}
