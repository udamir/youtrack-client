import type { Schema, StateBundle, FieldsParam, Entity, ListParams, StateBundleElement } from "../../types"
import { fields, queryParams } from "../../utils"
import { ResourceApi } from "../common"

type StateBundleSchema = Schema<StateBundle>
type StateBundleElementSchema = Schema<StateBundleElement>

type StateBundleEntity<TSchema extends StateBundleSchema> = Entity<StateBundle, TSchema>
type StateBundleElementEntity<TSchema extends StateBundleElementSchema> = Entity<StateBundleElement, TSchema>

export class StateBundlesApi extends ResourceApi {
  // TODO
}