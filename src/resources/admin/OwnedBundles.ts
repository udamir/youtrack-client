import type { Schema, OwnedBundle, FieldsParam, Entity, ListParams, OwnedBundleElement } from "../../types"
import { fields, queryParams } from "../../utils"
import { ResourceApi } from "../common"

type OwnedBundleSchema = Schema<OwnedBundle>
type OwnedBundleElementSchema = Schema<OwnedBundleElement>

type OwnedBundleEntity<TSchema extends OwnedBundleSchema> = Entity<OwnedBundle, TSchema>
type OwnedBundleElementEntity<TSchema extends OwnedBundleElementSchema> = Entity<OwnedBundleElement, TSchema>

export class OwnedBundlesApi extends ResourceApi {
  // TODO
}