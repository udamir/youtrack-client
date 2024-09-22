import type {
  Entity,
  FieldsParam,
  ListParams,
  MuteUpdateNotificationsParam,
  Schema,
  Issue,
  IssueLink,
  DeepPartial,
} from "../types"
import { fields, queryParams, RequestBuilder } from "../utils"
import { ResourceApi } from "./common"

type IssueSchema = Schema<Issue>
type IssueLinkSchema = Schema<IssueLink>

type IssueEntity<TSchema extends IssueSchema> = Entity<Issue, TSchema>
type IssueLinkEntity<TSchema extends IssueLinkSchema> = Entity<IssueLink, TSchema>

/**
 * Resource that provides access to issues.
 * https://www.jetbrains.com/help/youtrack/devportal/resource-api-issues.html
 */
export class IssueLinksApi extends ResourceApi {
  /**
   * Get the list of links for the issue.
   * @param issueId - The ID of the issue to retrieve links for.
   * @param params.fields - A list of IssueLink attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Specifies the maximum number of entries to return in the response.
   * @param params.$skip - Optional. Specifies the number of entities to skip before returning the first one.
   * @returns A promise that resolves to the list of issue links.
   */
  async getIssueLinks<TSchema extends IssueLinkSchema>(
    issueId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<IssueLinkEntity<TSchema>[]> {
    return this.fetch<IssueLinkEntity<TSchema>[]>(
      ...new RequestBuilder(`api/issues/${issueId}/links`, { fields, ...queryParams("$top", "$skip") }, params).get(),
    )
  }

  /**
   * Get the data for a specific link of the issue.
   * @param issueId - The ID of the issue.
   * @param linkId - The database ID of the issue link.
   * @param params.fields - A list of IssueLink attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the issue link data.
   */
  async getIssueLinkById<TSchema extends IssueLinkSchema>(
    issueId: string,
    linkId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueLinkEntity<TSchema>> {
    return this.fetch<IssueLinkEntity<TSchema>>(
      ...new RequestBuilder(`api/issues/${issueId}/links/${linkId}`, { fields }, params).get(),
    )
  }

  /**
   * Get all issues that are linked to the current one with this link type.
   * @param issueId - The ID of the issue.
   * @param linkId - The database ID of the link type.
   * @param params.fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.top - Optional. Specifies the maximum number of entries that are returned in the response.
   * @param params.skip - Optional. Lets you set a number of returned entities to skip before returning the first one.
   * @returns A promise that resolves to the list of linked issues.
   */
  async getLinkedIssues<TSchema extends IssueSchema>(
    issueId: string,
    linkId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<IssueEntity<TSchema>[]> {
    return this.fetch<IssueEntity<TSchema>[]>(
      ...new RequestBuilder(
        `api/issues/${issueId}/links/${linkId}/issues`,
        {
          fields,
          ...queryParams("$skip", "$top"),
        },
        params,
      ).get(),
    )
  }

  /**
   * Link the current issue to another issue.
   * @param issueId - The ID of the current issue.
   * @param linkId - The database ID of the link type (with direction markers if applicable).
   * @param body - Required fields: id - the database ID of the issue you're linking to the current one.
   * @param params.fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set to true to avoid sending notifications for this update.
   * @returns A promise that resolves to the updated issue.
   */
  async linkIssue<TSchema extends IssueSchema>(
    issueId: string,
    linkId: string,
    body: { linkedIssueId: string } & DeepPartial<IssueLink>,
    params?: FieldsParam<TSchema> & MuteUpdateNotificationsParam,
  ): Promise<IssueEntity<TSchema>> {
    return this.fetch<IssueEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/links/${linkId}/issues`,
        {
          fields,
          muteUpdateNotifications: "boolean",
        },
        params,
      ).post(body),
    )
  }

  /**
   * Delete the link between issues.
   * @param issueId - The ID of the current issue.
   * @param linkId - The database ID of the link type (with direction markers if applicable).
   * @param linkedIssueId - The database ID of the issue to unlink from the current one.
   * @param params.fields - A list of Issue attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the updated issue.
   */
  async unlinkIssue<TSchema extends IssueSchema>(
    issueId: string,
    linkId: string,
    linkedIssueId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<IssueEntity<TSchema>> {
    return this.fetch<IssueEntity<TSchema>>(
      ...new RequestBuilder(
        `api/issues/${issueId}/links/${linkId}/issues/${linkedIssueId}`,
        {
          fields,
        },
        params,
      ).delete(),
    )
  }
}
