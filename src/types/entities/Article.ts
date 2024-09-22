import type { Visibility } from "./Visibility"
import type { Attachment } from "./Attachment"
import type { EntityBase } from "./Entity"
import type { Comment } from "./Comment"
import type { Project } from "./Project"
import type { User } from "./User"
import type { Tag } from "./Tag"

export type BaseArticle<T extends string = "BaseArticle"> = EntityBase<T> & {
  attachments: ArticleAttachment[] // The list of files attached to the article.
  content: string | null // The content of the article. Can be null.
  reporter: User | null // The user who created the article. Can be null.
  summary: string | null // The article title. Can be null.
  visibility: Visibility | null // Visibility settings of the article. These settings describe who is allowed to see the article. Can be null.
}

export type Article = BaseArticle<"Article"> & {
  childArticles: Article[] // The list of sub-articles of the current one.
  comments: ArticleComment[] // The list of comments to the article.
  created: number // The timestamp in milliseconds indicating the moment when the article was created. Stored as a unix timestamp at UTC. Read-only.
  externalArticle: ExternalArticle | null // The reference to the article or a similar object in the originating third-party system. Read-only. Can be null.
  hasChildren: boolean // When true, the article has sub-articles. Read-only.
  hasStar: boolean // true if the current user added the "Star" tag to this article. Otherwise, false.
  idReadable: string // The article ID. Read-only.
  ordinal: number // The position of the article in the tree. Read-only.
  parentArticle: Article | null // The parent article of the current one. Can be null.
  pinnedComments: ArticleComment[] // The list of comments that are pinned in the article. Read-only.
  project: Project // The project where the article belongs. Read-only.
  tags: Tag[] // The list of tags that are added to the article.
  updated: number // The timestamp in milliseconds indicating the last update of the article. Stored as a unix timestamp at UTC. Read-only.
  updatedBy: User | null // The user who last updated the article. Read-only. Can be null.
}

export type ArticleAttachment = Attachment<"ArticleAttachment"> & {
  article: BaseArticle | null // The article that the file is attached to. Read-only. Can be null.
  comment: ArticleComment | null // The comment that the file is attached to. Returns null if the file was attached directly to the article. Read-only.
}

export type ArticleComment = Comment<"ArticleComment"> & {
  attachments: ArticleAttachment[] // The list of attachments that are attached to the comment.
  article: Article | null // The article the comment belongs to. Read-only. Can be null.
}

export type ExternalArticle = EntityBase<"ExternalArticle"> & {
  name: string // The name of the external service. Read-only.
  url: string | null // The URL of the external service. Read-only. Can be null.
  key: string | null // Article key in the external system. Read-only. Can be null.
}
