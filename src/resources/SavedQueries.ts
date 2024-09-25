import type { DeepPartial, Entity, FieldsParam, ListParams, SavedQuery, Schema } from "../types"
import { fields, queryParams, RequestBuilder } from "../utils"
import { ResourceApi } from "./common"

type SavedQuerySchema = Schema<SavedQuery>
type SavedQueryEntity<TSchema extends SavedQuerySchema> = Entity<SavedQuery, TSchema>

/**
 * This resource lets you access and work with saved searches in YouTrack.
 * https://www.jetbrains.com/help/youtrack/devportal/resource-api-savedQueries.html
 */
export class SavedQueriesApi extends ResourceApi {
  /**
   * Get all saved searches that are visible to the current user.
   * @param fields - A list of SavedQuery attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param top - Optional. Lets you specify the maximum number of entries that are returned in the response. If not set, the server limits the maximum number of returned entries.
   * @param skip - Optional. Lets you set a number of returned entities to skip before returning the first one.
   * @returns A list of saved queries visible to the current user.
   */
  async getSavedQueries<TSchema extends SavedQuerySchema>(
    params?: ListParams & FieldsParam<TSchema>,
  ): Promise<SavedQueryEntity<TSchema>[]> {
    return this.youtrack.fetch<SavedQueryEntity<TSchema>[]>(
      new RequestBuilder("api/savedQueries", { fields, ...queryParams("$top", "$skip") }, params).get(),
    )
  }

  /**
   * Create a new saved search.
   * @param body - Required fields: name, query.
   * @param fields - A list of SavedQuery attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The created saved search.
   */
  async createSavedQuery<TSchema extends SavedQuerySchema>(
    body: { name: string; query: string } | DeepPartial<SavedQuery>,
    params?: FieldsParam<TSchema>,
  ): Promise<SavedQueryEntity<TSchema>> {
    return this.youtrack.fetch<SavedQueryEntity<TSchema>>(
      new RequestBuilder("api/savedQueries", { fields }, params).post(body),
    )
  }

  /**
   * Read settings of the saved search with the specified ID.
   * @param queryId - Id of the saved search.
   * @param fields - A list of SavedQuery attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The settings of the specified saved search.
   */
  async getSavedQueryById<TSchema extends SavedQuerySchema>(
    queryId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<SavedQueryEntity<TSchema>> {
    return this.youtrack.fetch<SavedQueryEntity<TSchema>>(
      new RequestBuilder(`api/savedQueries/${queryId}`, { fields }, params).get(),
    )
  }

  /**
   * Update settings of the saved search with the specified ID.
   * @param queryId - Id of the saved search.
   * @param body - The fields to update. Provide the fields that need to be modified.
   * @param fields - A list of SavedQuery attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The updated saved search.
   */
  async updateSavedQuery<TSchema extends SavedQuerySchema>(
    queryId: string,
    body: DeepPartial<SavedQuery>,
    params?: FieldsParam<TSchema>,
  ): Promise<SavedQueryEntity<TSchema>> {
    return this.youtrack.fetch<SavedQueryEntity<TSchema>>(
      new RequestBuilder(`api/savedQueries/${queryId}`, { fields }, params).post(body),
    )
  }

  /**
   * Delete the saved search with the specified ID.
   * @param queryId - Database ID of the saved search.
   * @param params - A list of SavedQuery attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The deleted saved search.
   */
  async deleteSavedQuery<TSchema extends SavedQuerySchema>(
    queryId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<SavedQueryEntity<TSchema>> {
    return this.youtrack.fetch<SavedQueryEntity<TSchema>>(
      new RequestBuilder(`api/savedQueries/${queryId}`, { fields }, params).delete(),
    )
  }
}
