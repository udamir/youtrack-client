# YouTrack Client
<img alt="npm" src="https://img.shields.io/npm/v/youtrack-client"> <img alt="npm" src="https://img.shields.io/npm/dm/youtrack-client?label=npm"> 
 <img alt="npm type definitions" src="https://img.shields.io/npm/types/youtrack-client">  <img alt="GitHub" src="https://img.shields.io/github/license/udamir/youtrack-client">

JavaScript client library for accessing the youtrack REST and Widget API

## Features
- All User API methods are supported
- All Admin API methods are supported
- Can be used in Youtrack Widgets (check [widget template](https://github.com/udamir/youtrack-widget-template))
- Full Typescript support, including parameters and responses
- All methods with full js documentation

## Installation
```SH
npm install youtrack-client --save
```
or
```SH
yarn add youtrack-client
```

## Usage

### Rest Client
```typescript
import { YouTrack } from "youtrack-client"

const baseUrl = "http://example.myjetbrains.com"
const token = "perm:your-token"

const yt = YouTrack.client(baseUrl, token)

yt.Users.getCurrentUserProfile({ 
  // fields in FieldsSchema format
  fields: ["login", "avatarUrl", "email", "fullName"] as const
}).then((user) => {
  // typeof user
  // { login: string, avatarUrl: string, email: string, fullName: string }

  console.log(user)
})

yt.Tags.getTags({
  // fields in string format
  fields: "id,name,owner(login)",
  $top: 5
}).then((tags) => {
  // typeof tags
  // Array<{ id: string, name: string, owner: { login: string } }>

  console.log(tags)
})


```

### Widget Client

```typescript
import { YouTrack, DashboardApi, WidgetApi } from "youtrack-client"

DashboardAddons.registerWidget(async (dashboardApi: DashboardApi, widgetApi: WidgetApi) => {
  
  const yt = await YouTrack.widget(dashboardApi)
  const user = await yt.Users.getCurrentUserProfile({ 
    fields: ["login", "avatarUrl", "email", "fullName"] as const
  })
  // typeof user
  // { login: string, avatarUrl: string, email: string, fullName: string }

  const tags = await yt.Tags.getTags({
    fields: "id,name,owner(login)",
    $top: 5
  })
  // typeof tags
  // Array<{ id: string, name: string, owner: { login: string } }>

})
```

## Documentation

The following resources are avaliable in Youtrack instance:
```typescript
interface YouTrack {
  Agiles: ResourceApi.AgilesApi
  Activities: ResourceApi.ActivitiesApi
  Articles: ResourceApi.ArticlesApi
  Commands: ResourceApi.CommandsApi
  Groups: ResourceApi.GroupsApi
  IssueLinkTypes: ResourceApi.IssueLinkTypesApi
  Issues: ResourceApi.IssuesApi
  IssueComments: ResourceApi.IssueCommentsApi
  IssueLinks: ResourceApi.IssueLinksApi
  IssueTags: ResourceApi.IssueTagsApi
  IssueTimeTracking: ResourceApi.IssueTimeTrackingApi
  IssueVcsChanges: ResourceApi.IssueVcsChangesApi
  IssueAttachments: ResourceApi.IssueAttechmentsApi
  SavedQueries: ResourceApi.SavedQueriesApi
  Search: ResourceApi.SearchApi
  Tags: ResourceApi.TagsApi
  Users: ResourceApi.UsersApi
  WorkItems: ResourceApi.WorkItemsApi
  Admin: {
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
  }
}
```

List of all method in resources can be found in "src/resources" folder.

## Contributing
When contributing, keep in mind that it is an objective of `youtrack-client` to have no package dependencies. This may change in the future, but for now, no new dependencies.

## License

MIT
