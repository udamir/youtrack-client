import type { DateFormatDescriptor, LocaleDescriptor, TimeZoneDescriptor } from "./Settings"
import type { UserGroup } from "./UserGroup"
import type { EntityBase } from "./Entity"
import type { Issue } from "./Issue"
import type { Tag } from "./Tag"

export type User = EntityBase<"User"> & {
  login: string // The login of the user.
  fullName: string // The full name of the user as seen in their profile.
  email: string | null // The email address of the user. Can be null.
  ringId: string | null // ID of the user in Hub. Can be null.
  guest: boolean // Indicates whether the user is a guest.
  online: boolean // Indicates whether the user is currently online.
  banned: boolean // Indicates whether the user is banned.
  banBadge: string | null
  isEmailVerified: boolean
  canReadProfile: boolean
  isLocked: boolean
  userType: UserType
  tags: Tag[] // Tags that belong to this user.
  savedQueries: SavedQuery[] // Saved searches that belong to this user.
  avatarUrl: string // The URL of the user avatar.
  profiles: UserProfiles // The profiles of the user.
}

export type UserType = EntityBase<"UserType">

export type Reaction = EntityBase<"Reaction"> & {
  author: User | null // The user who put the reaction. Can be null.
  reaction: string | null // The string representation of the reaction. Can be null.
}

export type SavedQuery = EntityBase<"SavedQuery"> & {
  query: string | null // The query that is saved in this search. Can be null.
  issues: Issue[] // The collection of issues that match this saved search.
  readSharingSettings: WatchFolderSharingSettings // Users and groups that can see this saved search.
  updateSharingSettings: WatchFolderSharingSettings // Users and groups that can update this saved search.
  owner: User | null // The user who created the watch folder. Can be null.
  name: string | null // The name of the issue folder. Can be null.
}

export type WatchFolderSharingSettings = EntityBase<"WatchFolderSharingSettings"> & {
  permittedGroups: UserGroup[] // The list of groups that can read or update the tag or the saved search.
  permittedUsers: User[] // The list of users that can read or update the tag or the saved search.
}

export type UserProfiles = EntityBase<"UserProfiles"> & {
  general: GeneralUserProfile // The general settings of a user profile.
  notifications: NotificationsUserProfile // The notifications settings of a user profile.
  timetracking: TimeTrackingUserProfile // The time tracking user profile settings.
}

export type GeneralUserProfile = EntityBase<"GeneralUserProfile"> & {
  dateFieldFormat: DateFormatDescriptor // Format in which dates are shown to this user.
  timezone: TimeZoneDescriptor // Timezone of the user.
  locale: LocaleDescriptor // Personal locale selected by the user.
}

export type NotificationsUserProfile = EntityBase<"NotificationsUserProfile"> & {
  notifyOnOwnChanges: boolean // Indicates whether the user receives notifications on their own changes.
  emailNotificationsEnabled: boolean // Indicates whether the user enabled notifications via email.
  mentionNotificationsEnabled: boolean // Indicates whether the user receives notifications when they are mentioned in issue text.
  duplicateClusterNotificationsEnabled: boolean // Indicates whether the user receives notifications about issue's duplicates.
  mailboxIntegrationNotificationsEnabled: boolean // Indicates whether the user receives notifications produced by mailbox integration.
  usePlainTextEmails: boolean // Indicates whether the user receives emails in plain text.
  autoWatchOnComment: boolean // Indicates whether the user is automatically subscribed to the issue or article updates when they leave a comment.
  autoWatchOnCreate: boolean // Indicates whether the user is automatically subscribed to the issue or article updates when they create it.
  autoWatchOnVote: boolean // Indicates whether the user is automatically subscribed to the issue updates when they vote for the issue.
  autoWatchOnUpdate: boolean // Indicates whether the user is automatically subscribed to the issue or article updates when they update it.
}

export type TimeTrackingUserProfile = EntityBase<"TimeTrackingUserProfile"> & {
  periodFormat: PeriodFieldFormat // Format in which period values are displayed for the user.
}

export type PeriodFieldFormat = EntityBase<"PeriodFieldFormat"> & {
  id: "FULL" | "DAYS_HOURS_MINUTES" | "HOURS_MINUTES" | "MINUTES" // The format of the period.
}
