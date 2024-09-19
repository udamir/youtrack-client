# YouTrack Client
<img alt="npm" src="https://img.shields.io/npm/v/youtrack-client"> <img alt="npm" src="https://img.shields.io/npm/dm/youtrack-client?label=npm"> 
 <img alt="npm type definitions" src="https://img.shields.io/npm/types/youtrack-client">  <img alt="GitHub" src="https://img.shields.io/github/license/udamir/youtrack-client">

Client library for accessing the youtrack REST and Widget API

## Features
- All API methods are supported
- Can be used in Youtrack Widgets (check [widget template](https://github.com/udamir/youtrack-widget-template))
- Full Typescript support, including parameters and responses
- All methods with full documentation

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
  fields: ["login", "avatarUrl", "email", "fullName"] as const
}).then((user) => {
  // typeof user
  // { $type: "User", login: string, avatarUrl: string, email: string, fullName: string }

  console.log(user)
})

yt.Tags.getTags({
  fields: ["id", "name", { owner: ["login"]}] as const
}).then((tags) => {
  // typeof tags
  // Array<{ $type: "Tag", id: string, name: string, owner: { $type: "User", login: string } }>

  console.log(tags)
})


```

### Widget Client

```typescript
import { YouTrack } from "youtrack-client"

DashboardAddons.registerWidget(async (dashboardApi: DashboardApi, widgetApi: WidgetApi) => {
  
  const yt = await YouTrack.widget(dashboardApi)
  const user = await yt.Users.getCurrentUserProfile({ 
    fields: ["login", "avatarUrl", "email", "fullName"] as const
  })
  // typeof user
  // { $type: "User", login: string, avatarUrl: string, email: string, fullName: string }

  const tags = await yt.Tags.getTags({
    fields: ["id", "name", { owner: ["login"]}] as const
  })
  // typeof tags
  // Array<{ $type: "Tag", id: string, name: string, owner: { $type: "User", login: string } }>

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
  SavedQueries: ResourceApi.SavedQueriesApi
  Search: ResourceApi.SearchApi
  Tags: ResourceApi.TagsApi
  Users: ResourceApi.UsersApi
  WorkItems: ResourceApi.WorkItemsApi
}
```

List of all method in resources can be found in "src/resources" folder.

## Contributing
When contributing, keep in mind that it is an objective of `youtrack-client` to have no package dependencies. This may change in the future, but for now, no new dependencies.

## License

MIT
