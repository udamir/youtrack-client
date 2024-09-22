import type { Entity, FieldsParam, IssueLinkType, ListParams, Schema } from "../types"
import { fields, queryParams, RequestBuilder } from "../utils"
import { ResourceApi } from "./common"

type IssueLinkTypeSchema = Schema<IssueLinkType>
type IssueLinkTypeEntity<TSchema extends IssueLinkTypeSchema> = Entity<IssueLinkType, TSchema>

/**
 * This resource provides operations with issue link types.
 * https://www.jetbrains.com/help/youtrack/devportal/resource-api-issueLinkTypes.html
 */
export class IssueLinkTypesApi extends ResourceApi {
  /**
   * Gets the list of all available link types in the system.
   * @param params.fields - A list of IssueLinkType attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.top - Optional. The maximum number of entries to return in the response. The server returns a maximum of 42 entries if not specified.
   * @param params.skip - Optional. The number of entries to skip before returning the first one.
   * @returns A list of available issue link types.
   */
  async getIssueLinkTypes<TSchema extends IssueLinkTypeSchema>(
    params?: FieldsParam<TSchema> | ListParams,
  ): Promise<IssueLinkTypeEntity<TSchema>> {
    return this.fetch<IssueLinkTypeEntity<TSchema>>(
      ...new RequestBuilder("api/issueLinkTypes", { fields, ...queryParams("$top", "$skip") }, params).get(),
    )
  }

  /**
   * Creates a new issue link type.
   * @param body - Required fields: name, targetToSource, sourceToTarget.
   * @param params.fields - A list of IssueLinkType attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The created issue link type.
   */
  async createIssueLinkType<TSchema extends IssueLinkTypeSchema>(
    body: { name: string; targetToSource: string; sourceToTarget: string } | Partial<Omit<IssueLinkType, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueLinkTypeEntity<TSchema>> {
    return this.fetch<IssueLinkTypeEntity<TSchema>>(
      ...new RequestBuilder("api/issueLinkTypes", { fields }, params).post(body),
    )
  }

  /**
   * Gets the attributes of the specified issue link type.
   * @param typeId - The Id of the issue link type.
   * @param fields - A list of IssueLinkType attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The specified issue link type.
   */
  async getIssueLinkType<TSchema extends IssueLinkTypeSchema>(
    typeId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueLinkTypeEntity<TSchema>> {
    return this.fetch<IssueLinkTypeEntity<TSchema>>(
      ...new RequestBuilder(`api/issueLinkTypes/${typeId}`, { fields }, params).get(),
    )
  }

  /**
   * Updates the specified issue link type.
   * @param typeId - The ID of the issue link type to update.
   * @param body - The attributes to update for the issue link type.
   * @param params.fields - A list of IssueLinkType attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The updated issue link type.
   */
  async updateIssueLinkType<TSchema extends IssueLinkTypeSchema>(
    typeId: string,
    body: Partial<Omit<IssueLinkType, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueLinkTypeEntity<TSchema>> {
    return this.fetch<IssueLinkTypeEntity<TSchema>>(
      ...new RequestBuilder(`api/issueLinkTypes/${typeId}`, { fields }, params).post(body),
    )
  }

  /**
   * Deletes the link type and its usages.
   * @param typeId - The Id of the issue link type to delete.
   * @param params.fields - A list of IssueLinkType attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The response from the deletion operation.
   */
  async deleteIssueLinkType<TSchema extends IssueLinkTypeSchema>(
    typeId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<void> {
    return this.fetch<void>(...new RequestBuilder(`api/issueLinkTypes/${typeId}`, { fields }, params).delete())
  }
}
