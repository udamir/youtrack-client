import type {
  User,
  GeneralUserProfile,
  NotificationsUserProfile,
  TimeTrackingUserProfile,
  SavedQuery,
  Entity,
  FieldsParam,
  ListParams,
  Schema,
  Tag,
  DeepPartial,
} from "../types"
import { fields, queryParams, RequestBuilder } from "../utils"
import { ResourceApi } from "./common"

type UserSchema = Schema<User>
type GeneralUserProfileSchema = Schema<GeneralUserProfile>
type NotificationsUserProfileSchema = Schema<NotificationsUserProfile>
type TimeTrackingUserProfileSchema = Schema<TimeTrackingUserProfile>
type SavedQuerySchema = Schema<SavedQuery>
type TagSchema = Schema<Tag>

type UserEntity<TSchema extends UserSchema> = Entity<User, TSchema>
type GeneralUserProfileEntity<TSchema extends GeneralUserProfileSchema> = Entity<GeneralUserProfile, TSchema>
type NotificationsUserProfileEntity<TSchema extends NotificationsUserProfileSchema> = Entity<
  NotificationsUserProfile,
  TSchema
>
type TimeTrackingUserProfileEntity<TSchema extends TimeTrackingUserProfileSchema> = Entity<
  TimeTrackingUserProfile,
  TSchema
>
type SavedQueryEntity<TSchema extends SavedQuerySchema> = Entity<SavedQuery, TSchema>
type TagEntity<TSchema extends TagSchema> = Entity<Tag, TSchema>

/**
 * This resource lets you work with user settings in YouTrack.
 * https://www.jetbrains.com/help/youtrack/devportal/resource-api-users.html
 */
export class UsersApi extends ResourceApi {
  /**
   * Read the list of users in YouTrack.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of User attributes to include in the response. If not specified, only the entityID is returned.
   * @param params.$skip - The number of entries to skip in the response. Useful for pagination.
   * @param params.$top - The maximum number of entries to return. If not specified, the server limits the number of entries returned (42 by default).
   * @returns A list of users in YouTrack, with optional pagination.
   */
  async getUsers<TSchema extends UserSchema>(
    params?: ListParams & FieldsParam<TSchema>,
  ): Promise<UserEntity<TSchema>[]> {
    return this.youtrack.fetch<UserEntity<TSchema>[]>(
      new RequestBuilder(
        "api/users",
        {
          fields,
          ...queryParams("$skip", "$top"),
        },
        params,
      ).get(),
    )
  }

  /**
   * Read the settings of the YouTrack profile of a specific user.
   * @param userId - The Id of the user in YouTrack.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of User attributes to include in the response. If not specified, only the entityId is returned.
   * @returns The settings of the specified user's YouTrack profile.
   * @requires Read User Basic permission for basic information, or Read User permission for accessing all data.
   */
  async getUserProfile<TSchema extends UserSchema>(
    userId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<UserEntity<TSchema>> {
    return this.youtrack.fetch<UserEntity<TSchema>>(new RequestBuilder(`api/users/${userId}`, { fields }, params).get())
  }

  /**
   * Get the general settings of the user's profile.
   * Requires 'Read Self' permission to read own profile and 'Read User Full' to read another user's profile.
   * @param userId - The Id of the user in YouTrack.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of GeneralUserProfile attributes to include in the response. If not specified, only the entityId is returned.
   * @returns The general profile settings of the specified user.
   */
  async getUserGeneralProfile<TSchema extends GeneralUserProfileSchema>(
    userId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<GeneralUserProfileEntity<TSchema>> {
    return this.youtrack.fetch<GeneralUserProfileEntity<TSchema>>(
      new RequestBuilder(`api/users/${userId}/profiles/general`, { fields }, params).get(),
    )
  }

  /**
   * Update the general settings of a user's profile.
   * Requires 'Update Self' permission to update own profile and 'Update User' to update another user's profile.
   * @param userId - The Id of the user in YouTrack.
   * @param data - The data to update in the user's general profile.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of GeneralUserProfile attributes to include in the response. If not specified, only the entityId is returned.
   * @returns The updated general profile settings of the specified user.
   */
  async updateUserGeneralProfile<TSchema extends GeneralUserProfileSchema>(
    userID: string,
    data: DeepPartial<GeneralUserProfile>,
    params?: FieldsParam<TSchema>,
  ): Promise<GeneralUserProfileEntity<TSchema>> {
    return this.youtrack.fetch<GeneralUserProfileEntity<TSchema>>(
      new RequestBuilder(`api/users/${userID}/profiles/general`, { fields }, params).post(data),
    )
  }

  /**
   * Get the notification settings of a user's profile.
   * Requires 'Read Self' permission to read own profile and 'Read User Full' to read another user's profile.
   * @param userId - The Id of the user in YouTrack.
   * @param profileId - The Id of the NotificationsUserProfile.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of NotificationsUserProfile attributes to include in the response. If not specified, only the entityId is returned.
   * @returns The notification settings of the specified user's profile.
   */
  async getUserNotificationProfile<TSchema extends NotificationsUserProfileSchema>(
    userId: string,
    profileId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<NotificationsUserProfileEntity<TSchema>> {
    return this.youtrack.fetch<NotificationsUserProfileEntity<TSchema>>(
      new RequestBuilder(`api/users/${userId}/profiles/notifications/${profileId}`, { fields }, params).get(),
    )
  }

  /**
   * Change the notification settings of a user's profile.
   * Requires 'Update Self' permission to update own profile and 'Update User' to update another user's profile.
   * @param userId - The Id of the user in YouTrack.
   * @param profileId - The Id of the NotificationsUserProfile.
   * @param body - The updated notification settings for the user profile.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of NotificationsUserProfile attributes to include in the response. If not specified, only the entityId is returned.
   * @returns The updated notification settings of the user's profile.
   */
  async updateUserNotificationProfile<TSchema extends NotificationsUserProfileSchema>(
    userId: string,
    profileId: string,
    body: DeepPartial<NotificationsUserProfile>,
    params?: FieldsParam<TSchema>,
  ): Promise<NotificationsUserProfileEntity<TSchema>> {
    return this.youtrack.fetch<NotificationsUserProfileEntity<TSchema>>(
      new RequestBuilder(`api/users/${userId}/profiles/notifications/${profileId}`, { fields }, params).post(body),
    )
  }

  /**
   * Get the time tracking settings of a user's profile.
   * Requires 'Read Self' permission to read own profile and 'Read User Full' to read another user's profile.
   * @param userId - The ID of the user in YouTrack.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of TimeTrackingUserProfile attributes to include in the response. If not specified, only the entityId is returned.
   * @returns The time tracking settings of the user's profile.
   */
  async getUserTimeTrackingProfile<TSchema extends TimeTrackingUserProfileSchema>(
    userId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<TimeTrackingUserProfileEntity<TSchema>> {
    return this.youtrack.fetch<TimeTrackingUserProfileEntity<TSchema>>(
      new RequestBuilder(`api/users/${userId}/profiles/timetracking`, { fields }, params).get(),
    )
  }

  /**
   * Update the time tracking settings of a user's profile.
   * Requires 'Update Self' permission to update own profile and 'Update User' permission to update another user's profile.
   * @param userId - The Id of the user in YouTrack.
   * @param data - The updated time tracking settings.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of TimeTrackingUserProfile attributes to include in the response. If not specified, only the entityId is returned.
   * @returns The updated time tracking settings of the user's profile.
   */
  async updateUserTimeTrackingProfile<TSchema extends TimeTrackingUserProfileSchema>(
    userId: string,
    data: DeepPartial<TimeTrackingUserProfile>,
    params?: FieldsParam<TSchema>,
  ): Promise<TimeTrackingUserProfileEntity<TSchema>> {
    return this.youtrack.fetch<TimeTrackingUserProfileEntity<TSchema>>(
      new RequestBuilder(`api/users/${userId}/profiles/timetracking`, { fields }, params).post(data),
    )
  }

  /**
   * Get the list of all saved searches (saved queries) that the specified user created.
   * @param userId - The Id of the user in YouTrack.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of SavedQuery attributes to include in the response. If not specified, only the entityId is returned.
   * @param params.$skip - The number of entities to skip before returning the first one.
   * @param params.$top - The maximum number of entries returned in the response. Defaults to 42 if not set.
   * @returns A list of saved queries created by the user.
   */
  async getUserSavedQueries<TSchema extends SavedQuerySchema>(
    userId: string,
    params?: ListParams & FieldsParam<TSchema>,
  ): Promise<SavedQueryEntity<TSchema>[]> {
    return this.youtrack.fetch<SavedQueryEntity<TSchema>[]>(
      new RequestBuilder(
        `api/users/${userId}/savedQueries`,
        {
          fields,
          $skip: "number",
          $top: "number",
        },
        params,
      ).get(),
    )
  }

  /**
   * Get the list of all tags that belong to the specified user.
   * @param userId - The Id of the user in YouTrack.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of Tag attributes to include in the response. If not specified, only the entityId is returned.
   * @param params.$skip - The number of entities to skip before returning the first one.
   * @param params.$top - The maximum number of entries returned in the response. Defaults to 42 if not set.
   * @returns A list of tags that belong to the user.
   */
  async getUserTags<TSchema extends TagSchema>(
    userId: string,
    params?: ListParams & FieldsParam<TSchema>,
  ): Promise<TagEntity<TSchema>[]> {
    return this.youtrack.fetch<TagEntity<TSchema>[]>(
      new RequestBuilder(
        `api/users/${userId}/tags`,
        {
          fields,
          ...queryParams("$skip", "$top"),
        },
        params,
      ).get(),
    )
  }

  /**
   * Read the profile settings of the currently logged-in user.
   * @param params - Optional parameters for the request.
   * @param params.fields - A list of attributes to include in the response. If not specified, only the entityId is returned.
   * @returns The profile settings of the currently logged-in user.
   */
  async getCurrentUserProfile<TSchema extends UserSchema>(params?: FieldsParam<TSchema>): Promise<UserEntity<TSchema>> {
    return this.youtrack.fetch<UserEntity<TSchema>>(new RequestBuilder("/api/users/me", { fields }, params).get())
  }
}
