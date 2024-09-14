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

yt.Users.getCurrentUserProfile({ 
  fields: ["login", "avatarUrl", "email", "fullName"] 
}).then((user) => {
  console.log(user)
})

```

### Widget Client

```typescript
import { YouTrack } from "youtrack-client"

DashboardAddons.registerWidget(async (dashboardApi: DashboardApi, widgetApi: WidgetApi) => {
  
  const yt = await YouTrack.widget(dashboardApi)
  const user = await yt.Users.getCurrentUserProfile({ 
    fields: ["login", "avatarUrl", "email", "fullName"]
  })

  // Do some logic ...
})
```

## Documentation

### ActivitiesApi
| Method with Parameters / API Endpoint             | Description     |
|---|---|
| `getActivities`({params})<br>GET /api/activities | Get the list of all available activities with optional filtering and pagination. |
| `getActivityById`(itemId, {params})<br>GET /api/activities/{itemId} | Get information about a specific activity item by ID. |
| `getActivitiesPage`({params})<br>GET /api/activitiesPage | Read a paginated page of activities with optional filtering and pagination support. |

### AgilesApi
| Method with Parameters / API Endpoint             | Description     |
|---|---|
| `getAgiles`({fields, $skip, $top})<br>GET /api/agiles | Get the list of all available agile boards in the system. |
| `createAgile`(body, {fields, template})<br>POST /api/agiles | Create a new agile board with the specified details. |
| `getAgileById`(agileId, {fields})<br>GET /api/agiles/{agileId} | Get settings of the specific agile board by ID. |
| `updateAgile`(agileId, body, {fields})<br>POST /api/agiles/{agileId} | Update settings of the specific agile board by ID. |
| `deleteAgile`(agileId, {fields})<br>DELETE /api/agiles/{agileId} | Delete an agile board by ID. |
| `getAgileSprints`(agileId, {fields, $skip, $top})<br>GET /api/agiles/{agileId}/sprints | Get the list of all sprints of the specified agile board. |
| `createAgileSprint`(agileId, body, {fields, muteUpdateNotifications})<br>POST /api/agiles/{agileId}/sprints | Create a new sprint for the specified agile board. |
| `getAgileSprintById`(agileId, sprintId, {fields})<br>GET /api/agiles/{agileId}/sprints/{sprintId} | Get settings of the specific sprint of the agile board. |
| `deleteAgileSprint`(agileId, sprintId, {fields})<br>DELETE /api/agiles/{agileId}/sprints/{sprintId} | Delete the specific sprint from the agile board. |
| `updateAgileSprint`(agileId, sprintId, body, {fields})<br>POST /api/agiles/{agileId}/sprints/{sprintId} | Update the specific sprint of the agile board. |
| `updateArticleAttachment`(articleId, attachmentId, body, { fields })<br>POST /api/articles/{articleId}/attachments/{attachmentId} | Updates a specific attachment in the article.               |
| `deleteArticleAttachment`(articleId, attachmentId, { fields })<br>DELETE /api/articles/{articleId}/attachments/{attachmentId} | Deletes a specific attachment from the article.             |
| `getChildArticles`(articleId, { fields, $skip, $top })<br>GET /api/articles/{articleId}/childArticles | Gets the list of sub-articles of the current article.       |
| `addChildArticle`(articleId, body, { fields })<br>POST /api/articles/{articleId}/childArticles | Adds a new sub-article to the current article.              |
| `getChildArticle`(articleId, subArticleId, { fields })<br>GET /api/articles/{articleId}/childArticles/{subArticleId} | Gets a specific sub-article of the current article.         |
| `updateChildArticle`(articleId, subArticleId, body, { fields })<br>POST /api/articles/{articleId}/childArticles/{subArticleId} | Updates a specific sub-article.                             |
| `removeChildArticleLink`(articleId, subArticleId, { fields })<br>DELETE /api/articles/{articleId}/childArticles/{subArticleId} | Removes the parent-child link between the specific sub-article and the current article. |
| `getArticleComments`(articleId, { fields, $skip, $top })<br>GET /api/articles/{articleId}/comments | Gets all accessible comments to a specific article.         |
| `createArticleComment`(articleId, body, { fields })<br>POST /api/articles/{articleId}/comments | Adds a new comment to the article.                          |
| `getArticleComment`(articleId, commentId, { fields })<br>GET /api/articles/{articleId}/comments/{commentId} | Reads a comment with a specific ID.                         |
| `updateArticleComment`(articleId, commentId, body, { fields })<br>POST /api/articles/{articleId}/comments/{commentId} | Updates an existing comment to a specific article.          |
| `deleteArticleComment`(articleId, commentId, { fields })<br>DELETE /api/articles/{articleId}/comments/{commentId} | Deletes an existing comment to a specific article.          |
| `getArticleCommentReactions`(articleId, commentId, { fields })<br>GET /api/articles/{articleId}/comments/{commentId}/reactions | Gets all accessible reactions to a specific article comment. |
| `createCommentReaction`(articleId, commentId, body, { fields })<br>POST /api/articles/{articleId}/comments/{commentId}/reactions | Adds a new reaction to a comment with a specific ID.        |
| `getCommentReaction`(articleId, commentId, reactionId, { fields })<br>GET /api/articles/{articleId}/comments/{commentId}/reactions/{reactionId} | Gets a reaction with a specific ID.                         |
| `removeCommentReaction`(articleId, commentId, reactionId, { fields })<br>DELETE /api/articles/{articleId}/comments/{commentId}/reactions/{reactionId} | Removes a reaction from a comment.                          |
| `getParentArticle`(articleId, { fields })<br>GET /api/articles/{articleId}/parentArticle | Gets the article that is the parent for the current one.     |
| `getArticleTags`(articleId, { fields })<br>GET /api/articles/{articleId}/tags | Gets all tags added to the article that are visible to the current user. |
| `createArticleTag`(articleId, body, { fields })<br>POST /api/articles/{articleId}/tags | Tags the article with an existing tag.                      |
| `getArticleTag`(articleId, tagId, { fields })<br>GET /api/articles/{articleId}/tags/{tagId} | Reads a specific tag added to the article.                  |

## Contributing
When contributing, keep in mind that it is an objective of `youtrack-client` to have no package dependencies. This may change in the future, but for now, no new dependencies.

## License

MIT
