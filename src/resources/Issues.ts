import type { FilterFields, ListParams, Schema } from "../types"
import type { Issue } from "../types/entities/Issue"

export type IssueSchema = Schema<Issue>
export type IssueFiltered<TSchema extends IssueSchema> = FilterFields<Issue, TSchema>

export type GetIssuesParams<T extends IssueSchema> = ListParams & {
  fields?: T
  customFields?: string[]
}
