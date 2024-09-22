import type { Schema, StateBundle, FieldsParam, Entity, ListParams, StateBundleElement } from "../../types"
import { fields, queryParams, RequestBuilder } from "../../utils"
import { ResourceApi } from "../common"

type StateBundleSchema = Schema<StateBundle>
type StateBundleElementSchema = Schema<StateBundleElement>

type StateBundleEntity<TSchema extends StateBundleSchema> = Entity<StateBundle, TSchema>
type StateBundleElementEntity<TSchema extends StateBundleElementSchema> = Entity<StateBundleElement, TSchema>

export class StateBundlesApi extends ResourceApi {
  /**
   * Get the list of all available state bundles in the system.
   * @param params - Optional parameters for response filtering and pagination.
   * @param params.fields - A list of StateBundle attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @param params.$top - Maximum number of entries to return in the response.
   * @param params.$skip - Number of entries to skip before returning the first one.
   * @returns A promise that resolves to the list of state bundles.
   */
  async getStateBundles<TSchema extends StateBundleSchema>(
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<StateBundleEntity<TSchema>[]> {
    return this.fetch<StateBundleEntity<TSchema>[]>(
      ...new RequestBuilder(
        "api/admin/customFieldSettings/bundles/state",
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Create a new state bundle in the system.
   * @param body - The details of the new state bundle.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of StateBundle attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the created state bundle.
   */
  async createStateBundle<TSchema extends StateBundleSchema>(
    body: Partial<Omit<StateBundle, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<StateBundleEntity<TSchema>> {
    return this.fetch<StateBundleEntity<TSchema>>(
      ...new RequestBuilder("api/admin/customFieldSettings/bundles/state", { fields }, params).post(body),
    )
  }

  /**
   * Get attributes of a state bundle with a specific ID.
   * @param bundleId - The database ID of the bundle.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of StateBundle attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the state bundle with the specified ID.
   */
  async getStateBundleById<TSchema extends StateBundleSchema>(
    bundleId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<StateBundleEntity<TSchema>> {
    return this.fetch<StateBundleEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/customFieldSettings/bundles/state/${bundleId}`, { fields }, params).get(),
    )
  }

  /**
   * Update a state bundle with a specific ID.
   * @param bundleId - The database ID of the bundle.
   * @param body - The updated state bundle data.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of StateBundle attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the updated state bundle.
   */
  async updateStateBundle<TSchema extends StateBundleSchema>(
    bundleId: string,
    body: Partial<Omit<StateBundle, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<StateBundleEntity<TSchema>> {
    return this.fetch<StateBundleEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/customFieldSettings/bundles/state/${bundleId}`, { fields }, params).post(body),
    )
  }

  /**
   * Delete a state bundle with the specific ID.
   * @param bundleId - The database ID of the state bundle.
   * @param params - Optional parameters for response filtering and pagination.
   * @param params.fields - A list of StateBundleElement attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves when the state bundle is deleted.
   */
  async deleteStateBundle<TSchema extends StateBundleSchema>(
    bundleId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<StateBundleEntity<TSchema>> {
    return this.fetch<StateBundleEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/customFieldSettings/bundles/state/${bundleId}`, { fields }, params).delete(),
    )
  }

  /**
   * Get the list of all state values in a specific state bundle.
   * @param bundleId - The database ID of the state bundle.
   * @param params - Optional parameters for response filtering and pagination.
   * @param params.fields - A list of StateBundleElement attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @param params.$top - Maximum number of entries to return in the response.
   * @param params.$skip - Number of entries to skip before returning the first one.
   * @returns A promise that resolves to the list of state values in the bundle.
   */
  async getStateBundleValues<TSchema extends StateBundleElementSchema>(
    bundleId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<StateBundleElementEntity<TSchema>[]> {
    return this.fetch<StateBundleElementEntity<TSchema>[]>(
      ...new RequestBuilder(
        `api/admin/customFieldSettings/bundles/state/${bundleId}/values`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Add a new state to the bundle.
   * @param bundleId - The database ID of the state bundle.
   * @param body - The details of the new state (required: name).
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of StateBundleElement attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the added state element.
   */
  async addStateToBundle<TSchema extends StateBundleElementSchema>(
    bundleId: string,
    body: { name: string } & Partial<Omit<StateBundleElement, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<StateBundleElementEntity<TSchema>> {
    return this.fetch<StateBundleElementEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/customFieldSettings/bundles/state/${bundleId}/values`, { fields }, params).post(
        body,
      ),
    )
  }

  /**
   * Update a specific state value in the bundle.
   * @param bundleId - The database ID of the state bundle.
   * @param elementId - The database ID of the state value.
   * @param body - The updated state value data.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of StateBundleElement attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the updated state element.
   */
  async updateStateBundleValue<TSchema extends StateBundleElementSchema>(
    bundleId: string,
    elementId: string,
    body: Partial<Omit<StateBundleElement, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<StateBundleElementEntity<TSchema>> {
    return this.fetch<StateBundleElementEntity<TSchema>>(
      ...new RequestBuilder(
        `api/admin/customFieldSettings/bundles/state/${bundleId}/values/${elementId}`,
        { fields },
        params,
      ).post(body),
    )
  }

  /**
   * Remove a specific state from the bundle.
   * @param bundleId - The database ID of the state bundle.
   * @param elementId - The database ID of the state value.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of StateBundleElement attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves when the state value is removed.
   */
  async removeStateFromBundle<TSchema extends StateBundleElementSchema>(
    bundleId: string,
    elementId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<StateBundleElementEntity<TSchema>> {
    return this.fetch<StateBundleElementEntity<TSchema>>(
      ...new RequestBuilder(
        `api/admin/customFieldSettings/bundles/state/${bundleId}/values/${elementId}`,
        { fields },
        params,
      ).delete(),
    )
  }
}
