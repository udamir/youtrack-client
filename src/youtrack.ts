import type { Axios } from "axios"

import type { FetchConfig, FetchFunc } from "./types"
import { encodeBody, joinUrl } from "./utils"
import * as ResourceApi from "./resources"

export interface RequestParams<RawBody extends boolean = true | false> extends Omit<RequestInit, 'body' | 'headers'> {
  body?: RawBody extends true ? BodyInit | null : unknown;
  query?: Record<string, unknown> | undefined;
  headers?: HeadersInit | Record<string, null | undefined>;
  sendRawBody?: RawBody;
}

export class YouTrack {
  public Agiles: ResourceApi.AgilesApi
  public Activities: ResourceApi.ActivitiesApi
  public Articles: ResourceApi.ArticlesApi
  public Commands: ResourceApi.CommandsApi
  public Groups: ResourceApi.GroupsApi
  public IssueLinkTypes: ResourceApi.IssueLinkTypesApi
  public Issues: ResourceApi.IssuesApi
  public IssueComments: ResourceApi.IssueCommentsApi
  public IssueLinks: ResourceApi.IssueLinksApi
  public IssueTags: ResourceApi.IssueTagsApi
  public IssueTimeTracking: ResourceApi.IssueTimeTrackingApi
  public IssueVcsChanges: ResourceApi.IssueVcsChangesApi
  public IssueAttachments: ResourceApi.IssueAttechmentsApi
  public SavedQueries: ResourceApi.SavedQueriesApi
  public Search: ResourceApi.SearchApi
  public Tags: ResourceApi.TagsApi
  public Users: ResourceApi.UsersApi
  public WorkItems: ResourceApi.WorkItemsApi
  public Admin: {
    Projects: ResourceApi.ProjectsApi
    BuildBundles: ResourceApi.BuildBundlesApi
    EnumBundles: ResourceApi.EnumBundlesApi
    OwnedBundles: ResourceApi.OwnedBundlesApi
    StateBundles: ResourceApi.StateBundlesApi
    UserBundles: ResourceApi.UserBundlesApi
    VersionBundles: ResourceApi.VersionBundlesApi
    CustomFields: ResourceApi.CustomFieldsApi
    BackupFiles: ResourceApi.BackupFilesApi
    DatabaseBackupSettings: ResourceApi.DatabaseBackupSettingsApi
    GlobalSettings: ResourceApi.GlobalSettingsApi
    TelemetryData: ResourceApi.TelemetryDataApi
    GlobalTimeTrackingSettings: ResourceApi.GlobalTimeTrackingSettingsApi
    Workflows: ResourceApi.WorkflowsApi
  }

  static client(baseUrl: string, token: string) {
    return new YouTrack(baseUrl, async ({ url, headers, data, ...rest }: FetchConfig) => {
      const response = await fetch(joinUrl(baseUrl, url), {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          ...headers,
        },
        ...(data ? { body: encodeBody(data) } : {}),
        ...rest,
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      if (response.headers.get("content-type")?.startsWith("application/json")) {
        return response.json()
      }

      return response.blob()
    })
  }

  static axiosClient(axios: Axios, baseUrl: string, token: string) {
    return new YouTrack(baseUrl, async ({ url, headers, ...rest }: FetchConfig) => {
      const params = {
        url: joinUrl(baseUrl, url),
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;charset=utf-8",
          "Content-Type": "application/json",
          ...headers,
        },
        ...rest,
      }
      const response = await axios.request(params)

      if (response.headers["content-type"]?.startsWith("application/json")) {
        return typeof response.data === "string" && response.data !== "" ? JSON.parse(response.data) : response.data
      }
      return response.data
    })
  }

  static widget(api: {
    fetchYouTrack: <T = unknown>(relativeURL: string, requestParams?: RequestParams) => Promise<T>;
  }) {
    return new YouTrack("", (config) => {
      const { url, data, ...rest } = config
      // TODO: handle Blob data
      return api.fetchYouTrack(url.slice(4), {
        ...(data ? { body: data } : {}),
        ...rest,
      })
    })
  }

  constructor(
    public baseUrl: string,
    public fetch: FetchFunc,
  ) {
    this.Agiles = new ResourceApi.AgilesApi(this)
    this.Activities = new ResourceApi.ActivitiesApi(this)
    this.Articles = new ResourceApi.ArticlesApi(this)
    this.Commands = new ResourceApi.CommandsApi(this)
    this.Groups = new ResourceApi.GroupsApi(this)
    this.IssueLinkTypes = new ResourceApi.IssueLinkTypesApi(this)
    this.Issues = new ResourceApi.IssuesApi(this)
    this.IssueComments = new ResourceApi.IssueCommentsApi(this)
    this.IssueLinks = new ResourceApi.IssueLinksApi(this)
    this.IssueTags = new ResourceApi.IssueTagsApi(this)
    this.IssueTimeTracking = new ResourceApi.IssueTimeTrackingApi(this)
    this.IssueVcsChanges = new ResourceApi.IssueVcsChangesApi(this)
    this.IssueAttachments = new ResourceApi.IssueAttechmentsApi(this)
    this.SavedQueries = new ResourceApi.SavedQueriesApi(this)
    this.Search = new ResourceApi.SearchApi(this)
    this.Tags = new ResourceApi.TagsApi(this)
    this.Users = new ResourceApi.UsersApi(this)
    this.WorkItems = new ResourceApi.WorkItemsApi(this)
    this.Admin = {
      Projects: new ResourceApi.ProjectsApi(this),
      BuildBundles: new ResourceApi.BuildBundlesApi(this),
      EnumBundles: new ResourceApi.EnumBundlesApi(this),
      OwnedBundles: new ResourceApi.OwnedBundlesApi(this),
      StateBundles: new ResourceApi.StateBundlesApi(this),
      UserBundles: new ResourceApi.UserBundlesApi(this),
      VersionBundles: new ResourceApi.VersionBundlesApi(this),
      CustomFields: new ResourceApi.CustomFieldsApi(this),
      BackupFiles: new ResourceApi.BackupFilesApi(this),
      DatabaseBackupSettings: new ResourceApi.DatabaseBackupSettingsApi(this),
      GlobalSettings: new ResourceApi.GlobalSettingsApi(this),
      TelemetryData: new ResourceApi.TelemetryDataApi(this),
      GlobalTimeTrackingSettings: new ResourceApi.GlobalTimeTrackingSettingsApi(this),
      Workflows: new ResourceApi.WorkflowsApi(this),
    }
  }
}
