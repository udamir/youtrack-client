import type { Schema, FieldsParam, Entity, ListParams, Workflow, WorkflowLog, WorkflowRule } from "../../types"
import { fields, queryParams, RequestBuilder } from "../../utils"
import { ResourceApi } from "../common"

type WorkflowSchema = Schema<Workflow>
type WorkflowLogSchema = Schema<WorkflowLog>
type WorkflowRuleSchema = Schema<WorkflowRule>
type WorkflowEntity<TSchema extends WorkflowSchema> = Entity<Workflow, TSchema>
type WorkflowLogEntity<TSchema extends WorkflowLogSchema> = Entity<WorkflowLog, TSchema>
type WorkflowRuleEntity<TSchema extends WorkflowRuleSchema> = Entity<WorkflowRule, TSchema>

export class WorkflowsApi extends ResourceApi {
  /**
   * Get a list of all workflows in the system.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Maximum number of entries to return. Use -1 for all entries.
   * @param params.$skip - Optional. Number of entries to skip before returning the first one.
   * @param params.query - Optional. Filter workflows by language (e.g., "language:JS,mps").
   * @returns A promise that resolves to a list of Workflow entities.
   */
  async getWorkflows<TSchema extends WorkflowSchema>(
    params?: FieldsParam<TSchema> & ListParams & { query?: string },
  ): Promise<WorkflowEntity<TSchema>[]> {
    return this.youtrack.fetch<WorkflowEntity<TSchema>[]>(
      new RequestBuilder(
        "api/admin/workflows",
        {
          fields,
          ...queryParams("$top", "$skip"),
          query: "string",
        },
        params,
      ).get(),
    )
  }

  /**
   * Get workflow by id.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to a Workflow entity.
   */
  async getWorkflowById<TSchema extends WorkflowSchema>(
    workflowId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<WorkflowEntity<TSchema>> {
    return this.youtrack.fetch<WorkflowEntity<TSchema>>(
      new RequestBuilder(
        `api/admin/workflows/${workflowId}`,
        {
          fields,
        },
        params,
      ).get(),
    )
  }

  /**
   * Download a workflow as a zip file.
   * @param workflowName - The name of the workflow to download.
   * @returns A promise that resolves to a Blob containing the workflow zip file.
   */
  async downloadWorkflow(workflowName: string): Promise<Blob> {
    // Remove @ prefix if present, but don't encode the whole name
    const cleanWorkflowName = workflowName.replace(/^@/, "")

    return this.youtrack.fetch<Blob>({
      url: `api/admin/workflows/${cleanWorkflowName}`,
      method: "GET",
      headers: { Accept: "application/zip" },
    })
  }

  /**
   * Upload a workflow from a zip file.
   * @param workflowName - The name of the workflow (used for the filename).
   * @param file - The zip file containing the workflow data.
   * @returns A promise that resolves when the workflow is successfully uploaded.
   */
  async uploadWorkflow(workflowName: string, file: File | Blob): Promise<void> {
    const formData = new FormData()
    formData.append("file", file, `${workflowName}.zip`)

    return this.youtrack.fetch<void>(new RequestBuilder("api/admin/workflows/import", {}, {}).postFile(formData))
  }

  /**
   * Get workflow rule execution logs.
   * @param workflowId - The ID of the workflow.
   * @param ruleId - The ID of the workflow rule.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of WorkflowLog attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Maximum number of log entries to return. Use -1 for all entries.
   * @param params.query - Optional. Timestamp to filter logs from (logs newer than this timestamp).
   * @returns A promise that resolves to a list of WorkflowLog entities.
   */
  async getWorkflowLogs<TSchema extends WorkflowLogSchema>(
    workflowId: string,
    ruleId: string,
    params?: FieldsParam<TSchema> & { $top?: number; query?: string },
  ): Promise<WorkflowLogEntity<TSchema>[]> {
    return this.youtrack.fetch<WorkflowLogEntity<TSchema>[]>(
      new RequestBuilder(
        `api/admin/workflows/${workflowId}/rules/${ruleId}/logs`,
        {
          fields,
          $top: "number",
          query: "string",
        },
        params,
      ).get(),
    )
  }

  /**
   * Get a specific workflow rule by workflow ID and rule ID.
   * @param workflowId - The ID of the workflow containing the rule.
   * @param ruleId - The ID of the rule to retrieve.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of WorkflowRule attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Maximum number of entries to return. Use -1 for all entries.
   * @param params.query - Optional. Filter query (e.g., "language:JS,visual,mps").
   * @returns A promise that resolves to a WorkflowRule entity.
   */
  async getWorkflowRule<TSchema extends WorkflowRuleSchema>(
    workflowId: string,
    ruleId: string,
    params?: FieldsParam<TSchema> & { $top?: number; query?: string },
  ): Promise<WorkflowRuleEntity<TSchema>> {
    return this.youtrack.fetch<WorkflowRuleEntity<TSchema>>(
      new RequestBuilder(
        `api/admin/workflows/${workflowId}/rules/${ruleId}`,
        {
          fields,
          $top: "number",
          query: "string",
        },
        params,
      ).get(),
    )
  }
}
