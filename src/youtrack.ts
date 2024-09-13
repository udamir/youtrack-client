import type { DashboardApi, FetchApi, Service } from "./types"
import * as ResourceApi from "./resources"

export class YouTrack {
  static client (baseUrl: string, token: string) {
    return new YouTrack(async (url, options?) => {
      const response = await fetch(baseUrl + url, {
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
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

  constructor(public fetch: FetchApi) {}

  public Agiles = new ResourceApi.AgilesApi(this.fetch)
  public Activities = new ResourceApi.ActivitiesApi(this.fetch)
  // public Articles = new ResourceApi.ArticlesApi(this.fetch)
  // public Commands = new ResourceApi.CommandsApi(this.fetch)
  // public Groups = new ResourceApi.GroupsApi(this.fetch)
  // public LinkTypes = new ResourceApi.LinkTypesApi(this.fetch)
  // public IssueTags = new ResourceApi.IssueTagsApi(this.fetch)
  // public Issues = new ResourceApi.IssuesApi(this.fetch)
  // public SavedQueries = new ResourceApi.SavedQueriesApi(this.fetch)
  // public Search = new ResourceApi.SearchApi(this.fetch)
  // public Tags = new ResourceApi.TagsApi(this.fetch)
  // public Users = new ResourceApi.UsersApi(this.fetch)
  // public Profile = new ResourceApi.ProfileApi(this.fetch)
  // public WorkItems = new ResourceApi.WorkItemsApi(this.fetch)
}
