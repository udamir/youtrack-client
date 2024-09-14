import type { Entity, FieldsParam, ListParams, Schema } from "../types"
import type { Agile, Sprint } from "../types/entities/Agile"
import { RequestBuilder, fields } from "../utils"
import { ResourceApi } from "./common"

type AgileSchema = Schema<Agile> | undefined
type SprintSchema = Schema<Sprint> | undefined

type AgileEntity<TSchema extends AgileSchema> = Entity<Agile, TSchema>
type SprintEntity<TSchema extends SprintSchema> = Entity<Sprint, TSchema>

export type AgileTemplateParam = {
  template?: "kanban" | "scrum" | "version" | "custom" | "personal"
}

/**
 * This resource lets you work with agile boards in YouTrack.
 * https://www.jetbrains.com/help/youtrack/devportal/resource-api-agiles.html
 */
export class AgilesApi extends ResourceApi {
  /**
   * Get the list of all available agile boards in the system.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of Agile attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @param params.$skip - Optional. Lets you set a number of returned entities to skip before returning the first one.
   * @param params.$top - Optional. Lets you specify the maximum number of entries that are returned in the response. If you don't set the $top value, the server limits the maximum number of returned entries.
   * @returns The list of all available agile boards
   */
  async getAgiles<TSchema extends AgileSchema = undefined>(
    params?: ListParams & FieldsParam<TSchema>,
  ): Promise<AgileEntity<TSchema>[]> {
    return this.fetch<AgileEntity<TSchema>[]>(
      ...new RequestBuilder("api/agiles", { fields, $skip: "number", $top: "number" }, params).get(),
    )
  }

  /**
   * Create a new agile board
   * @param body - Body with required fields: name, projects (id - Ids of the project that need to be associated with the board).
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of Agile attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @param params.template - The name of the board template that should be used. Possible values: kanban, scrum, version, custom, personal.
   * @returns The created agile board.
   */
  async createAgile<TSchema extends AgileSchema>(
    body: Omit<Agile, "id">,
    params?: AgileTemplateParam & FieldsParam<TSchema>,
  ): Promise<AgileEntity<TSchema>[]> {
    return this.fetch<AgileEntity<TSchema>[]>(
      ...new RequestBuilder("api/agiles", { fields, template: "string" }, params).post(body),
    )
  }

  /**
   * Get settings of the specific agile board.
   * @param agileId - The ID of the agile board.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of Agile attributes to include in the response. If not specified, only the entityId is returned.
   * @returns The settings of the specified agile board.
   */
  async getAgileById<TSchema extends AgileSchema>(
    agileId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<AgileEntity<TSchema>> {
    return this.fetch<AgileEntity<TSchema>>(...new RequestBuilder(`/api/agiles/${agileId}`, { fields }, params).get())
  }

  /**
   * Update settings of the specific agile board.
   * @param agileId - The Id of the agile board.
   * @param body - The updated settings for the agile board, excluding the Id.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of Agile attributes to include in the response. If not specified, only the entityId is returned.
   * @returns The updated settings of the specified agile board.
   */
  async updateAgile<TSchema extends AgileSchema>(
    agileId: string,
    body: Partial<Omit<Agile, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<AgileEntity<TSchema>> {
    return this.fetch<AgileEntity<TSchema>>(
      ...new RequestBuilder(`/api/agiles/${agileId}`, { fields }, params).post(body),
    )
  }

  /**
   * Delete an agile board with the specific Id.
   * @param agileId - The Id of the agile board.
   * @param params - Optional parameters including fields.
   * @param params.fields - A list of Agile attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The deleted agile board information.
   */
  async deleteAgile<TSchema extends AgileSchema>(
    agileId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<AgileEntity<TSchema>> {
    return this.fetch<AgileEntity<TSchema>>(
      ...new RequestBuilder(`/api/agiles/${agileId}`, { fields }, params).delete(),
    )
  }
  /**
   * Get the list of all sprints of the agile board.
   * @param agileID - The ID of the agile board.
   * @param params - Optional parameters including fields, $skip, and $top for pagination.
   * @param params.fields - A list of Agile attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$skip - The number of entries to skip in the response. Useful for pagination.
   * @param params.$top - The maximum number of entries to return. If not specified, the server limits the number of entries returned.
   * @returns The list of sprints for the specified agile board.
   */
  async getAgileSprints<TSchema extends SprintSchema>(
    agileId: string,
    params?: ListParams & FieldsParam<TSchema>,
  ): Promise<SprintEntity<TSchema>[]> {
    return this.fetch<SprintEntity<TSchema>[]>(
      ...new RequestBuilder(
        `/api/agiles/${agileId}/sprints`,
        { fields, $skip: "number", $top: "number" },
        params,
      ).get(),
    )
  }

  /**
   * Create a new sprint for the specified agile board.
   * @param agileID - The ID of the agile board.
   * @param body - The new sprint details including the required field: name.
   * @param params - Optional parameters for the request.
   * @param params.fields - Optional. A list of Sprint attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Optional. Set this parameter to true if no notifications should be sent on changes made by this request.
   * @returns The created sprint.
   */
  async createAgileSprint<TSchema extends SprintSchema>(
    agileId: string,
    body: { name: string } | Partial<Omit<Sprint, "id">>, // Required field: name
    params?: FieldsParam<TSchema> & { muteUpdateNotifications?: boolean },
  ): Promise<SprintEntity<TSchema>> {
    return this.fetch<SprintEntity<TSchema>>(
      ...new RequestBuilder(
        `/api/agiles/${agileId}/sprints`,
        { fields, muteUpdateNotifications: "boolean" },
        params,
      ).post(body),
    )
  }

  /**
   * Get settings of the specific sprint of the agile board.
   * @param agileId - The Id of the agile board.
   * @param sprintId - The Id of the sprint or "current" for the current sprint.
   * @param params - Optional parameters for the request.
   * @param params.fields - Optional. A list of Sprint attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The settings of the specified sprint.
   */
  async getAgileSprintById<TSchema extends SprintSchema>(
    agileId: string,
    sprintId: string | "current",
    params?: FieldsParam<TSchema>,
  ): Promise<SprintEntity<TSchema>> {
    return this.fetch<SprintEntity<TSchema>>(
      ...new RequestBuilder(`/api/agiles/${agileId}/sprints/${sprintId}`, { fields }, params).get(),
    )
  }

  /**
   * Delete the specific sprint from the agile board.
   * @param agileId - The Id of the agile board.
   * @param sprintId - The Id of the sprint to be deleted.
   * @param params - Optional parameters for the request.
   * @param params.fields - Optional. A list of Sprint attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The deleted sprint information.
   */
  async deleteAgileSprint<TSchema extends SprintSchema>(
    agileId: string,
    sprintId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<SprintEntity<TSchema>> {
    return this.fetch<SprintEntity<TSchema>>(
      ...new RequestBuilder(`/api/agiles/${agileId}/sprints/${sprintId}`, { fields }, params).delete(),
    )
  }

  /**
   * Update the specific sprint of the agile board.
   * @param agileId - The Id of the agile board.
   * @param sprintId - The Id of the sprint or "current" for the current sprint.
   * @param body - The updated sprint details excluding the Id.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of Sprint attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The updated sprint information.
   */
  async updateAgileSprint<TSchema extends SprintSchema>(
    agileId: string,
    sprintId: string | "current",
    body: Partial<Omit<Sprint, "id">>, // Body contains the updated sprint settings
    params?: FieldsParam<TSchema>,
  ): Promise<SprintEntity<TSchema>> {
    return this.fetch<SprintEntity<TSchema>>(
      ...new RequestBuilder(`/api/agiles/${agileId}/sprints/${sprintId}`, { fields }, params).post(body),
    )
  }
}
