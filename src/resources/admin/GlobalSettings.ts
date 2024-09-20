import type { Schema, FieldsParam, Entity, ListParams, GlobalSettings } from "../../types"
import { fields, queryParams, RequestBuilder } from "../../utils"
import { ResourceApi } from "../common"

type GlobalSettingsSchema = Schema<GlobalSettings>
type GlobalSettingsEntity<TSchema extends GlobalSettingsSchema> = Entity<GlobalSettings, TSchema>

export class GlobalSettingsApi extends ResourceApi {
  /**
   * Get the global settings.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of GlobalSettings attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the global settings.
   */
  async getGlobalSettings<TSchema extends GlobalSettingsSchema>(
    params?: FieldsParam<TSchema>,
  ): Promise<GlobalSettingsEntity<TSchema>> {
    return this.fetch<GlobalSettingsEntity<TSchema>>(
      ...new RequestBuilder("api/admin/globalSettings", { fields }, params).get(),
    )
  }

  /**
   * Update the global settings.
   * @param body - The updated settings.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of GlobalSettings attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the updated global settings.
   */
  async updateGlobalSettings<TSchema extends GlobalSettingsSchema>(
    body: Partial<GlobalSettingsEntity<TSchema>>,
    params?: FieldsParam<TSchema>,
  ): Promise<GlobalSettingsEntity<TSchema>> {
    return this.fetch<GlobalSettingsEntity<TSchema>>(
      ...new RequestBuilder("api/admin/globalSettings", { fields }, params).post(body),
    )
  }
}
