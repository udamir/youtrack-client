import type { Schema, FieldsParam, Entity, ListParams, EnumBundle, EnumBundleElement } from "../../types"
import { fields, queryParams, RequestBuilder } from "../../utils"
import { ResourceApi } from "../common"

type EnumBundleSchema = Schema<EnumBundle>
type EnumBundleElementSchema = Schema<EnumBundleElement>

type EnumBundleEntity<TSchema extends EnumBundleSchema> = Entity<EnumBundle, TSchema>
type EnumBundleElementEntity<TSchema extends EnumBundleElementSchema> = Entity<EnumBundleElement, TSchema>

export class EnumBundlesApi extends ResourceApi {
  /**
   * Get a list of all available sets of values of the enum type.
   * @param params - Optional fields for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$skip - Optional. The number of returned entities to skip before returning the first one.
   * @param params.$top - Optional. The maximum number of entries that are returned in the response.
   * @returns A promise that resolves to an array of EnumBundle entities.
   */
  async getEnumBundles<TSchema extends EnumBundleSchema>(
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<EnumBundleEntity<TSchema>[]> {
    return this.fetch<EnumBundleEntity<TSchema>[]>(
      ...new RequestBuilder(
        "api/admin/customFieldSettings/bundles/enum",
        { fields, ...queryParams("$skip", "$top") },
        params,
      ).get(),
    )
  }

  /**
   * Create a new set of values of the enum type.
   * @param body - Required fields for the new enum bundle.
   * @param params - Optional fields for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the created EnumBundle entity.
   */
  async createEnumBundle<TSchema extends EnumBundleSchema>(
    body: { name: string } | Partial<Omit<EnumBundle, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<EnumBundleEntity<TSchema>> {
    return this.fetch<EnumBundleEntity<TSchema>>(
      ...new RequestBuilder("api/admin/customFieldSettings/bundles/enum", { fields }, params).post(body),
    )
  }

  /**
   * Get a specific set of values of the enum type.
   * @param bundleId - The database Id of the enum bundle.
   * @param params - Optional fields for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the requested EnumBundle entity.
   */
  async getEnumBundle<TSchema extends EnumBundleSchema>(
    bundleId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<EnumBundleEntity<TSchema>> {
    return this.fetch<EnumBundleEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/customFieldSettings/bundles/enum/${bundleId}`, { fields }, params).get(),
    )
  }

  /**
   * Update a specific set of values of the enum type.
   * @param bundleID - The database ID of the enum bundle.
   * @param body - The updated values for the enum bundle.
   * @param params - Optional fields for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the updated EnumBundle entity.
   */
  async updateEnumBundle<TSchema extends EnumBundleSchema>(
    bundleID: string,
    body: Partial<Omit<EnumBundle, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<EnumBundleEntity<TSchema>> {
    return this.fetch<EnumBundleEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/customFieldSettings/bundles/enum/${bundleID}`, { fields }, params).post(body),
    )
  }
  /**
   * Delete a specific set of values of the enum type.
   * @param bundleId - The database ID of the enum bundle to delete.
   * @param params - Optional fields for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the deleted EnumBundle entity.
   */
  async deleteEnumBundle<TSchema extends EnumBundleSchema>(
    bundleId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<EnumBundleEntity<TSchema>> {
    return this.fetch<EnumBundleEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/customFieldSettings/bundles/enum/${bundleId}`, { fields }, params).delete(),
    )
  }

  /**
   * Get the list of all enumerated values in the specific bundle.
   * @param bundleId - The database ID of the enum bundle.
   * @param params - Optional parameters for response filtering and pagination.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$skip - Optional. The number of returned entities to skip before returning the first one.
   * @param params.$top - Optional. The maximum number of entries that are returned in the response.
   * @returns A promise that resolves to a list of EnumBundleElement entities.
   */
  async getEnumBundleValues<TSchema extends EnumBundleElementSchema>(
    bundleId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<EnumBundleElementEntity<TSchema>[]> {
    return this.fetch<EnumBundleElementEntity<TSchema>[]>(
      ...new RequestBuilder(
        `api/admin/customFieldSettings/bundles/enum/${bundleId}/values`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Add a new enumerated value to the bundle.
   * @param bundleId - The database ID of the enum bundle.
   * @param body - The enumerated value to add, must include a name.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the newly created EnumBundleElement entity.
   */
  async addEnumBundleValue<TSchema extends EnumBundleElementSchema>(
    bundleId: string,
    body: { name: string } & Partial<Omit<EnumBundleElement, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<EnumBundleElementEntity<TSchema>> {
    return this.fetch<EnumBundleElementEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/customFieldSettings/bundles/enum/${bundleId}/values`, { fields }, params).post(
        body,
      ),
    )
  }

  /**
   * Get a specific enumerated value from the bundle.
   * @param bundleId - The database ID of the enum bundle.
   * @param elementId - The database ID of the enumerated value.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the requested EnumBundleElement entity.
   */
  async getEnumBundleValueById<TSchema extends EnumBundleElementSchema>(
    bundleId: string,
    elementId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<EnumBundleElementEntity<TSchema>> {
    return this.fetch<EnumBundleElementEntity<TSchema>>(
      ...new RequestBuilder(
        `api/admin/customFieldSettings/bundles/enum/${bundleId}/values/${elementId}`,
        { fields },
        params,
      ).get(),
    )
  }

  /**
   * Update a specific enumerated value in the bundle.
   * @param bundleId - The database ID of the enum bundle.
   * @param elementId - The database ID of the enumerated value.
   * @param body - The updated values for the enumerated value.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the updated EnumBundleElement entity.
   */
  async updateEnumBundleValue<TSchema extends EnumBundleElementSchema>(
    bundleId: string,
    elementId: string,
    body: { name: string } & Partial<Omit<EnumBundleElement, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<EnumBundleElementEntity<TSchema>> {
    return this.fetch<EnumBundleElementEntity<TSchema>>(
      ...new RequestBuilder(
        `api/admin/customFieldSettings/bundles/enum/${bundleId}/values/${elementId}`,
        { fields },
        params,
      ).post(body),
    )
  }

  /**
   * Remove a specific enumerated value from the bundle.
   * @param bundleId - The database ID of the enum bundle.
   * @param elementId - The database ID of the enumerated value.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the removed EnumBundleElement entity.
   */
  async deleteEnumBundleValue<TSchema extends EnumBundleElementSchema>(
    bundleId: string,
    elementId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<EnumBundleElementEntity<TSchema>> {
    return this.fetch<EnumBundleElementEntity<TSchema>>(
      ...new RequestBuilder(
        `api/admin/customFieldSettings/bundles/enum/${bundleId}/values/${elementId}`,
        { fields },
        params,
      ).delete(),
    )
  }
}
