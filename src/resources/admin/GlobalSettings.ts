import type {
  Schema,
  FieldsParam,
  Entity,
  GlobalSettings,
  AppearanceSettings,
  License,
  LocaleSettings,
  NotificationSettings,
  RestCorsSettings,
  SystemSettings,
} from "../../types"
import { fields, RequestBuilder } from "../../utils"
import { ResourceApi } from "../common"

type GlobalSettingsSchema = Schema<GlobalSettings>
type AppearanceSettingsSchema = Schema<AppearanceSettings>
type LicenseSchema = Schema<License>
type LocaleSettingsSchema = Schema<LocaleSettings>
type NotificationSettingsSchema = Schema<NotificationSettings>
type RestCorsSettingsSchema = Schema<RestCorsSettings>
type SystemSettingsSchema = Schema<SystemSettings>

type GlobalSettingsEntity<TSchema extends GlobalSettingsSchema> = Entity<GlobalSettings, TSchema>
type AppearanceSettingsEntity<TSchema extends AppearanceSettingsSchema> = Entity<AppearanceSettings, TSchema>
type LicenseEntity<TSchema extends LicenseSchema> = Entity<License, TSchema>
type LocaleSettingsEntity<TSchema extends LocaleSettingsSchema> = Entity<LocaleSettings, TSchema>
type NotificationSettingsEntity<TSchema extends NotificationSettingsSchema> = Entity<NotificationSettings, TSchema>
type RestCorsSettingsEntity<TSchema extends RestCorsSettingsSchema> = Entity<RestCorsSettings, TSchema>
type SystemSettingsEntity<TSchema extends SystemSettingsSchema> = Entity<SystemSettings, TSchema>

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

  /**
   * Read the visual settings of the YouTrack service.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of AppearanceSettings attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the visual settings of the service.
   */
  async getAppearanceSettings<TSchema extends AppearanceSettingsSchema>(
    params?: FieldsParam<TSchema>,
  ): Promise<AppearanceSettingsEntity<TSchema>> {
    return this.fetch<AppearanceSettingsEntity<TSchema>>(
      ...new RequestBuilder("api/admin/globalSettings/appearanceSettings", { fields }, params).get(),
    )
  }

  /**
   * Change the visual settings of the YouTrack service.
   * @param body - The updated appearance settings.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of AppearanceSettings attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the updated visual settings.
   */
  async updateAppearanceSettings<TSchema extends AppearanceSettingsSchema>(
    body: Partial<Omit<AppearanceSettings, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<AppearanceSettingsEntity<TSchema>> {
    return this.fetch<AppearanceSettingsEntity<TSchema>>(
      ...new RequestBuilder("api/admin/globalSettings/appearanceSettings", { fields }, params).post(body),
    )
  }

  /**
   * Read the license of the YouTrack service.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of License attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the current license settings.
   */
  async getLicense<TSchema extends LicenseSchema>(params?: FieldsParam<TSchema>): Promise<LicenseEntity<TSchema>> {
    return this.fetch<LicenseEntity<TSchema>>(
      ...new RequestBuilder("api/admin/globalSettings/license", { fields }, params).get(),
    )
  }

  /**
   * Change the license of the YouTrack service.
   * @param body - The updated license settings.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of License attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the updated license settings.
   */
  async updateLicense<TSchema extends LicenseSchema>(
    body: Partial<Omit<License, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<LicenseEntity<TSchema>> {
    return this.fetch<LicenseEntity<TSchema>>(
      ...new RequestBuilder("api/admin/globalSettings/license", { fields }, params).post(body),
    )
  }

  /**
   * Read the current system language of the YouTrack service.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of LocaleSettings attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the current locale settings.
   */
  async getLocaleSettings<TSchema extends LocaleSettingsSchema>(
    params?: FieldsParam<TSchema>,
  ): Promise<LocaleSettingsEntity<TSchema>> {
    return this.fetch<LocaleSettingsEntity<TSchema>>(
      ...new RequestBuilder("api/admin/globalSettings/localeSettings", { fields }, params).get(),
    )
  }

  /**
   * Change the system language of the YouTrack service.
   * @param body - The updated locale settings (including the target locale).
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of LocaleSettings attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the updated locale settings.
   */
  async updateLocaleSettings<TSchema extends LocaleSettingsSchema>(
    body: Partial<Omit<LocaleSettings, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<LocaleSettingsEntity<TSchema>> {
    return this.fetch<LocaleSettingsEntity<TSchema>>(
      ...new RequestBuilder("api/admin/globalSettings/localeSettings", { fields }, params).post(body),
    )
  }

  /**
   * Read the notification settings of the YouTrack service.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of NotificationSettings attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the current notification settings.
   */
  async getNotificationSettings<TSchema extends NotificationSettingsSchema>(
    params?: FieldsParam<TSchema>,
  ): Promise<NotificationSettingsEntity<TSchema>> {
    return this.fetch<NotificationSettingsEntity<TSchema>>(
      ...new RequestBuilder("api/admin/globalSettings/notificationSettings", { fields }, params).get(),
    )
  }

  /**
   * Change the notification settings of the YouTrack service.
   * @param body - The updated notification settings.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of NotificationSettings attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the updated notification settings.
   */
  async updateNotificationSettings<TSchema extends NotificationSettingsSchema>(
    body: Partial<Omit<NotificationSettings, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<NotificationSettingsEntity<TSchema>> {
    return this.fetch<NotificationSettingsEntity<TSchema>>(
      ...new RequestBuilder("api/admin/globalSettings/notificationSettings", { fields }, params).post(body),
    )
  }

  /**
   * Read the Resource Sharing (CORS) settings of the YouTrack service.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of RestCorsSettings attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the current RestCors settings.
   */
  async getRestSettings<TSchema extends RestCorsSettingsSchema>(
    params?: FieldsParam<TSchema>,
  ): Promise<RestCorsSettingsEntity<TSchema>> {
    return this.fetch<RestCorsSettingsEntity<TSchema>>(
      ...new RequestBuilder("api/admin/globalSettings/restSettings", { fields }, params).get(),
    )
  }

  /**
   * Change the Resource Sharing (CORS) settings of the YouTrack service.
   * @param body - The updated CORS settings.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of RestCorsSettings attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the updated RestCors settings.
   */
  async updateRestSettings<TSchema extends RestCorsSettingsSchema>(
    body: Partial<Omit<RestCorsSettings, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<RestCorsSettingsEntity<TSchema>> {
    return this.fetch<RestCorsSettingsEntity<TSchema>>(
      ...new RequestBuilder("api/admin/globalSettings/restSettings", { fields }, params).post(body),
    )
  }

  /**
   * Read the System settings of the YouTrack service.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of SystemSettings attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the current System settings.
   */
  async getSystemSettings<TSchema extends SystemSettingsSchema>(
    params?: FieldsParam<TSchema>,
  ): Promise<SystemSettingsEntity<TSchema>> {
    return this.fetch<SystemSettingsEntity<TSchema>>(
      ...new RequestBuilder("api/admin/globalSettings/systemSettings", { fields }, params).get(),
    )
  }

  /**
   * Change the System settings of the YouTrack service.
   * @param body - The updated system settings.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of SystemSettings attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the updated System settings.
   */
  async updateSystemSettings<TSchema extends SystemSettingsSchema>(
    body: Partial<Omit<SystemSettings, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<SystemSettingsEntity<TSchema>> {
    return this.fetch<SystemSettingsEntity<TSchema>>(
      ...new RequestBuilder("api/admin/globalSettings/systemSettings", { fields }, params).post(body),
    )
  }
}
