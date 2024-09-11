import type { EntityBase } from "./Entity"
import type { Project } from "./Project"

// https://www.jetbrains.com/help/youtrack/devportal/resource-api-groups.html

export type UserGroup = EntityBase<'UserGroup'> & {
  name: string | null // The name of the group. Can be null. Read-only.
  ringId: string | null // ID of the group in Hub. Can be null. Read-only.
  usersCount: number // The number of users in the group. Read-only.
  icon: string | null // The URL of the group icon. Can be null. Read-only.
  allUsersGroup: boolean // True if this group contains all users. Read-only.
  teamForProject: Project | null // The project that has this group set as a team. Can be null. Read-only.
}
