import type { Entity, FieldsParam, ListParams, MuteUpdateNotificationsParam, Schema, VcsChange } from "../types"
import { fields, queryParams, RequestBuilder } from "../utils"
import { ResourceApi } from "./common"

type VcsChangeSchema = Schema<VcsChange>
type VcsChangeEntity<TSchema extends VcsChangeSchema> = Entity<VcsChange, TSchema>

/**
 * Resource that provides access to issues.
 * https://www.jetbrains.com/help/youtrack/devportal/resource-api-issues.html
 */
export class IssueVcsChangesApi extends ResourceApi {
  /**
   * Get all accessible VCS changes linked to the specific issue.
   * @param issueId - The ID of the issue.
   * @param params - Optional parameters.
   * @param params.fields - A list of VcsChange attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Lets you specify the maximum number of entries that are returned in the response.
   * @param params.$skip - Optional. Lets you set a number of returned entities to skip before returning the first one.
   * @returns A promise that resolves to the list of VCS changes linked to the issue.
   */
  async getIssueVcsChanges<TSchema extends VcsChangeSchema>(
    issueId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<VcsChangeEntity<TSchema>[]> {
    return this.youtrack.fetch<VcsChangeEntity<TSchema>[]>(
      new RequestBuilder(`api/issues/${issueId}/vcsChanges`, { fields, ...queryParams("$top", "$skip") }, params).get(),
    )
  }

  /**
   * Link a new VCS change to an issue with a specific ID.
   * @param issueId - The ID of the issue.
   * @param vcsChange - The VCS change details.
   * @param params - Optional parameters.
   * @param params.fields - A list of VcsChange attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set to true if no notifications should be sent on issue changes caused by this request. Requires Apply Commands Silently permission.
   * @returns A promise that resolves to the linked VCS change.
   */
  async linkIssueVcsChange<TSchema extends VcsChangeSchema>(
    issueId: string,
    body: {
      version: string // Required. The version of the VCS change.
      state: string // Required. The state of the VCS change.
    },
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<VcsChangeEntity<TSchema>> {
    return this.youtrack.fetch<VcsChangeEntity<TSchema>>(
      new RequestBuilder(
        `api/issues/${issueId}/vcsChanges`,
        { fields, muteUpdateNotifications: "boolean" },
        params,
      ).post(body),
    )
  }

  /**
   * Read a VCS change with a specific ID.
   * @param issueId - The ID of the issue.
   * @param changeId - The database ID of the VCS change.
   * @param params - Optional parameters.
   * @param params.fields - A list of VcsChange attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the requested VCS change.
   */
  async getIssueVcsChangeById<TSchema extends VcsChangeSchema>(
    issueId: string,
    changeId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<VcsChangeEntity<TSchema>> {
    return this.youtrack.fetch<VcsChangeEntity<TSchema>>(
      new RequestBuilder(`api/issues/${issueId}/vcsChanges/${changeId}`, { fields }, params).get(),
    )
  }

  /**
   * Update the state of an existing VCS change in a specific issue.
   * @param issueId - The ID of the issue.
   * @param changeId - The database ID of the VCS change.
   * @param body - Object containing the updated state of the VCS change.
   * @param params - Optional parameters.
   * @param params.fields - A list of VcsChange attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set to true to suppress update notifications. This doesn't mute notifications sent by workflow rules.
   * @returns A promise that resolves to the updated VCS change.
   */
  async updateIssueVcsChange<TSchema extends VcsChangeSchema>(
    issueId: string,
    changeId: string,
    body: { state: string },
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<VcsChangeEntity<TSchema>> {
    return this.youtrack.fetch<VcsChangeEntity<TSchema>>(
      new RequestBuilder(
        `api/issues/${issueId}/vcsChanges/${changeId}`,
        { fields, muteUpdateNotifications: "boolean" },
        params,
      ).post(body),
    )
  }

  /**
   * Detach a specific VCS change from a specific issue.
   * @param issueId - The ID of the issue.
   * @param changeId - The database ID of the VCS change.
   * @param params - Optional parameters.
   * @param params.fields - A list of VcsChange attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves once the VCS change is detached.
   */
  async detachIssueVcsChange<TSchema extends VcsChangeSchema>(
    issueId: string,
    changeId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<VcsChangeEntity<TSchema>> {
    return this.youtrack.fetch<VcsChangeEntity<TSchema>>(
      new RequestBuilder(`api/issues/${issueId}/vcsChanges/${changeId}`, { fields }, params).delete(),
    )
  }
}
