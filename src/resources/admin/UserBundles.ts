import type { Schema, UserBundle, FieldsParam, Entity, ListParams, User, UserGroup, DeepPartial } from "../../types"
import { fields, queryParams, RequestBuilder } from "../../utils"
import { ResourceApi } from "../common"

type UserBundleSchema = Schema<UserBundle>
type UserSchema = Schema<User>
type UserGroupSchema = Schema<UserGroup>

type UserBundleEntity<TSchema extends UserBundleSchema> = Entity<UserBundle, TSchema>
type UserEntity<TSchema extends UserSchema> = Entity<User, TSchema>
type UserGroupEntity<TSchema extends UserGroupSchema> = Entity<UserGroup, TSchema>

export class UserBundlesApi extends ResourceApi {
  /**
   * Get the list of all available user bundles in the system.
   * @param params - Optional parameters for response filtering and pagination.
   * @param params.fields - A list of UserBundle attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @param params.$top - Maximum number of entries to return in the response.
   * @param params.$skip - Number of entries to skip before returning the first one.
   * @returns A promise that resolves to the list of user bundles.
   */
  async getUserBundles<TSchema extends UserBundleSchema>(
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<UserBundleEntity<TSchema>[]> {
    return this.youtrack.fetch<UserBundleEntity<TSchema>[]>(
      new RequestBuilder(
        "api/admin/customFieldSettings/bundles/user",
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Create a new user bundle in the system.
   * @param body - The details of the new user bundle.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of UserBundle attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the created user bundle.
   */
  async createUserBundle<TSchema extends UserBundleSchema>(
    body: DeepPartial<UserBundle>,
    params?: FieldsParam<TSchema>,
  ): Promise<UserBundleEntity<TSchema>> {
    return this.youtrack.fetch<UserBundleEntity<TSchema>>(
      new RequestBuilder("api/admin/customFieldSettings/bundles/user", { fields }, params).post(body),
    )
  }

  /**
   * Get attributes of a user bundle with a specific ID.
   * @param bundleId - The database ID of the bundle.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of UserBundle attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the user bundle with the specified ID.
   */
  async getUserBundleById<TSchema extends UserBundleSchema>(
    bundleId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<UserBundleEntity<TSchema>> {
    return this.youtrack.fetch<UserBundleEntity<TSchema>>(
      new RequestBuilder(`api/admin/customFieldSettings/bundles/user/${bundleId}`, { fields }, params).get(),
    )
  }

  /**
   * Update a user bundle with a specific ID.
   * @param bundleId - The database ID of the bundle.
   * @param body - The updated user bundle data.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of UserBundle attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the updated user bundle.
   */
  async updateUserBundle<TSchema extends UserBundleSchema>(
    bundleId: string,
    body: DeepPartial<UserBundle>,
    params?: FieldsParam<TSchema>,
  ): Promise<UserBundleEntity<TSchema>> {
    return this.youtrack.fetch<UserBundleEntity<TSchema>>(
      new RequestBuilder(`api/admin/customFieldSettings/bundles/user/${bundleId}`, { fields }, params).post(body),
    )
  }

  /**
   * Delete a user bundle with the specific ID.
   * @param bundleId - The database ID of the user bundle.
   * @param params - Optional parameters for response filtering and pagination.
   * @param params.fields - A list of UserBundleElement attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves when the user bundle is deleted.
   */
  async deleteUserBundle<TSchema extends UserBundleSchema>(
    bundleId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<UserBundleEntity<TSchema>> {
    return this.youtrack.fetch<UserBundleEntity<TSchema>>(
      new RequestBuilder(`api/admin/customFieldSettings/bundles/user/${bundleId}`, { fields }, params).delete(),
    )
  }

  /**
   * Get the list of all users that the user bundle contains.
   * @param bundleId - The database ID of the user bundle.
   * @param params - Optional parameters for response filtering and pagination.
   * @param params.fields - A list of User attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @param params.$top - Maximum number of entries to return in the response.
   * @param params.$skip - Number of entries to skip before returning the first one.
   * @returns A promise that resolves to the list of users in the bundle.
   */
  async getUserBundleAggregatedUsers<TSchema extends UserSchema>(
    bundleId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<UserEntity<TSchema>[]> {
    return this.youtrack.fetch<UserEntity<TSchema>[]>(
      new RequestBuilder(
        `api/admin/customFieldSettings/bundles/user/${bundleId}/aggregatedUsers`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Get the list of all groups that are added to a specific user bundle.
   * @param bundleId - The database ID of the user bundle.
   * @param params - Optional parameters for response filtering and pagination.
   * @param params.fields - A list of UserGroup attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @param params.$top - Maximum number of entries to return in the response.
   * @param params.$skip - Number of entries to skip before returning the first one.
   * @returns A promise that resolves to the list of groups in the bundle.
   */
  async getUserBundleUserGroups<TSchema extends UserGroupSchema>(
    bundleId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<UserGroupEntity<TSchema>[]> {
    return this.youtrack.fetch<UserGroupEntity<TSchema>[]>(
      new RequestBuilder(
        `api/admin/customFieldSettings/bundles/user/${bundleId}/groups`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Add an existing group to the bundle.
   * @param bundleId - The database ID of the user bundle.
   * @param body - The ID of the group to add to the bundle.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of UserGroup attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the added group.
   */
  async addUserGroupToUserBundle<TSchema extends UserGroupSchema>(
    bundleId: string,
    body: { id: string },
    params?: FieldsParam<TSchema>,
  ): Promise<UserGroupEntity<TSchema>> {
    return this.youtrack.fetch<UserGroupEntity<TSchema>>(
      new RequestBuilder(`api/admin/customFieldSettings/bundles/user/${bundleId}/groups`, { fields }, params).post(
        body,
      ),
    )
  }

  /**
   * Get a specific user group that belongs to the user bundle.
   * @param bundleId - The database ID of the user bundle.
   * @param groupId - The database ID of the user group.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of UserGroup attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the group with the specified ID.
   */
  async getUserGroupInBundleById<TSchema extends UserGroupSchema>(
    bundleId: string,
    groupId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<UserGroupEntity<TSchema>> {
    return this.youtrack.fetch<UserGroupEntity<TSchema>>(
      new RequestBuilder(
        `api/admin/customFieldSettings/bundles/user/${bundleId}/groups/${groupId}`,
        { fields },
        params,
      ).get(),
    )
  }

  /**
   * Remove a specific group from the bundle.
   * @param bundleId - The database ID of the user bundle.
   * @param groupId - The database ID of the user group to remove.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of UserGroup attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves when the group is removed from the bundle.
   */
  async deleteUserGroupFromUserBundle<TSchema extends UserGroupSchema>(
    bundleId: string,
    groupId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<UserGroupEntity<TSchema>> {
    return this.youtrack.fetch<UserGroupEntity<TSchema>>(
      new RequestBuilder(
        `api/admin/customFieldSettings/bundles/user/${bundleId}/groups/${groupId}`,
        { fields },
        params,
      ).delete(),
    )
  }

  /**
   * Get the list of all individual user accounts added to a specific user bundle.
   * @param bundleId - The database ID of the user bundle.
   * @param params - Optional parameters for response filtering and pagination.
   * @param params.fields - A list of User attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @param params.$top - Maximum number of entries to return in the response.
   * @param params.$skip - Number of entries to skip before returning the first one.
   * @returns A promise that resolves to the list of users in the bundle.
   */
  async getUserBundleIndividualUsers<TSchema extends UserSchema>(
    bundleId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<UserEntity<TSchema>[]> {
    return this.youtrack.fetch<UserEntity<TSchema>[]>(
      new RequestBuilder(
        `api/admin/customFieldSettings/bundles/user/${bundleId}/individuals`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Add an existing user to the bundle.
   * @param bundleId - The database ID of the user bundle.
   * @param body - The ID of the user to add to the bundle.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of User attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the added user.
   */
  async addIndividualUserToUserBundle<TSchema extends UserSchema>(
    bundleId: string,
    body: { id: string },
    params?: FieldsParam<TSchema>,
  ): Promise<UserEntity<TSchema>> {
    return this.youtrack.fetch<UserEntity<TSchema>>(
      new RequestBuilder(`api/admin/customFieldSettings/bundles/user/${bundleId}/individuals`, { fields }, params).post(
        body,
      ),
    )
  }

  /**
   * Get a specific user from the bundle.
   * @param bundleId - The database ID of the user bundle.
   * @param userId - The database ID of the user.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of User attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the user with the specified ID.
   */
  async getIndividualUserInBundleById<TSchema extends UserSchema>(
    bundleId: string,
    userId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<UserEntity<TSchema>> {
    return this.youtrack.fetch<UserEntity<TSchema>>(
      new RequestBuilder(
        `api/admin/customFieldSettings/bundles/user/${bundleId}/individuals/${userId}`,
        { fields },
        params,
      ).get(),
    )
  }

  /**
   * Remove a specific user from the bundle.
   * @param bundleId - The database ID of the user bundle.
   * @param userId - The database ID of the user to remove.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of User attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves when the user is removed from the bundle.
   */
  async removeIndividualUserFromUserBundle<TSchema extends UserSchema>(
    bundleId: string,
    userId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<UserEntity<TSchema>> {
    return this.youtrack.fetch<UserEntity<TSchema>>(
      new RequestBuilder(
        `api/admin/customFieldSettings/bundles/user/${bundleId}/individuals/${userId}`,
        { fields },
        params,
      ).delete(),
    )
  }
}
