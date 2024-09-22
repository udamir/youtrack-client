import type { UserGroup } from "./UserGroup"
import type { EntityBase } from "./Entity"
import type { Project } from "./Project"
import type { Issue } from "./Issue"
import type { User } from "./User"

export type VcsChange = EntityBase<"VcsChange"> & {
  date: number // The date when the VCS change was committed to the repository.
  fetched: number | null // The date when the VCS change was fetched from the repository to YouTrack. Can be null.
  files: number // The number of files included into the VCS change. Equals -1 if the number of files is unknown.
  author: User // The author of the VCS change.
  processors: ChangesProcessor[] // The list of version control systems that contain the VCS change.
  text: string | null // The commit message of the VCS change. Can be null.
  urls: string[] // The list of links to the VCS change in the corresponding version control systems.
  version: string | null // The commit hash of the VCS change. Can be null.
  issue: Issue | null // The YouTrack issue the VCS change is linked to. Can be null.
  state: 0 | 1 | 2 | 3 // The code of the state of the VCS change.
}

export type ChangesProcessor = EntityBase<"ChangesProcessor"> & {
  server: VcsServer | null // The VCS or build server. Can be null.
  project: Project | null // The primary project in which the integration is active. Can be null.
  relatedProjects: Project[] // The list of additional projects linked to the integration.
  enabled: boolean // True when the integration is enabled, false when disabled.
  visibleForGroups: UserGroup[] // The list of user groups that can view changes made by the integration in the issue activity stream.
  addComments: boolean // True when the "Parse commits for issue comments" option is enabled in the integration settings, false when disabled.
  lookupIssuesInBranchName: boolean // True when the "Issue ID lookup in VCS branch name" feature is enabled, false when disabled.
}

export type VcsServer = EntityBase<"VcsServer"> & {
  url: string | null // The URL of the server. Can be null.
}
