import type {
  Schema,
  FieldsParam,
  Entity,
  GlobalTimeTrackingSettings,
  ListParams,
  WorkItemType,
  WorkTimeSettings,
} from "../../types"
import { fields, queryParams, RequestBuilder } from "../../utils"
import { ResourceApi } from "../common"

type TimeTrackingSettingsSchema = Schema<GlobalTimeTrackingSettings>
type WorkItemTypeSchema = Schema<WorkItemType>
type WorkTimeSettingsSchema = Schema<WorkTimeSettings>

type TimeTrackingSettingsEntity<TSchema extends TimeTrackingSettingsSchema> = Entity<
  GlobalTimeTrackingSettings,
  TSchema
>
type WorkItemTypeEntity<TSchema extends WorkItemTypeSchema> = Entity<WorkItemType, TSchema>
type WorkTimeSettingsEntity<TSchema extends WorkTimeSettingsSchema> = Entity<WorkTimeSettings, TSchema>

export class GlobalTimeTrackingSettingsApi extends ResourceApi {
  /**
   * Read the global time tracking settings of the service.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of GlobalTimeTrackingSettings attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the global time tracking settings of the service.
   */
  async getGlobalTimeTrackingSettings<TSchema extends TimeTrackingSettingsSchema>(
    params?: FieldsParam<TSchema>,
  ): Promise<TimeTrackingSettingsEntity<TSchema>> {
    return this.fetch<TimeTrackingSettingsEntity<TSchema>>(
      ...new RequestBuilder("api/admin/timeTrackingSettings", { fields }, params).get(),
    )
  }

  /**
   * Read the list of currently available work item types.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of WorkItemType attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$skip - Optional. Number of returned entities to skip before returning the first one.
   * @param params.$top - Optional. Maximum number of entries that are returned in the response.
   * @returns The list of work item types.
   */
  async getWorkItemTypes<TSchema extends WorkItemTypeSchema>(
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<Array<WorkItemTypeEntity<TSchema>>> {
    return this.fetch<Array<WorkItemTypeEntity<TSchema>>>(
      ...new RequestBuilder(
        "api/admin/timeTrackingSettings/workItemTypes",
        { fields, ...queryParams("$skip", "$top") },
        params,
      ).get(),
    )
  }

  /**
   * Create a new work item type.
   * @param body - Required fields: name.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of WorkItemType attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The created work item type.
   * @requires permissions Low-level Admin Write or Update Project.
   */
  async createWorkItemType<TSchema extends WorkItemTypeSchema>(
    body: { name: string } | Partial<Omit<WorkItemType, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<WorkItemTypeEntity<TSchema>> {
    return this.fetch<WorkItemTypeEntity<TSchema>>(
      ...new RequestBuilder("api/admin/timeTrackingSettings/workItemTypes", { fields }, params).post(body),
    )
  }

  /**
   * Read a work item type with a specific ID.
   * @param typeId - Database ID of the work item type.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of WorkItemType attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The requested work item type.
   * @requires permissions Read Work Item.
   */
  async getWorkItemTypeById<TSchema extends WorkItemTypeSchema>(
    typeId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<WorkItemTypeEntity<TSchema>> {
    return this.fetch<WorkItemTypeEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/timeTrackingSettings/workItemTypes/${typeId}`, { fields }, params).get(),
    )
  }

  /**
   * Update a work item type with a specific ID.
   * @param typeId - Database ID of the work item type.
   * @param body - The properties to update in the work item type as JSON.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of WorkItemType attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The updated work item type.
   * @requires permissions Low-level Admin Write.
   */
  async updateWorkItemType<TSchema extends WorkItemTypeSchema>(
    typeId: string,
    body: Partial<Omit<WorkItemType, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<WorkItemTypeEntity<TSchema>> {
    return this.fetch<WorkItemTypeEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/timeTrackingSettings/workItemTypes/${typeId}`, { fields }, params).post(body),
    )
  }

  /**
   * Delete a work item type with a specific ID.
   * @param typeId - Database ID of the work item type.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of WorkItemType attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The result of the deletion.
   * @requires permissions Low-level Admin Write.
   */
  async deleteWorkItemType<TSchema extends WorkItemTypeSchema>(
    typeId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<WorkItemTypeEntity<TSchema>> {
    return this.fetch<WorkItemTypeEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/timeTrackingSettings/workItemTypes/${typeId}`, { fields }, params).delete(),
    )
  }

  /**
   * Read the system work time settings.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of WorkTimeSettings attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The current work time settings.
   * @requires permissions Read Work Item.
   */
  async getWorkTimeSettings<TSchema extends WorkTimeSettingsSchema>(
    params?: FieldsParam<TSchema>,
  ): Promise<WorkTimeSettingsEntity<TSchema>> {
    return this.fetch<WorkTimeSettingsEntity<TSchema>>(
      ...new RequestBuilder("api/admin/timeTrackingSettings/workTimeSettings", { fields }, params).get(),
    )
  }

  /**
   * Update the work time settings.
   * @param body - Properties to update in the work time settings.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of WorkTimeSettings attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The updated work time settings.
   * @requires permissions Low-level Admin Write.
   */
  async updateWorkTimeSettings<TSchema extends WorkTimeSettingsSchema>(
    body: Partial<Omit<WorkTimeSettings, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<WorkTimeSettingsEntity<TSchema>> {
    return this.fetch<WorkTimeSettingsEntity<TSchema>>(
      ...new RequestBuilder("api/admin/timeTrackingSettings/workTimeSettings", { fields }, params).post(body),
    )
  }
}
