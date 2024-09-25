import type { Schema, FieldsParam, Entity, Telemetry } from "../../types"
import { fields, RequestBuilder } from "../../utils"
import { ResourceApi } from "../common"

type TelemetrySchema = Schema<Telemetry>
type TelemetryEntity<TSchema extends TelemetrySchema> = Entity<Telemetry, TSchema>

export class TelemetryDataApi extends ResourceApi {
  /**
   * Read available telemetry data of the YouTrack service.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of Telemetry attributes that should be returned in the response. If no field is specified, only the entityID is returned.
   * @returns A promise that resolves to the telemetry data of the YouTrack service.
   */
  async getTelemetryData<TSchema extends TelemetrySchema>(
    params?: FieldsParam<TSchema>,
  ): Promise<TelemetryEntity<TSchema>> {
    return this.youtrack.fetch<TelemetryEntity<TSchema>>(
      new RequestBuilder("api/admin/telemetry", { fields }, params).get(),
    )
  }
}
