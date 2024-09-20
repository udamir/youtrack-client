import type { Schema, VersionBundle, FieldsParam, Entity, ListParams, VersionBundleElement } from "../../types"
import { fields, queryParams } from "../../utils"
import { ResourceApi } from "../common"

type VersionBundleSchema = Schema<VersionBundle>
type VersionBundleElementSchema = Schema<VersionBundleElement>

type VersionBundleEntity<TSchema extends VersionBundleSchema> = Entity<VersionBundle, TSchema>
type VersionBundleElementEntity<TSchema extends VersionBundleElementSchema> = Entity<VersionBundleElement, TSchema>

export class VersionBundlesApi extends ResourceApi {
  // TODO
}