import type { Schema, FieldsParam, Entity, DatabaseBackupSettings, BackupStatus, DeepPartial } from "../../types"
import { fields, RequestBuilder } from "../../utils"
import { ResourceApi } from "../common"

type DatabaseBackupSettingsSchema = Schema<DatabaseBackupSettings>
type BackupStatusSchema = Schema<BackupStatus>

type DatabaseBackupSettingsEntity<TSchema extends DatabaseBackupSettingsSchema> = Entity<
  DatabaseBackupSettings,
  TSchema
>
type BackupStatusEntity<TSchema extends BackupStatusSchema> = Entity<BackupStatus, TSchema>

export class DatabaseBackupSettingsApi extends ResourceApi {
  /**
   * Read the database backup settings.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of DatabaseBackupSettings attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the current database backup settings.
   */
  async getDatabaseBackupSettings<TSchema extends DatabaseBackupSettingsSchema>(
    params?: FieldsParam<TSchema>,
  ): Promise<DatabaseBackupSettingsEntity<TSchema>> {
    return this.youtrack.fetch<DatabaseBackupSettingsEntity<TSchema>>(
      new RequestBuilder("api/admin/databaseBackup/settings", { fields }, params).get(),
    )
  }

  /**
   * Update the database backup settings.
   * @param body - The updated database backup settings.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of DatabaseBackupSettings attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the updated database backup settings.
   */
  async updateDatabaseBackupSettings<TSchema extends DatabaseBackupSettingsSchema>(
    body: DeepPartial<DatabaseBackupSettings>,
    params?: FieldsParam<TSchema>,
  ): Promise<DatabaseBackupSettingsEntity<TSchema>> {
    return this.youtrack.fetch<DatabaseBackupSettingsEntity<TSchema>>(
      new RequestBuilder("api/admin/databaseBackup/settings", { fields: fields }, params).post(body),
    )
  }

  /**
   * Read the status of the backup process.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of BackupStatus attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the current backup status.
   */
  async getBackupStatus<TSchema extends BackupStatusSchema>(
    params?: FieldsParam<TSchema>,
  ): Promise<BackupStatusEntity<TSchema>> {
    return this.youtrack.fetch<BackupStatusEntity<TSchema>>(
      new RequestBuilder("api/admin/databaseBackup/settings/backupStatus", { fields }, params).get(),
    )
  }
}
