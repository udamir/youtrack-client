import type {
  Schema,
  FieldsParam,
  Entity,
  ListParams,
  Project,
  Article,
  ProjectCustomField,
  Issue,
  CustomFieldsParam,
  MuteUpdateNotificationsParam,
  ProjectTimeTrackingSettings,
  WorkItemType,
  DeepPartial,
} from "../../types"
import { fields, queryParams, RequestBuilder } from "../../utils"
import { ResourceApi } from "../common"

type ProjectSchema = Schema<Project>
type ArticleSchema = Schema<Article>
type ProjectCustomFieldSchema = Schema<ProjectCustomField>
type IssueSchema = Schema<Issue>
type ProjectTimeTrackingSettingsSchema = Schema<ProjectTimeTrackingSettings>
type WorkItemTypeSchema = Schema<WorkItemType>

type ProjectEntity<TSchema extends ProjectSchema> = Entity<Project, TSchema>
type ArticleEntity<TSchema extends ArticleSchema> = Entity<Article, TSchema>
type ProjectCustomFieldEntity<TSchema extends ProjectCustomFieldSchema> = Entity<ProjectCustomField, TSchema>
type IssueEntity<TSchema extends IssueSchema> = Entity<Issue, TSchema>
type ProjectTimeTrackingSettingsEntity<TSchema extends ProjectTimeTrackingSettingsSchema> = Entity<
  ProjectTimeTrackingSettings,
  TSchema
>
type WorkItemTypeEntity<TSchema extends WorkItemTypeSchema> = Entity<WorkItemType, TSchema>

export class ProjectsApi extends ResourceApi {
  /**
   * Get a list of all available projects in the system.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. The maximum number of entries to return in the response.
   * @param params.$skip - Optional. The number of entities to skip before returning the first one.
   * @returns A promise that resolves to the list of Project entities.
   */
  async getProjects<TSchema extends ProjectSchema>(
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<ProjectEntity<TSchema>[]> {
    return this.youtrack.fetch<ProjectEntity<TSchema>[]>(
      new RequestBuilder("api/admin/projects", { fields, ...queryParams("$top", "$skip") }, params).get(),
    )
  }

  /**
   * Create a project in YouTrack.
   * @param body - Required fields: name, shortName, leader (id of the project owner user).
   * @param params - Optional parameters for response filtering and template selection.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.template - Optional. Specify the template to use for the new project (e.g., 'scrum', 'kanban'). If not specified, the default settings will be used.
   * @returns A promise that resolves to the created Project entity.
   */
  async createProject<TSchema extends ProjectSchema>(
    body: { name: string; shortName: string; leader: { id: string } } & DeepPartial<Project>,
    params?: FieldsParam<TSchema> & { template?: string },
  ): Promise<ProjectEntity<TSchema>> {
    return this.youtrack.fetch<ProjectEntity<TSchema>>(
      new RequestBuilder("api/admin/projects", { fields, template: "string" }, params).post(body),
    )
  }

  /**
   * Get the settings of a specific project.
   * @param projectId - The ID of the project (can be the database entity ID or the short name).
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the requested Project entity.
   */
  async getProjectById<TSchema extends ProjectSchema>(
    projectId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ProjectEntity<TSchema>> {
    return this.youtrack.fetch<ProjectEntity<TSchema>>(
      new RequestBuilder(`api/admin/projects/${projectId}`, { fields }, params).get(),
    )
  }

  /**
   * Update settings of a project with a specific ID.
   * @param projectId - The ID of the project (can be the database entity ID or the short name).
   * @param body - The fields to update in the project.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the updated Project entity.
   */
  async updateProject<TSchema extends ProjectSchema>(
    projectId: string,
    body: DeepPartial<Project>,
    params?: FieldsParam<TSchema>,
  ): Promise<ProjectEntity<TSchema>> {
    return this.youtrack.fetch<ProjectEntity<TSchema>>(
      new RequestBuilder(`api/admin/projects/${projectId}`, { fields }, params).post(body),
    )
  }

  /**
   * Delete a project with specific ID.
   * @param projectId - The ID of the project (can be the database entity ID or the short name).
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves when the project is deleted.
   */
  async deleteProject<TSchema extends ProjectSchema>(
    projectId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ProjectEntity<TSchema>> {
    return this.youtrack.fetch<ProjectEntity<TSchema>>(
      new RequestBuilder(`api/admin/projects/${projectId}`, { fields }, params).delete(),
    )
  }

  /**
   * Get the list of articles that belong to the project.
   * @param projectId - The ID of the project (can be the database entity ID or the short name).
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of Article attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Maximum number of entries to return.
   * @param params.$skip - Optional. Number of returned entities to skip before returning the first one.
   * @returns A promise that resolves to a list of Article entities.
   */
  async getProjectArticles<TSchema extends ArticleSchema>(
    projectId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<ArticleEntity<TSchema>[]> {
    return this.youtrack.fetch<ArticleEntity<TSchema>[]>(
      new RequestBuilder(
        `api/admin/projects/${projectId}/articles`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Read the list of custom fields that are attached to a specific project.
   * @param projectId - The ID of the project (can be the database entity ID or the short name).
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of ProjectCustomField attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Maximum number of entries to return.
   * @param params.$skip - Optional. Number of returned entities to skip before returning the first one.
   * @returns A promise that resolves to a list of ProjectCustomField entities.
   */
  async getProjectCustomFields<TSchema extends ProjectCustomFieldSchema>(
    projectId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<ProjectCustomFieldEntity<TSchema>[]> {
    return this.youtrack.fetch<ProjectCustomFieldEntity<TSchema>[]>(
      new RequestBuilder(
        `api/admin/projects/${projectId}/customFields`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Attach the custom field to the project.
   * @param projectId - The ID of the project (can be the database entity ID or the short name).
   * @param body - The custom field to attach, including its ID and type.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of ProjectCustomField attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the attached ProjectCustomField entity.
   */
  async addCustomFieldToProject<TSchema extends ProjectCustomFieldSchema>(
    projectId: string,
    body: { field: { id: string } } & DeepPartial<ProjectCustomField>,
    params?: FieldsParam<TSchema>,
  ): Promise<ProjectCustomFieldEntity<TSchema>> {
    return this.youtrack.fetch<ProjectCustomFieldEntity<TSchema>>(
      new RequestBuilder(`api/admin/projects/${projectId}/customFields`, { fields }, params).post(body),
    )
  }

  /**
   * Get the settings of the specific custom field in the project.
   * @param projectId - The ID of the project (can be the database entity ID or the short name).
   * @param fieldId - The database ID of the project custom field.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of ProjectCustomField attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the requested ProjectCustomField entity.
   */
  async getProjectCustomFieldById<TSchema extends ProjectCustomFieldSchema>(
    projectId: string,
    fieldId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ProjectCustomFieldEntity<TSchema>> {
    return this.youtrack.fetch<ProjectCustomFieldEntity<TSchema>>(
      new RequestBuilder(`api/admin/projects/${projectId}/customFields/${fieldId}`, { fields }, params).get(),
    )
  }

  /**
   * Change the settings of the specific custom field in the project.
   * @param projectId - The ID of the project (can be the database entity ID or the short name).
   * @param fieldId - The database ID of the project custom field.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of ProjectCustomField attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param body - The new settings for the project custom field.
   * @returns A promise that resolves to the updated ProjectCustomField entity.
   */
  async updateProjectCustomField<TSchema extends ProjectCustomFieldSchema>(
    projectId: string,
    fieldId: string,
    body: DeepPartial<ProjectCustomField>,
    params?: FieldsParam<TSchema>,
  ): Promise<ProjectCustomFieldEntity<TSchema>> {
    return this.youtrack.fetch<ProjectCustomFieldEntity<TSchema>>(
      new RequestBuilder(`api/admin/projects/${projectId}/customFields/${fieldId}`, { fields }, params).post(body),
    )
  }

  /**
   * Remove the specific custom field from the project.
   * @param projectId - The ID of the project (can be the database entity ID or the short name).
   * @param fieldId - The database ID of the project custom field.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of ProjectCustomField attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the result of the deletion.
   */
  async removeProjectCustomField<TSchema extends ProjectCustomFieldSchema>(
    projectId: string,
    fieldId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ProjectCustomFieldEntity<TSchema>> {
    return this.youtrack.fetch<ProjectCustomFieldEntity<TSchema>>(
      new RequestBuilder(`api/admin/projects/${projectId}/customFields/${fieldId}`, { fields }, params).delete(),
    )
  }

  /**
   * Get a list of all available issues in the specific project.
   * The default issue sorting is by updated desc.
   * If $top is not provided, the number of returned issues is limited to the Max issues to export value in the Global Settings.
   * @param projectId - The ID of the project (can be the database entity ID or the short name).
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$skip - Optional. Lets you set a number of returned entities to skip before returning the first one.
   * @param params.$top - Optional. Lets you specify the maximum number of entries that are returned in the response.
   * @param params.customFields - The name of the custom field(s) to show in the response. Use this parameter multiple times to show more than one custom field.
   * @returns A promise that resolves to a list of issues in the specified project.
   */
  async getProjectIssues<TSchema extends IssueSchema>(
    projectId: string,
    params?: FieldsParam<TSchema> | ListParams | CustomFieldsParam,
  ): Promise<IssueEntity<TSchema>[]> {
    return this.youtrack.fetch<IssueEntity<TSchema>[]>(
      new RequestBuilder(
        `api/admin/projects/${projectId}/issues`,
        { fields, ...queryParams("$top", "$skip", "customFields") },
        params,
      ).get(),
    )
  }

  /**
   * Create a new issue in the specified project.
   * Required fields: summary.
   * @param projectId - The ID of the project (can be the database entity ID or the short name).
   * @param body - The body of the issue, must include a summary.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @param params.muteUpdateNotifications - Set to true to mute notifications for this request. Requires Apply Commands Silently permission.
   * @returns A promise that resolves to the created issue.
   */
  async createProjectIssue<TSchema extends IssueSchema>(
    projectId: string,
    body: { summary: string } & DeepPartial<Issue>,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<IssueEntity<TSchema>> {
    return this.youtrack.fetch<IssueEntity<TSchema>>(
      new RequestBuilder(
        `api/admin/projects/${projectId}/issues`,
        { fields, muteUpdateNotifications: "boolean" },
        params,
      ).post(body),
    )
  }

  /**
   * Read a specific issue in the project.
   * @param projectId - The database ID or project ID of the project.
   * @param issueId - The database ID or project ID of the issue.
   * @param params.fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The requested issue.
   */
  async getProjectIssueById<TSchema extends IssueSchema>(
    projectId: string,
    issueId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueEntity<TSchema>> {
    return this.youtrack.fetch<IssueEntity<TSchema>>(
      new RequestBuilder(`api/admin/projects/${projectId}/issues/${issueId}`, { fields }, params).get(),
    )
  }

  /**
   * Update a single issue.
   * @param issueId - The database ID or project ID of the issue.
   * @param params.fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set to true if no notifications should be sent on changes made by this request.
   * @returns The updated issue.
   */
  async updateProjectIssue<TSchema extends IssueSchema>(
    projectId: string,
    issueId: string,
    body: DeepPartial<Issue>,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<IssueEntity<TSchema>> {
    return this.youtrack.fetch<IssueEntity<TSchema>>(
      new RequestBuilder(
        `api/admin/projects/${projectId}/issues/${issueId}`,
        { fields, muteUpdateNotifications: "boolean" },
        params,
      ).post(body),
    )
  }

  /**
   * Delete the issue. Note that this operation cannot be undone.
   * @param issueId - The database ID or project ID of the issue.
   * @param params.fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves when the issue is deleted.
   */
  async deleteProjectIssue<TSchema extends IssueSchema>(
    projectId: string,
    issueId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueEntity<TSchema>> {
    return this.youtrack.fetch<IssueEntity<TSchema>>(
      new RequestBuilder(`api/admin/projects/${projectId}/issues/${issueId}`, { fields }, params).delete(),
    )
  }

  /**
   * Read the time tracking settings of the project.
   * @param projectId - The ID of the project (can be the database entity ID or the short name).
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of ProjectTimeTrackingSettings attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the time tracking settings of the project.
   */
  async getProjectTimeTrackingSettings<TSchema extends ProjectTimeTrackingSettingsSchema>(
    projectId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<ProjectTimeTrackingSettingsEntity<TSchema>> {
    return this.youtrack.fetch<ProjectTimeTrackingSettingsEntity<TSchema>>(
      new RequestBuilder(`api/admin/projects/${projectId}/timeTrackingSettings`, { fields }, params).get(),
    )
  }

  /**
   * Update the time tracking settings of the project.
   * @param projectId - The ID of the project (can be the database entity ID or the short name).
   * @param body - The new time tracking settings to apply.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of ProjectTimeTrackingSettings attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the updated time tracking settings of the project.
   */
  async updateProjectTimeTrackingSettings<TSchema extends ProjectTimeTrackingSettingsSchema>(
    projectId: string,
    body: DeepPartial<ProjectTimeTrackingSettings>,
    params?: FieldsParam<TSchema>,
  ): Promise<ProjectTimeTrackingSettingsEntity<TSchema>> {
    return this.youtrack.fetch<ProjectTimeTrackingSettingsEntity<TSchema>>(
      new RequestBuilder(`api/admin/projects/${projectId}/timeTrackingSettings`, { fields }, params).post(body),
    )
  }

  /**
   * Get the list of all work items of the specific project.
   * @param issueId - The ID of the project.
   * @param params - Optional parameters.
   * @param params.fields - A list of WorkItemType attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Specifies the maximum number of entries to return. If not provided, the server limits the number of entries.
   * @param params.$skip - Optional. Specifies the number of entries to skip before returning the first one.
   * @returns A promise that resolves to the list of work items for the project.
   */
  async getProjectWorkItemTypes<TSchema extends WorkItemTypeSchema>(
    projectId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<WorkItemTypeEntity<TSchema>[]> {
    return this.youtrack.fetch<WorkItemTypeEntity<TSchema>[]>(
      new RequestBuilder(
        `api/admin/projects/${projectId}/timeTrackingSettings/workItemTypes`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Add a new work item to the project.
   * @param projectId - The ID of the project.
   * @param body - The work item details including duration.
   * @param params - Optional parameters.
   * @param params.fields - A list of WorkItemType attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set to true if no notifications should be sent on changes made by this request. This doesn't mute notifications sent by any workflow rules.
   * @returns A promise that resolves to the added work item.
   */
  async addProjectWorkItemType<TSchema extends WorkItemTypeSchema>(
    projectId: string,
    body: { duration: number } & DeepPartial<WorkItemType>,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<WorkItemTypeEntity<TSchema>> {
    return this.youtrack.fetch<WorkItemTypeEntity<TSchema>>(
      new RequestBuilder(
        `api/admin/projects/${projectId}/timeTrackingSettings/workItems`,
        {
          fields,
          muteUpdateNotifications: "boolean",
        },
        params,
      ).post(body),
    )
  }

  /**
   * Get a specific work item of the project.
   * @param projectId - The ID of the project.
   * @param workItemId - The ID of the work item to retrieve.
   * @param params - Optional parameters.
   * @param params.fields - A list of WorkItemType attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the specific work item.
   */
  async getProjectWorkItemTypeById<TSchema extends WorkItemTypeSchema>(
    projectId: string,
    workItemId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<WorkItemTypeEntity<TSchema>> {
    return this.youtrack.fetch<WorkItemTypeEntity<TSchema>>(
      new RequestBuilder(
        `api/admin/projects/${projectId}/timeTrackingSettings/workItems/${workItemId}`,
        { fields },
        params,
      ).get(),
    )
  }

  /**
   * Delete the specific work item in the project.
   * @param projectId - The ID of the project.
   * @param workItemId - The ID of the work item to delete.
   * @param params - Optional parameters.
   * @param params.fields - A list of WorkItemType attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the response of the deletion request.
   */
  async deleteProjectWorkItemType<TSchema extends WorkItemTypeSchema>(
    projectId: string,
    workItemId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<WorkItemTypeEntity<TSchema>> {
    return this.youtrack.fetch<WorkItemTypeEntity<TSchema>>(
      new RequestBuilder(
        `api/admin/projects/${projectId}/timeTrackingSettings/workItems/${workItemId}`,
        { fields },
        params,
      ).delete(),
    )
  }
}
