import type { Schema, OwnedBundle, FieldsParam, Entity, ListParams, OwnedBundleElement, DeepPartial } from "../../types"
import { fields, queryParams, RequestBuilder } from "../../utils"
import { ResourceApi } from "../common"

type OwnedBundleSchema = Schema<OwnedBundle>
type OwnedBundleElementSchema = Schema<OwnedBundleElement>

type OwnedBundleEntity<TSchema extends OwnedBundleSchema> = Entity<OwnedBundle, TSchema>
type OwnedBundleElementEntity<TSchema extends OwnedBundleElementSchema> = Entity<OwnedBundleElement, TSchema>

export class OwnedBundlesApi extends ResourceApi {
  /**
   * Get the list of all available owned bundles in the system.
   * @param params - Optional parameters for response filtering and pagination.
   * @param params.fields - A list of OwnedBundle attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @param params.$top - Maximum number of entries to return in the response.
   * @param params.$skip - Number of entries to skip before returning the first one.
   * @returns A promise that resolves to the list of owned bundles.
   */
  async getOwnedBundles<TSchema extends OwnedBundleSchema>(
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<OwnedBundleEntity<TSchema>[]> {
    return this.youtrack.fetch<OwnedBundleEntity<TSchema>[]>(
      new RequestBuilder(
        "api/admin/customFieldSettings/bundles/owned",
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Create a new owned bundle in the system.
   * @param body - The details of the new owned bundle.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of OwnedBundle attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the created owned bundle.
   */
  async createOwnedBundle<TSchema extends OwnedBundleSchema>(
    body: DeepPartial<OwnedBundle>,
    params?: FieldsParam<TSchema>,
  ): Promise<OwnedBundleEntity<TSchema>> {
    return this.youtrack.fetch<OwnedBundleEntity<TSchema>>(
      new RequestBuilder("api/admin/customFieldSettings/bundles/owned", { fields }, params).post(body),
    )
  }

  /**
   * Get attributes of a owned bundle with a specific ID.
   * @param bundleId - The database ID of the bundle.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of OwnedBundle attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the owned bundle with the specified ID.
   */
  async getOwnedBundleById<TSchema extends OwnedBundleSchema>(
    bundleId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<OwnedBundleEntity<TSchema>> {
    return this.youtrack.fetch<OwnedBundleEntity<TSchema>>(
      new RequestBuilder(`api/admin/customFieldSettings/bundles/owned/${bundleId}`, { fields }, params).get(),
    )
  }

  /**
   * Update a owned bundle with a specific ID.
   * @param bundleId - The database ID of the bundle.
   * @param body - The updated owned bundle data.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of OwnedBundle attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the updated owned bundle.
   */
  async updateOwnedBundle<TSchema extends OwnedBundleSchema>(
    bundleId: string,
    body: DeepPartial<OwnedBundle>,
    params?: FieldsParam<TSchema>,
  ): Promise<OwnedBundleEntity<TSchema>> {
    return this.youtrack.fetch<OwnedBundleEntity<TSchema>>(
      new RequestBuilder(`api/admin/customFieldSettings/bundles/owned/${bundleId}`, { fields }, params).post(body),
    )
  }

  /**
   * Delete a owned bundle with the specific ID.
   * @param bundleId - The database ID of the owned bundle.
   * @param params - Optional parameters for response filtering and pagination.
   * @param params.fields - A list of OwnedBundleElement attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves when the owned bundle is deleted.
   */
  async deleteOwnedBundle<TSchema extends OwnedBundleSchema>(
    bundleId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<OwnedBundleEntity<TSchema>> {
    return this.youtrack.fetch<OwnedBundleEntity<TSchema>>(
      new RequestBuilder(`api/admin/customFieldSettings/bundles/owned/${bundleId}`, { fields }, params).delete(),
    )
  }

  /**
   * Get the list of all owned values in a specific owned bundle.
   * @param bundleId - The database ID of the owned bundle.
   * @param params - Optional parameters for response filtering and pagination.
   * @param params.fields - A list of OwnedBundleElement attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @param params.$top - Maximum number of entries to return in the response.
   * @param params.$skip - Number of entries to skip before returning the first one.
   * @returns A promise that resolves to the list of owned values in the bundle.
   */
  async getOwnedBundleValues<TSchema extends OwnedBundleElementSchema>(
    bundleId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<OwnedBundleElementEntity<TSchema>[]> {
    return this.youtrack.fetch<OwnedBundleElementEntity<TSchema>[]>(
      new RequestBuilder(
        `api/admin/customFieldSettings/bundles/owned/${bundleId}/values`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Add a new owned to the bundle.
   * @param bundleId - The database ID of the owned bundle.
   * @param body - The details of the new owned (required: name).
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of OwnedBundleElement attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the added owned element.
   */
  async addOwnedToBundle<TSchema extends OwnedBundleElementSchema>(
    bundleId: string,
    body: { name: string } & DeepPartial<OwnedBundleElement>,
    params?: FieldsParam<TSchema>,
  ): Promise<OwnedBundleElementEntity<TSchema>> {
    return this.youtrack.fetch<OwnedBundleElementEntity<TSchema>>(
      new RequestBuilder(`api/admin/customFieldSettings/bundles/owned/${bundleId}/values`, { fields }, params).post(
        body,
      ),
    )
  }

  /**
   * Update a specific owned value in the bundle.
   * @param bundleId - The database ID of the owned bundle.
   * @param elementId - The database ID of the owned value.
   * @param body - The updated owned value data.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of OwnedBundleElement attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the updated owned element.
   */
  async updateOwnedBundleValue<TSchema extends OwnedBundleElementSchema>(
    bundleId: string,
    elementId: string,
    body: DeepPartial<OwnedBundleElement>,
    params?: FieldsParam<TSchema>,
  ): Promise<OwnedBundleElementEntity<TSchema>> {
    return this.youtrack.fetch<OwnedBundleElementEntity<TSchema>>(
      new RequestBuilder(
        `api/admin/customFieldSettings/bundles/owned/${bundleId}/values/${elementId}`,
        { fields },
        params,
      ).post(body),
    )
  }

  /**
   * Remove a specific owned from the bundle.
   * @param bundleId - The database ID of the owned bundle.
   * @param elementId - The database ID of the owned value.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of OwnedBundleElement attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves when the owned value is removed.
   */
  async removeOwnedFromBundle<TSchema extends OwnedBundleElementSchema>(
    bundleId: string,
    elementId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<OwnedBundleElementEntity<TSchema>> {
    return this.youtrack.fetch<OwnedBundleElementEntity<TSchema>>(
      new RequestBuilder(
        `api/admin/customFieldSettings/bundles/owned/${bundleId}/values/${elementId}`,
        { fields },
        params,
      ).delete(),
    )
  }
}
