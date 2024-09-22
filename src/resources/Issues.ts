import type {
  ActivityCursorPage,
  ActivityItem,
  CustomFieldsParam,
  Entity,
  FieldsParam,
  ListParams,
  MuteUpdateNotificationsParam,
  Project,
  QueryParam,
  Schema,
  Sprint,
  Issue,
  IssueCountResponse,
  IssueCustomField,
  DeepPartial,
} from "../types"
import { fields, queryParams, RequestBuilder } from "../utils"
import { ResourceApi } from "./common"

type IssueSchema = Schema<Issue>
type ActivityItemSchema = Schema<ActivityItem>
type IssueCountResponseSchema = Schema<IssueCountResponse>
type ActivityCursorPageSchema = Schema<ActivityCursorPage>
type IssueCustomFieldSchema = Schema<IssueCustomField>
type ProjectSchema = Schema<Project>
type SprintSchema = Schema<Sprint>

type IssueEntity<TSchema extends IssueSchema> = Entity<Issue, TSchema>
type ActivityItemEntity<TSchema extends ActivityItemSchema> = Entity<ActivityItem, TSchema>
type IssueCountResponseEntity<TSchema extends IssueCountResponseSchema> = Entity<IssueCountResponse, TSchema>
type ActivityCursorPageEntity<TSchema extends ActivityCursorPageSchema> = Entity<ActivityCursorPage, TSchema>
type IssueCustomFieldEntity<TSchema extends IssueCustomFieldSchema> = Entity<IssueCustomField, TSchema>
type ProjectEntity<TSchema extends ProjectSchema> = Entity<Project, TSchema>
type SprintEntity<TSchema extends SprintSchema> = Entity<Sprint, TSchema>

/**
 * Resource that provides access to issues.
 * https://www.jetbrains.com/help/youtrack/devportal/resource-api-issues.html
 */
export class IssuesApi extends ResourceApi {
  /**
   * Get all issues that match the specified query.
   * @param fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Lets you specify the maximum number of entries that are returned in the response. If you don't set the $top value, the server limits the maximum number of returned entries.
   * @param params.$skip - Optional. Lets you set a number of returned entities to skip before returning the first one.
   * @param params.query - Issue search query. Read more about the search syntax here: Search Query Reference.
   * @param params.customFields - The name of the custom field to show in the response. When you use this parameter and request the custom field data in the request URL, the response only shows the requested custom fields instead of all of them.
   * @returns The list of issues that match the specified query.
   */
  async getIssues<TSchema extends IssueSchema>(
    params?: FieldsParam<TSchema> | ListParams | CustomFieldsParam | QueryParam,
  ): Promise<IssueEntity<TSchema>[]> {
    return this.fetch<IssueEntity<TSchema>[]>(
      ...new RequestBuilder(
        "api/issues",
        { fields, ...queryParams("$top", "$skip", "query", "customFields") },
        params,
      ).get(),
    )
  }

  /**
   * Create an issue.
   * @param body - Required fields: summary, project (id). Optional: other issue fields.
   * @param params.fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.draftId - ID of a draft to report as the new issue. If no draftId is provided, the issue is created from scratch. In this case, you must specify the summary and the project in the request payload.
   * @param params.muteUpdateNotifications - Set this parameter to true if no notifications should be sent on changes made by this request. This doesn't mute notifications sent by any workflow rules. Using this parameter requires Apply Commands Silently permission in all projects affected by the request.
   * @returns The created issue.
   */
  async createIssue<TSchema extends IssueSchema>(
    body: { summary: string; project: string } & DeepPartial<Issue>,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam & { draftId?: string },
  ): Promise<IssueEntity<TSchema>> {
    return this.fetch<IssueEntity<TSchema>>(
      ...new RequestBuilder(
        "api/issues",
        { fields, ...queryParams("draftId", "muteUpdateNotifications") },
        params,
      ).post(body),
    )
  }

  /**
   * Read an issue with specific ID.
   * @param issueId - The database ID or project ID of the issue.
   * @param params.fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The requested issue.
   */
  async getIssueById<TSchema extends IssueSchema>(
    issueId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueEntity<TSchema>> {
    return this.fetch<IssueEntity<TSchema>>(...new RequestBuilder(`api/issues/${issueId}`, { fields }, params).get())
  }

  /**
   * Update a single issue.
   * @param issueId - The database ID or project ID of the issue.
   * @param params.fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set to true if no notifications should be sent on changes made by this request.
   * @returns The updated issue.
   */
  async updateIssue<TSchema extends IssueSchema>(
    issueId: string,
    body: DeepPartial<Issue>,
    params: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<IssueEntity<TSchema>> {
    return this.fetch<IssueEntity<TSchema>>(
      ...new RequestBuilder(`api/issues/${issueId}`, { fields, muteUpdateNotifications: "boolean" }, params).post(body),
    )
  }

  /**
   * Delete the issue. Note that this operation cannot be undone.
   * @param issueId - The database ID or project ID of the issue.
   * @param params.fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves when the issue is deleted.
   */
  async deleteIssue<TSchema extends IssueSchema>(
    issueId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueEntity<TSchema>> {
    return this.fetch<IssueEntity<TSchema>>(...new RequestBuilder(`api/issues/${issueId}`, { fields }, params).delete())
  }

  /**
   * Get the number of issues found by a search.
   * @param query - The search query to get the number of issues for.
   * @param fields - A list of IssueCountResponse attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the count of issues.
   */
  async getIssueCount<TSchema extends IssueCountResponseSchema>(
    body: { query: string },
    params?: FieldsParam<TSchema>,
  ): Promise<{ count: number } & IssueCountResponseEntity<TSchema>> {
    const response = await this.fetch<{ count: number } & IssueCountResponseEntity<TSchema>>(
      ...new RequestBuilder("api/issuesGetter/count", { fields }).post(body),
    )
    if (response.count === -1) {
      // TODO: add pause
      return this.getIssueCount(body, params)
    }
    return response
  }

  /**
   * Get a list of all activities in the specific issue.
   * @param issueId - The ID of the issue.
   * @param params.fields - A list of ActivityItem attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.categories - Mandatory. Filters returned activities by categories. You must specify at least one category per request.
   * @param params.reverse - Indicates whether the order of returning activities is from newest to oldest or the opposite. Default is false.
   * @param params.start - The start of the time interval for the activity timestamp in milliseconds. If not set, defaults to 0.
   * @param params.end - The end of the time interval for the activity timestamp in milliseconds. If not set, defaults to Long.MAX_VALUE.
   * @param params.author - Filters activities by the author. Can be the database ID, login, Hub ID, or 'me' for the currently logged in user.
   * @param params.$top - Optional. Specifies the maximum number of entries to return in the response. Default limits apply if not set.
   * @param params.$skip - Optional. Lets you set a number of returned entities to skip before returning the first one.
   * @returns A promise that resolves to a list of activities.
   */
  async getIssueActivities<TSchema extends ActivityItemSchema>(
    issueId: string,
    params?: FieldsParam<TSchema> &
      ListParams & {
        categories: string
        reverse?: boolean
        start?: string
        end?: string
        author?: string
      },
  ): Promise<ActivityItemEntity<TSchema>[]> {
    return this.fetch<ActivityItemEntity<TSchema>[]>(
      ...new RequestBuilder(
        `api/issues/${issueId}/activities`,
        {
          fields,
          ...queryParams("$top", "$skip", "categories", "reverse", "start", "end", "author"),
        },
        params,
      ).get(),
    )
  }

  /**
   * Get information about the specific activity in the specific issue.
   * @param issueId - The Id of the issue.
   * @param itemId - The database ID of the activity item.
   * @param params.fields - A list of ActivityItem attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the activity item.
   */
  async getIssueActivity<TSchema extends ActivityItemSchema>(
    issueId: string,
    itemId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ActivityItemEntity<TSchema>> {
    return this.fetch<ActivityItemEntity<TSchema>>(
      ...new RequestBuilder(`api/issues/${issueId}/activities/${itemId}`, { fields }, params).get(),
    )
  }

  /**
   * Read a page of activities in the specific issue.
   * @param issueId - The Id of the issue.
   * @param params - Parameters for the request.
   * @param params.fields - A list of ActivityCursorPage attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.categories - Mandatory. Filters returned activities by categories. You must specify at least one category per request.
   * @param params.reverse - Indicates whether the order of returning activities is from newest to oldest (true) or oldest to newest (false). Defaults to false.
   * @param params.start - The timestamp in milliseconds indicating the start of the time interval for the activity timestamp. Defaults to 0 if not set.
   * @param params.end - The timestamp in milliseconds indicating the end of the time interval for the activity timestamp. Defaults to Long.MAX_VALUE if not set.
   * @param params.author - Filters activities by the author. You can specify the database ID, login, Hub ID, or 'me' for the currently logged in user.
   * @param params.cursor - For pagination. Use the cursor from the returned activity page to request the next page.
   * @param params.activityId - ID of the activity to include in the page. This activity is centered on the page.
   * @returns A promise that resolves to the page of activity items.
   */
  async getActivitiesPage<TSchema extends ActivityCursorPageSchema>(
    issueId: string,
    params: FieldsParam<TSchema> & {
      categories: string
      reverse?: boolean
      start?: string
      end?: string
      author?: string
      cursor?: string
      activityId?: string
    },
  ): Promise<ActivityCursorPageEntity<TSchema>> {
    return this.fetch<ActivityCursorPageEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/activitiesPage`,
        { fields, ...queryParams("categories", "reverse", "start", "end", "author", "cursor", "activityId") },
        params,
      ).get(),
    )
  }

  /**
   * Get the list of available custom fields of the issue.
   * @param issueId - The ID of the issue.
   * @param params.fields - A list of IssueCustomField attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Specifies the maximum number of entries to return. The server returns a maximum of 42 entries if not specified.
   * @param params.$skip - Optional. Specifies the number of entries to skip before returning the first one.
   * @returns A promise that resolves to the list of custom fields.
   */
  async getIssueCustomFields<TSchema extends IssueCustomFieldSchema>(
    issueId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<IssueCustomFieldEntity<TSchema>[]> {
    return this.fetch<IssueCustomFieldEntity<TSchema>[]>(
      ...new RequestBuilder(
        `api/issues/${issueId}/customFields`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Get a specific custom field in the issue.
   * @param issueId - The ID of the issue.
   * @param fieldId - The entity ID of the custom field in the issue.
   * @param params.fields - A list of IssueCustomField attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the custom field.
   */
  async getIssueCustomFieldById<TSchema extends IssueCustomFieldSchema>(
    issueId: string,
    fieldId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueCustomFieldEntity<TSchema>> {
    return this.fetch<IssueCustomFieldEntity<TSchema>>(
      ...new RequestBuilder(`api/issues/${issueId}/customFields/${fieldId}`, { fields }, params).get(),
    )
  }

  /**
   * Update a specific custom field in the issue.
   * @param issueId - The ID of the issue.
   * @param fieldId - The entity ID of the custom field in the issue.
   * @param body - The new value to set for the custom field.
   * @param params.fields - A list of IssueCustomField attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set to true to suppress notifications about changes made by this request.
   * @returns A promise that resolves to the updated custom field.
   */
  async updateIssueCustomField<TSchema extends IssueCustomFieldSchema>(
    issueId: string,
    fieldId: string,
    body: DeepPartial<IssueCustomField>,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<IssueCustomFieldEntity<TSchema>> {
    return this.fetch<IssueCustomFieldEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/customFields/${fieldId}`,
        { fields, muteUpdateNotifications: "boolean" },
        params,
      ).post(body),
    )
  }

  /**
   * Get the project to which the issue belongs.
   * @param issueId - The ID of the issue.
   * @param params.fields - A list of Project attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the project.
   */
  async getIssueProject<TSchema extends ProjectSchema>(
    issueId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ProjectEntity<TSchema>> {
    return this.fetch<ProjectEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/project`,
        {
          fields,
        },
        params,
      ).get(),
    )
  }

  /**
   * Change the project of the issue. That is, move the issue to another project.
   * @param issueId - The ID of the issue to be moved.
   * @param body - Required fields: id - the database ID of the project.
   * @param params.fields - A list of Project attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set this to true if no notifications should be sent on changes made by this request. This doesn't mute notifications sent by any workflow rules. Requires Apply Commands Silently permission.
   * @returns A promise that resolves to the updated project.
   */
  async changeIssueProject<TSchema extends ProjectSchema>(
    issueId: string,
    body: { id: string },
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<ProjectEntity<TSchema>> {
    return this.fetch<ProjectEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/project`,
        {
          fields,
          muteUpdateNotifications: "boolean",
        },
        params,
      ).post(body),
    )
  }

  /**
   * Get the list of sprints where the issue belongs.
   * @param issueId - The ID of the issue for which to get the sprints.
   * @param params.fields - A list of Sprint attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$skip - Optional. Set the number of returned entities to skip before returning the first one.
   * @param params.$top - Optional. Specify the maximum number of entries to return in the response. If not set, the server limits the number of returned entries.
   * @returns A promise that resolves to the list of sprints associated with the issue.
   */
  async getIssueSprints<TSchema extends SprintSchema>(
    issueId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<SprintEntity<TSchema>[]> {
    return this.fetch<SprintEntity<TSchema>[]>(
      ...new RequestBuilder(
        `api/issues/${issueId}/sprints`,
        {
          fields,
          ...queryParams("$skip", "$top"),
        },
        params,
      ).get(),
    )
  }
}
