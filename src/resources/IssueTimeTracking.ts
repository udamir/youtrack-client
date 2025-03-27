import type {
  Entity,
  FieldsParam,
  IssueWorkItem,
  ListParams,
  MuteUpdateNotificationsParam,
  Schema,
  IssueTimeTracking,
  DeepPartial,
} from "../types"
import { fields, queryParams, RequestBuilder } from "../utils"
import { ResourceApi } from "./common"

type IssueTimeTrackingSchema = Schema<IssueTimeTracking>
type IssueWorkItemSchema = Schema<IssueWorkItem>

type IssueTimeTrackingEntity<TSchema extends IssueTimeTrackingSchema> = Entity<IssueTimeTracking, TSchema>
type IssueWorkItemEntity<TSchema extends IssueWorkItemSchema> = Entity<IssueWorkItem, TSchema>

/**
 * Resource that provides access to issues.
 * https://www.jetbrains.com/help/youtrack/devportal/resource-api-issues.html
 */
export class IssueTimeTrackingApi extends ResourceApi {
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
    return this.youtrack.fetch<IssueTimeTrackingEntity<TSchema>>(
      new RequestBuilder(
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
    return this.youtrack.fetch<IssueWorkItemEntity<TSchema>[]>(
      new RequestBuilder(
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
    body: { duration: { presentation: string } } & DeepPartial<Omit<IssueWorkItem, "duration">>,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<IssueWorkItemEntity<TSchema>> {
    return this.youtrack.fetch<IssueWorkItemEntity<TSchema>>(
      new RequestBuilder(
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
    return this.youtrack.fetch<IssueWorkItemEntity<TSchema>>(
      new RequestBuilder(`api/issues/${issueId}/timeTracking/workItems/${workItemId}`, { fields }, params).get(),
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
    body: DeepPartial<IssueWorkItem>,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<IssueWorkItemEntity<TSchema>> {
    return this.youtrack.fetch<IssueWorkItemEntity<TSchema>>(
      new RequestBuilder(
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
    return this.youtrack.fetch<IssueWorkItemEntity<TSchema>>(
      new RequestBuilder(`api/issues/${issueId}/timeTracking/workItems/${workItemId}`, { fields }, params).delete(),
    )
  }
}
