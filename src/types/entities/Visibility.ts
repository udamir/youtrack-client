import type { EntityBase } from "./Entity"
import type { User } from "./User"
import type { UserGroup } from "./UserGroup"

export type Visibility = UnlimitedVisibility | LimitedVisibility

export type UnlimitedVisibility = EntityBase<"UnlimitedVisibility"> 

export type LimitedVisibility = EntityBase<"LimitedVisibility"> & {
  permittedGroups: UserGroup[] // Members of these groups are allowed to access the entity.
  permittedUsers: User[] // These users are allowed to access the entity.
}
