import type { Entity, FieldsParam, IssueWorkItem, ListParams, Schema } from "../types"
import { fields, queryParams, RequestBuilder } from "../utils"
import { ResourceApi } from "./common"

type WorkItemSchema = Schema<IssueWorkItem>
type WorkItemEntity<TSchema extends WorkItemSchema> = Entity<IssueWorkItem, TSchema>

/**
 * Resource that provides access to work items.
 * https://www.jetbrains.com/help/youtrack/devportal/resource-api-workItems.html
 */
export class WorkItemsApi extends ResourceApi {
  /**
   * Get all work items that belong to issues that match a search query. If the query is not provided, all work items from all issues are returned.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of IssueWorkItem attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$skip - The number of entries to skip in the response. Useful for pagination.
   * @param params.$top - The maximum number of entries to return. If not specified, the server limits the number of entries returned.
   * @param params.query - Issue search query. For more information, refer to the Search Query Reference.
   * @param params.startDate - The start date of the time interval where the work item dates belong (YYYY-MM-DD).
   * @param params.endDate - The end date of the time interval where the work item dates belong (YYYY-MM-DD).
   * @param params.start - A timestamp in milliseconds indicating the start of the interval where the work item dates belong.
   * @param params.end - A timestamp in milliseconds indicating the end of the interval where the work item dates belong.
   * @param params.createdStart - A timestamp in milliseconds indicating the start of the interval during which work items were created.
   * @param params.createdEnd - A timestamp in milliseconds indicating the end of the interval during which work items were created.
   * @param params.updatedStart - A timestamp in milliseconds indicating the start of the interval during which work items were updated.
   * @param params.updatedEnd - A timestamp in milliseconds indicating the end of the interval during which work items were updated.
   * @param params.author - Filter work items by their author. Can be a user ID, login, Hub ID, or "me" for the currently logged-in user. Use multiple parameters for multiple authors.
   * @param params.creator - Filter work items by their creator. Can be a user ID, login, Hub ID, or "me" for the currently logged-in user. Use multiple parameters for multiple creators.
   * @returns A list of work items that match the specified criteria.
   */
  async getWorkItems<TSchema extends WorkItemSchema>(
    params?: FieldsParam<TSchema> &
      ListParams & {
        query?: string
        startDate?: string
        endDate?: string
        start?: number
        end?: number
        createdStart?: number
        createdEnd?: number
        updatedStart?: number
        updatedEnd?: number
        author?: string
        creator?: string
      },
  ): Promise<WorkItemEntity<TSchema>[]> {
    return this.fetch<WorkItemEntity<TSchema>[]>(
      ...new RequestBuilder(
        "api/workItems",
        {
          fields,
          ...queryParams(
            "$skip",
            "$top",
            "query",
            "startDate",
            "endDate",
            "author",
            "creator",
            "start",
            "end",
            "createdStart",
            "createdEnd",
            "updatedStart",
            "updatedEnd",
          ),
        },
        params,
      ).get(),
    )
  }

  /**
   * Get a specific work item.
   * @param itemId - The database Id of the work item.
   * @param fields - A list of IssueWorkItem attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The specified work item.
   */
  async getWorkItem<TSchema extends WorkItemSchema>(
    itemId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<WorkItemEntity<TSchema>> {
    return this.fetch<WorkItemEntity<TSchema>>(
      ...new RequestBuilder(`api/workItems/${itemId}`, { fields }, params).get(),
    )
  }
}
