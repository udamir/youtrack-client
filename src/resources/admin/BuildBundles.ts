import type { Schema, BuildBundle, FieldsParam, Entity, ListParams, BuildBundleElement, DeepPartial } from "../../types"
import { fields, queryParams, RequestBuilder } from "../../utils"
import { ResourceApi } from "../common"

type BuildBundleSchema = Schema<BuildBundle>
type BuildBundleElementSchema = Schema<BuildBundleElement>

type BuildBundleEntity<TSchema extends BuildBundleSchema> = Entity<BuildBundle, TSchema>
type BuildBundleElementEntity<TSchema extends BuildBundleElementSchema> = Entity<BuildBundleElement, TSchema>

export class BuildBundlesApi extends ResourceApi {
  /**
   * Get all available sets of builds in the system.
   * @param params - Optional parameters.
   * @param params.fields - A list of BuildBundle attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$skip - Optional. The number of returned entities to skip before returning the first one.
   * @param params.$top - Optional. The maximum number of entries that are returned in the response.
   * @returns A promise that resolves to the list of BuildBundle entities.
   */
  async getBuildBundles<TSchema extends BuildBundleSchema>(
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<BuildBundleEntity<TSchema>[]> {
    return this.fetch<BuildBundleEntity<TSchema>[]>(
      ...new RequestBuilder(
        "api/admin/customFieldSettings/bundles/build",
        { fields, ...queryParams("$skip", "$top") },
        params,
      ).get(),
    )
  }

  /**
   * Create a new set of builds.
   * Requires permissions: Update Project or Low-level Admin Write.
   * @param body - The details of the new BuildBundle to create.
   * @param params - Optional parameters.
   * @param params.fields - A list of BuildBundle attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the created BuildBundle entity.
   */
  async createBuildBundle<TSchema extends BuildBundleSchema>(
    body: DeepPartial<BuildBundle>,
    params?: FieldsParam<TSchema>,
  ): Promise<BuildBundleEntity<TSchema>> {
    return this.fetch<BuildBundleEntity<TSchema>>(
      ...new RequestBuilder("api/admin/customFieldSettings/bundles/build", { fields }, params).post(body),
    )
  }

  /**
   * Read a set of builds with the specific ID.
   * Requires read or update access to one of the fields where the bundle is used. If the bundle is not used in any field, Update Project permission is required in at least one project.
   * @param bundleId - The database ID of the build bundle.
   * @param params - Optional parameters.
   * @param params.fields - A list of BuildBundle attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the requested BuildBundle entity.
   */
  async getBuildBundleById<TSchema extends BuildBundleSchema>(
    bundleId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<BuildBundleEntity<TSchema>> {
    return this.fetch<BuildBundleEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/customFieldSettings/bundles/build/${bundleId}`, { fields }, params).get(),
    )
  }

  /**
   * Update the specific set of builds.
   * Requires Update Project permission in all projects where the bundle is used. If the bundle is not used in any field, Update Project permission is required in at least one project.
   * @param bundleId - The database ID of the build bundle.
   * @param body - The udpdated build bundle.
   * @param fields - Optional. A list of BuildBundle attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the updated BuildBundle entity.
   */
  async updateBuildBundle<TSchema extends BuildBundleSchema>(
    bundleId: string,
    body: DeepPartial<BuildBundle>,
    params?: FieldsParam<TSchema>,
  ): Promise<BuildBundleEntity<TSchema>> {
    return this.fetch<BuildBundleEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/customFieldSettings/bundles/build/${bundleId}`, { fields }, params).post(body),
    )
  }

  /**
   * Delete a specific set of builds.
   * Requires Update Project permission in all projects where the bundle is used. If the bundle is not used in any field, Update Project permission is required in at least one project.
   * @param bundleId - The database ID of the build bundle to delete.
   * @param fields - Optional. A list of BuildBundle attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the deleted BuildBundle entity.
   */
  async deleteBuildBundle<TSchema extends BuildBundleSchema>(
    bundleId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<BuildBundleEntity<TSchema>> {
    return this.fetch<BuildBundleEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/customFieldSettings/bundles/build/${bundleId}`, { fields }, params).delete(),
    )
  }

  /**
   * Get the list of all build values in the specific build bundle.
   * @param bundleId - The database ID of the build bundle.
   * @param params - Optional parameters for fields, $skip, and $top.
   * @returns A promise that resolves to a list of BuildBundleElement entities.
   */
  async getBuildBundleValues<TSchema extends BuildBundleElementSchema>(
    bundleId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<BuildBundleElementEntity<TSchema>[]> {
    return this.fetch<BuildBundleElementEntity<TSchema>[]>(
      ...new RequestBuilder(
        `api/admin/customFieldSettings/bundles/build/${bundleId}/values`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Add a new build to the specific build bundle.
   * @param bundleId - The database ID of the build bundle.
   * @param body - The build details, including the required name.
   * @param params - Optional fields to include in the response.
   * @returns A promise that resolves to the newly added BuildBundleElement entity.
   */
  async addBuildToBundle<TSchema extends BuildBundleElementSchema>(
    bundleId: string,
    body: { name: string } & DeepPartial<BuildBundleElement>,
    params?: FieldsParam<TSchema>,
  ): Promise<BuildBundleElementEntity<TSchema>> {
    return this.fetch<BuildBundleElementEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/customFieldSettings/bundles/build/${bundleId}/values`, { fields }, params).post(
        body,
      ),
    )
  }

  /**
   * Get a specific build from the build bundle.
   * @param bundleId - The database ID of the build bundle.
   * @param elementId - The database ID of the build value.
   * @param params - Optional fields to include in the response.
   * @returns A promise that resolves to the specified BuildBundleElement entity.
   */
  async getBuildFromBundle<TSchema extends BuildBundleElementSchema>(
    bundleId: string,
    elementId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<BuildBundleElementEntity<TSchema>> {
    return this.fetch<BuildBundleElementEntity<TSchema>>(
      ...new RequestBuilder(
        `api/admin/customFieldSettings/bundles/build/${bundleId}/values/${elementId}`,
        { fields },
        params,
      ).get(),
    )
  }

  /**
   * Update a specific build in the bundle.
   * @param bundleId - The database ID of the build bundle.
   * @param elementId - The database ID of the build value.
   * @param body - The updated build details.
   * @param params - Optional fields to include in the response.
   * @returns A promise that resolves to the updated BuildBundleElement entity.
   */
  async updateBuildInBundle<TSchema extends BuildBundleElementSchema>(
    bundleId: string,
    elementId: string,
    body: DeepPartial<BuildBundleElement>,
    params?: FieldsParam<TSchema>,
  ): Promise<BuildBundleElementEntity<TSchema>> {
    return this.fetch<BuildBundleElementEntity<TSchema>>(
      ...new RequestBuilder(
        `api/admin/customFieldSettings/bundles/build/${bundleId}/values/${elementId}`,
        { fields },
        params,
      ).post(body),
    )
  }

  /**
   * Remove a specific build from the bundle.
   * @param bundleId - The database ID of the build bundle.
   * @param elementId - The database ID of the build value to remove.
   * @param params - Optional fields to include in the response.
   * @returns A promise that resolves to the removed BuildBundleElement entity.
   */
  async removeBuildFromBundle<TSchema extends BuildBundleElementSchema>(
    bundleId: string,
    elementId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<BuildBundleElementEntity<TSchema>> {
    return this.fetch<BuildBundleElementEntity<TSchema>>(
      ...new RequestBuilder(
        `api/admin/customFieldSettings/bundles/build/${bundleId}/values/${elementId}`,
        { fields },
        params,
      ).delete(),
    )
  }
}
