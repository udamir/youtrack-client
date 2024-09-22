import type {
  Schema,
  VersionBundle,
  FieldsParam,
  Entity,
  ListParams,
  VersionBundleElement,
  DeepPartial,
} from "../../types"
import { fields, queryParams, RequestBuilder } from "../../utils"
import { ResourceApi } from "../common"

type VersionBundleSchema = Schema<VersionBundle>
type VersionBundleElementSchema = Schema<VersionBundleElement>

type VersionBundleEntity<TSchema extends VersionBundleSchema> = Entity<VersionBundle, TSchema>
type VersionBundleElementEntity<TSchema extends VersionBundleElementSchema> = Entity<VersionBundleElement, TSchema>

export class VersionBundlesApi extends ResourceApi {
  /**
   * Get the list of all available version bundles in the system.
   * @param params - Optional parameters for response filtering and pagination.
   * @param params.fields - A list of VersionBundle attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @param params.$top - Maximum number of entries to return in the response.
   * @param params.$skip - Number of entries to skip before returning the first one.
   * @returns A promise that resolves to the list of version bundles.
   */
  async getVersionBundles<TSchema extends VersionBundleSchema>(
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<VersionBundleEntity<TSchema>[]> {
    return this.fetch<VersionBundleEntity<TSchema>[]>(
      ...new RequestBuilder(
        "api/admin/customFieldSettings/bundles/version",
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Create a new version bundle in the system.
   * @param body - The details of the new version bundle.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of VersionBundle attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the created version bundle.
   */
  async createVersionBundle<TSchema extends VersionBundleSchema>(
    body: DeepPartial<VersionBundle>,
    params?: FieldsParam<TSchema>,
  ): Promise<VersionBundleEntity<TSchema>> {
    return this.fetch<VersionBundleEntity<TSchema>>(
      ...new RequestBuilder("api/admin/customFieldSettings/bundles/version", { fields }, params).post(body),
    )
  }

  /**
   * Get attributes of a version bundle with a specific ID.
   * @param bundleId - The database ID of the bundle.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of VersionBundle attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the version bundle with the specified ID.
   */
  async getVersionBundleById<TSchema extends VersionBundleSchema>(
    bundleId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<VersionBundleEntity<TSchema>> {
    return this.fetch<VersionBundleEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/customFieldSettings/bundles/version/${bundleId}`, { fields }, params).get(),
    )
  }

  /**
   * Update a version bundle with a specific ID.
   * @param bundleId - The database ID of the bundle.
   * @param body - The updated version bundle data.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of VersionBundle attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the updated version bundle.
   */
  async updateVersionBundle<TSchema extends VersionBundleSchema>(
    bundleId: string,
    body: DeepPartial<VersionBundle>,
    params?: FieldsParam<TSchema>,
  ): Promise<VersionBundleEntity<TSchema>> {
    return this.fetch<VersionBundleEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/customFieldSettings/bundles/version/${bundleId}`, { fields }, params).post(body),
    )
  }

  /**
   * Delete a version bundle with the specific ID.
   * @param bundleId - The database ID of the version bundle.
   * @param params - Optional parameters for response filtering and pagination.
   * @param params.fields - A list of VersionBundleElement attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves when the version bundle is deleted.
   */
  async deleteVersionBundle<TSchema extends VersionBundleSchema>(
    bundleId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<VersionBundleEntity<TSchema>> {
    return this.fetch<VersionBundleEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/customFieldSettings/bundles/version/${bundleId}`, { fields }, params).delete(),
    )
  }

  /**
   * Get the list of all version values in a specific version bundle.
   * @param bundleId - The database ID of the version bundle.
   * @param params - Optional parameters for response filtering and pagination.
   * @param params.fields - A list of VersionBundleElement attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @param params.$top - Maximum number of entries to return in the response.
   * @param params.$skip - Number of entries to skip before returning the first one.
   * @returns A promise that resolves to the list of version values in the bundle.
   */
  async getVersionBundleValues<TSchema extends VersionBundleElementSchema>(
    bundleId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<VersionBundleElementEntity<TSchema>[]> {
    return this.fetch<VersionBundleElementEntity<TSchema>[]>(
      ...new RequestBuilder(
        `api/admin/customFieldSettings/bundles/version/${bundleId}/values`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Add a new version to the bundle.
   * @param bundleId - The database ID of the version bundle.
   * @param body - The details of the new version (required: name).
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of VersionBundleElement attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the added version element.
   */
  async addVersionToBundle<TSchema extends VersionBundleElementSchema>(
    bundleId: string,
    body: { name: string } & DeepPartial<VersionBundleElement>,
    params?: FieldsParam<TSchema>,
  ): Promise<VersionBundleElementEntity<TSchema>> {
    return this.fetch<VersionBundleElementEntity<TSchema>>(
      ...new RequestBuilder(
        `api/admin/customFieldSettings/bundles/version/${bundleId}/values`,
        { fields },
        params,
      ).post(body),
    )
  }

  /**
   * Update a specific version value in the bundle.
   * @param bundleId - The database ID of the version bundle.
   * @param elementId - The database ID of the version value.
   * @param body - The updated version value data.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of VersionBundleElement attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the updated version element.
   */
  async updateVersionBundleValue<TSchema extends VersionBundleElementSchema>(
    bundleId: string,
    elementId: string,
    body: DeepPartial<VersionBundleElement>,
    params?: FieldsParam<TSchema>,
  ): Promise<VersionBundleElementEntity<TSchema>> {
    return this.fetch<VersionBundleElementEntity<TSchema>>(
      ...new RequestBuilder(
        `api/admin/customFieldSettings/bundles/version/${bundleId}/values/${elementId}`,
        { fields },
        params,
      ).post(body),
    )
  }

  /**
   * Remove a specific version from the bundle.
   * @param bundleId - The database ID of the version bundle.
   * @param elementId - The database ID of the version value.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of VersionBundleElement attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves when the version value is removed.
   */
  async removeVersionFromBundle<TSchema extends VersionBundleElementSchema>(
    bundleId: string,
    elementId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<VersionBundleElementEntity<TSchema>> {
    return this.fetch<VersionBundleElementEntity<TSchema>>(
      ...new RequestBuilder(
        `api/admin/customFieldSettings/bundles/version/${bundleId}/values/${elementId}`,
        { fields },
        params,
      ).delete(),
    )
  }
}
