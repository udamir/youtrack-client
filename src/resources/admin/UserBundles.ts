import type { Schema, UserBundle, FieldsParam, Entity, ListParams, UserBundleElement } from "../../types"
import { fields, queryParams } from "../../utils"
import { ResourceApi } from "../common"

type UserBundleSchema = Schema<UserBundle>
type UserBundleElementSchema = Schema<UserBundleElement>

type UserBundleEntity<TSchema extends UserBundleSchema> = Entity<UserBundle, TSchema>
type UserBundleElementEntity<TSchema extends UserBundleElementSchema> = Entity<UserBundleElement, TSchema>

export class UserBundlesApi extends ResourceApi {
  // TODO
}