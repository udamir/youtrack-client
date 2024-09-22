import type { User, WatchFolderSharingSettings } from "./User"
import type { UserGroup } from "./UserGroup"
import type { EntityBase } from "./Entity"
import type { FieldStyle } from "./Field"
import type { Issue } from "./Issue"

export type Tag = EntityBase<"Tag"> & {
  issues: Issue[] // The collection of issues that this tag is added to.
  color: FieldStyle // The color settings of the tag.
  untagOnResolve: boolean // If true, this tag will be automatically removed from an issue when the issue is resolved.
  visibleFor: UserGroup | null // Deprecated. Use the readSharingSettings attribute instead.
  updateableBy: UserGroup | null // Deprecated. Use the updateSharingSettings attribute instead.
  readSharingSettings: WatchFolderSharingSettings // Users and groups that can see this tag.
  tagSharingSettings: TagSharingSettings // Users and groups that can use this tag.
  updateSharingSettings: WatchFolderSharingSettings // Users and groups that can update this tag.
  owner: User | null // The user who created the tag. Can be null.
  name: string | null // The name of the tag. Can be null.
}

export type TagSharingSettings = EntityBase<"TagSharingSettings"> & {
  permittedGroups: UserGroup[] // The list of groups that can read or update a tag.
  permittedUsers: User[] // The list of users that can read or update a tag.
}
