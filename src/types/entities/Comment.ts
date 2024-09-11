import type { Visibility } from "./Visibility"
import type { User, Reaction } from "./User"
import type { EntityBase } from "./Entity"

export type Comment<T extends string> = EntityBase<T> & {
  author: User | null // The user who created the comment. Read-only. Can be null.
  created: number // The timestamp in milliseconds indicating the moment when the comment was posted. Stored as a unix timestamp at UTC. Read-only.
  reactions: Reaction[] // The list of reactions that users added to this comment.
  text: string | null // The text of the comment. Can be null.
  visibility: Visibility | null // The visibility settings of the comment. They define who is allowed to see the comment. Can be null.
  updated: number | null // The timestamp in milliseconds indicating the last update of the comment. Stored as a unix timestamp at UTC. Read-only. Can be null.
  pinned: boolean // Determines whether the comment is pinned in the issue.
}
