import type { Entity, ListParams, Schema } from "../types"
import type { Issue } from "../types/entities/Issue"
import { ResourceApi } from "./common"

export type IssueSchema = Schema<Issue>
export type IssueEntity<TSchema extends IssueSchema> = Entity<Issue, TSchema>

export type GetIssuesParams<T extends IssueSchema> = ListParams & {
  fields?: T
  customFields?: string[]
}

export class IssuesApi extends ResourceApi {}
