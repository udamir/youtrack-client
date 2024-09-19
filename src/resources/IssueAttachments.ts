import type { Entity, FieldsParam, ListParams, MuteUpdateNotificationsParam, Schema, IssueAttachment } from "../types"
import { fields, queryParams, RequestBuilder } from "../utils"
import { ResourceApi } from "./common"

type IssueAttachmentSchema = Schema<IssueAttachment>
type IssueAttachmentEntity<TSchema extends IssueAttachmentSchema> = Entity<IssueAttachment, TSchema>

/**
 * Resource that provides access to issues.
 * https://www.jetbrains.com/help/youtrack/devportal/resource-api-issues.html
 */
export class IssueAttechmentsApi extends ResourceApi {
  /**
   * Get a list of all attachments of the specific issue.
   * @param issueId - The Id of the issue.
   * @param params - Parameters for the request.
   * @param params.fields - A list of IssueAttachment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Specifies the maximum number of entries to be returned. Defaults to the server limit if not set.
   * @param params.$skip - Optional. Specifies the number of entities to skip before returning the first one.
   * @returns A promise that resolves to the list of issue attachments.
   */
  async getIssueAttachments<TSchema extends IssueAttachmentSchema>(
    issueId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<IssueAttachmentEntity<TSchema>[]> {
    return this.fetch<IssueAttachmentEntity<TSchema>[]>(
      ...new RequestBuilder(
        `api/issues/${issueId}/attachments`,
        { fields, ...queryParams("$skip", "$top") },
        params,
      ).get(),
    )
  }

  /**
   * Add an attachment to the issue.
   * @param issueId - The Id of the issue.
   * @param attachment - The attachment data to be added.
   * @param params - Parameters for the request.
   * @param params.fields - A list of IssueAttachment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set to true if no notifications should be sent on changes made by this request.
   * @returns A promise that resolves to the added issue attachment.
   */
  async createIssueAttachment<TSchema extends IssueAttachmentSchema>(
    issueId: string,
    body: FormData,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<IssueAttachmentEntity<TSchema>> {
    return this.fetch<IssueAttachmentEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/attachments`,
        { fields, muteUpdateNotifications: "boolean" },
        params,
      ).postFile(body),
    )
  }

  /**
   * Read a specific attachment of the issue.
   * @param issueId - The Id of the issue.
   * @param attachmentId - The database ID of the attachment.
   * @param params - Parameters for the request.
   * @param params.fields - A list of IssueAttachment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the issue attachment.
   */
  async getIssueAttachmentById<TSchema extends IssueAttachmentSchema>(
    issueId: string,
    attachmentId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueAttachmentEntity<TSchema>> {
    return this.fetch<IssueAttachmentEntity<TSchema>>(
      ...new RequestBuilder(`api/issues/${issueId}/attachments/${attachmentId}`, { fields }, params).get(),
    )
  }

  /**
   * Update a specific attachment.
   * @param issueId - The Id of the issue.
   * @param attachmentId - The database ID of the attachment.
   * @param params - Parameters for the request.
   * @param params.fields - A list of IssueAttachment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the updated issue attachment.
   */
  async updateIssueAttachment<TSchema extends IssueAttachmentSchema>(
    issueId: string,
    attachmentId: string,
    body: Partial<Omit<IssueAttachment, "id">>,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueAttachmentEntity<TSchema>> {
    return this.fetch<IssueAttachmentEntity<TSchema>>(
      ...new RequestBuilder(`api/issues/${issueId}/attachments/${attachmentId}`, { fields }, params).post(body),
    )
  }

  /**
   * Delete a specific attachment.
   * @param issueId - The Id of the issue.
   * @param attachmentId - The database ID of the attachment.
   * @param params - Parameters for the request.
   * @param params.fields - A list of IssueAttachment attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves when the attachment is deleted.
   */
  async deleteIssueAttachment<TSchema extends IssueAttachmentSchema>(
    issueId: string,
    attachmentId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueAttachmentEntity<TSchema>> {
    return this.fetch<IssueAttachmentEntity<TSchema>>(
      ...new RequestBuilder(`api/issues/${issueId}/attachments/${attachmentId}`, { fields }, params).delete(),
    )
  }
}
