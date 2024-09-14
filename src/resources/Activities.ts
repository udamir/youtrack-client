import type { ActivityCursorPage, ActivityItem } from "../types/entities/Activity"
import { fields, stringParams, arrayParams, RequestBuilder } from "../utils"
import type { Entity, FieldsParam, ListParams, Schema } from "../types"
import { ResourceApi } from "./common"

type ActivityItemSchema = Schema<ActivityItem>
type ActivityCursorPageSchema = Schema<ActivityCursorPage>

type ActivityItemEntity<TSchema extends ActivityItemSchema> = Entity<ActivityItem, TSchema>
type ActivityCursorPageEntity<TSchema extends ActivityCursorPageSchema> = Entity<ActivityCursorPage, TSchema>

type GetActivitiesParams = {
  categories?: string[]
  reverse?: boolean
  start?: string
  end?: string
  author?: string
  issueQuery?: string
}

type GetActivitiesPageParams = GetActivitiesParams & {
  cursor?: string
  activityId?: string
}

/**
 * This resource provides access to the activities with the possibility to filter them by various parameters.
 * https://www.jetbrains.com/help/youtrack/devportal/resource-api-activities.html
 */
export class ActivitiesApi extends ResourceApi {
  /**
   * Get the list of all available activities.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of ActivityItem attributes to include in the response. If not specified, only the entityID is returned.
   * @param params.$skip - The number of entries to skip in the response. Useful for pagination.
   * @param params.$top - The maximum number of entries to return. If not specified, the server limits the number of entries returned.
   * @param params.categories - Mandatory. Filters returned activities by categories. Can be specified as a single category or a comma-separated list of categories. At least one category must be specified.
   * @param params.reverse - Indicates whether the order of returned activities is from newest to oldest (true) or oldest to newest (false). Default is false.
   * @param params.start - Timestamp in milliseconds indicating the start of the time interval. If not set, defaults to 0.
   * @param params.end - Timestamp in milliseconds indicating the end of the time interval. If not set, defaults to Long.MAX_VALUE.
   * @param params.author - Filters activities by author. Can be specified as the database ID, login, Hub ID, or "me" for the currently logged in user.
   * @param params.issueQuery - Issue search query to filter activities related to specific issues.
   * @returns A list of activities matching the specified criteria.
   */
  async getActivities<TSchema extends ActivityItemSchema>(
    params?: ListParams & FieldsParam<TSchema> & GetActivitiesParams,
  ): Promise<ActivityItemEntity<TSchema>[]> {
    return this.fetch<ActivityItemEntity<TSchema>[]>(
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

  /**
   * Get information about a specific activity item.
   * @param itemId - The ID of the activity item to retrieve.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of ActivityItem attributes to include in the response. If not specified, only the entityID is returned.
   * @returns The details of the specified activity item.
   */
  async getActivityById<TSchema extends ActivityItemSchema>(
    itemId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ActivityItemEntity<TSchema>> {
    return this.fetch<ActivityItemEntity<TSchema>>(
      ...new RequestBuilder(`/api/activities/${itemId}`, { fields }, params).get(),
    )
  }

  /**
   * Read a page of activities.
   * @param params - Parameters for the request.
   * @param params.fields - A comma-separated list of ActivityCursorPage attributes to include in the response. If not specified, only the entityID is returned.
   * @param params.categories - Mandatory. Filters returned activities by one or more categories. At least one category must be specified.
   * @param params.reverse - Indicates whether the order of returned activities is from newest to oldest (true) or oldest to newest (false). Default is false.
   * @param params.start - Timestamp in milliseconds indicating the start of the time interval. Defaults to 0 if not provided.
   * @param params.end - Timestamp in milliseconds indicating the end of the time interval. Defaults to Long.MAX_VALUE if not provided.
   * @param params.author - Filters activities by author. Can be specified as the database ID, login, Hub ID, or "me" for the currently logged in user.
   * @param params.issueQuery - Filters activities related to specific issues using a search query.
   * @param params.cursor - Used for pagination. Indicates the position in the activity collection to start the next page. Cursors should be taken from previous responses.
   * @param params.activityId - ID of an activity to be included in the middle of the page. Helps to start the page from a specific activity.
   * @returns A page of activities with pagination support, including cursors for navigation.
   */
  async getActivitiesPage<TSchema extends ActivityCursorPageSchema>(
    params: GetActivitiesPageParams & FieldsParam<TSchema>,
  ): Promise<ActivityCursorPageEntity<TSchema>> {
    // Perform the fetch request
    return this.fetch<ActivityCursorPageEntity<TSchema>>(
      ...new RequestBuilder(
        "/api/activitiesPage",
        {
          fields,
          reverse: "boolean",
          ...arrayParams("categories"),
          ...stringParams("author", "start", "end", "issueQuery", "cursor", "activityId"),
        },
        params,
      ).get(),
    )
  }
}
