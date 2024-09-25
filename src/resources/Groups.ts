import type { Entity, FieldsParam, ListParams, Schema, UserGroup } from "../types"
import { fields, queryParams, RequestBuilder } from "../utils"
import { ResourceApi } from "./common"

type UserGroupSchema = Schema<UserGroup>
type UserGroupEntity<TSchema extends UserGroupSchema> = Entity<UserGroup, TSchema>

/**
 * This resource lets you read the list of user groups and specific user group in YouTrack.
 * https://www.jetbrains.com/help/youtrack/devportal/resource-api-groups.html
 */
export class GroupsApi extends ResourceApi {
  /**
   * Read the list of user groups in YouTrack.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of UserGroup attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Lets you specify the maximum number of entries that are returned in the response.
   * @param params.$skip - Optional. Lets you set a number of returned entities to skip before returning the first one.
   * @returns The list of user groups.
   */
  async getUserGroups<TSchema extends UserGroupSchema>(
    params?: FieldsParam<TSchema> | ListParams,
  ): Promise<UserGroupEntity<TSchema>> {
    return this.youtrack.fetch<UserGroupEntity<TSchema>>(
      new RequestBuilder("api/groups", { fields, ...queryParams("$top", "$skip") }, params).get(),
    )
  }

  /**
   * Read attributes of the specific user group.
   * @param groupId - Database ID of the user group in YouTrack.
   * @param params.fields - A list of UserGroup attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns The user group with the specified ID.
   */
  async getUserGroupById<TSchema extends UserGroupSchema>(
    groupId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<UserGroupEntity<TSchema>> {
    return this.youtrack.fetch<UserGroupEntity<TSchema>>(
      new RequestBuilder(`api/groups/${groupId}`, { fields }, params).get(),
    )
  }
}
