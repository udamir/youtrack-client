import type { DashboardApi, FetchApi, Service } from "./types"
import * as ResourceApi from "./resources"
import { joinUrl } from "./utils"

export class YouTrack {
  public Agiles: ResourceApi.AgilesApi
  public Activities: ResourceApi.ActivitiesApi
  public Articles: ResourceApi.ArticlesApi
  public Commands: ResourceApi.CommandsApi
  public Groups: ResourceApi.GroupsApi
  public IssueLinkTypes: ResourceApi.IssueLinkTypesApi
  public Issues: ResourceApi.IssuesApi
  public SavedQueries: ResourceApi.SavedQueriesApi
  public Search: ResourceApi.SearchApi
  public Tags: ResourceApi.TagsApi
  public Users: ResourceApi.UsersApi
  public WorkItems: ResourceApi.WorkItemsApi

  static client (baseUrl: string, token: string) {
    return new YouTrack(async (url, options?) => {
      const response = await fetch(joinUrl(baseUrl, url), {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          ...options?.headers
        },
        ...options,
      })
    
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }
    
      return response.json()
    })
  }

  static async widget(api: DashboardApi) {
    const { services } = await api.fetchHub<{ services: Service[] }>(`api/rest/services?query=applicationName:${"YouTrack"}`)

    const app = services[0]
    if (!app) {
      throw new Error("YouTrack application not found")
    }

    return new YouTrack((url, config?) => api.fetch(app.id, url, config))
  }

  constructor(public fetch: FetchApi) {
    this.Agiles = new ResourceApi.AgilesApi(this.fetch)
    this.Activities = new ResourceApi.ActivitiesApi(this.fetch)
    this.Articles = new ResourceApi.ArticlesApi(this.fetch)
    this.Commands = new ResourceApi.CommandsApi(this.fetch)
    this.Groups = new ResourceApi.GroupsApi(this.fetch)
    this.IssueLinkTypes = new ResourceApi.IssueLinkTypesApi(this.fetch)
    this.Issues = new ResourceApi.IssuesApi(this.fetch)
    this.SavedQueries = new ResourceApi.SavedQueriesApi(this.fetch)
    this.Search = new ResourceApi.SearchApi(this.fetch)
    this.Tags = new ResourceApi.TagsApi(this.fetch)
    this.Users = new ResourceApi.UsersApi(this.fetch)
    this.WorkItems = new ResourceApi.WorkItemsApi(this.fetch)
  }
}
