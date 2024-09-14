# Youtrack Client
Client library for accessing the youtrack REST and Widget API

## Features
- All API methods are supported
- Can be used in Widgets
- Full Typescript support, including parameters and responses
- All methods with full documentation
- Can be used in nodejs or browser

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
yt.Users.getCurrentUserProfile({ fields: ["login", "avatarUrl", "email", "fullName"] }).then((user) => {
  console.log(user)
})

```

## Widget Client

```typescript
import { YouTrack } from "youtrack-client"

DashboardAddons.registerWidget(async (dashboardApi: DashboardApi, widgetApi: WidgetApi) => {
  const yt = await YouTrack.widget(dashboardApi)
  const user = await yt.Users.getCurrentUserProfile({ fields: ["login", "avatarUrl", "email", "fullName"] })

  // Do some logic ...
})
```

## Contributing
When contributing, keep in mind that it is an objective of `youtrack-client` to have no package dependencies. This may change in the future, but for now, no new dependencies.

## License

MIT
