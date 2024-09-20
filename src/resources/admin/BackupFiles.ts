import type { Schema, FieldsParam, Entity, BackupFile } from "../../types"
import { fields, RequestBuilder } from "../../utils"
import { ResourceApi } from "../common"

type BackupFileSchema = Schema<BackupFile>
type BackupFileEntity<TSchema extends BackupFileSchema> = Entity<BackupFile, TSchema>

export class BackupFilesApi extends ResourceApi {
  /**
   * Get data on the specific backup file.
   * @param fileId - The name of the backup file.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of BackupFile attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the details of the specified backup file.
   */
  async getBackupFileData<TSchema extends BackupFileSchema>(
    fileId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<BackupFileEntity<TSchema>> {
    return this.fetch<BackupFileEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/databaseBackup/backups/${fileId}`, { fields }, params).get(),
    )
  }
}
