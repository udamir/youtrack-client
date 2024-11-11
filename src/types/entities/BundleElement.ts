import type { EntityBase } from "./Entity"
import type { FieldStyle } from "./Field"
import type { User } from "./User"

export type Bundle<T extends string, V extends BundleElement<`${T}BundleElement`>> = EntityBase<`${T}Bundle`> & {
  values: V[] // Collection of builds that this bundle contains.
  isUpdateable: boolean // If true, then the currently logged-in user can update this bundle. Otherwise, false. Read-only.
}

export type BuildBundle = Bundle<"Build", BuildBundleElement>
export type EnumBundle = Bundle<"Enum", EnumBundleElement>
export type StateBundle = Bundle<"State", StateBundleElement>
export type VersionBundle = Bundle<"Version", VersionBundleElement>
export type OwnedBundle = Bundle<"Owned", OwnedBundleElement>
export type UserBundle = Bundle<"User", UserBundleElement>

export type BundleElement<T extends string = "BundleElement"> = EntityBase<T> & {
  name: string // The name of the value.
  description: string | null // The description of the value. Can be null.
  archived: boolean // When true, this value is archived.
  ordinal: number | null // The position of the value in the set of values for the custom field.
  color: FieldStyle | null // The color that is assigned to the value in the custom field.
}

export type EnumBundleElement = BundleElement<"EnumBundleElement"> & {
  localizedName: string | null // The localized name of the field value. Can be null.
  bundle: Bundle<"Enum", EnumBundleElement> | null // The reference to the bundle that contains this value. Read-only. Can be null.
  hasRunningJob: boolean // If true, there are some jobs running in the background for this bundle element. Otherwise, false. Read-only.
}

export type BuildBundleElement = BundleElement<"BuildBundleElement"> & {
  assembleDate: number | null // The timestamp in milliseconds indicating the moment when the build was assembled. Stored as a unix timestamp at UTC. Can be null.
  bundle: Bundle<"Build", BuildBundleElement> | null // The reference to the bundle that contains this value. Read-only. Can be null.
  hasRunningJob: boolean // If true, there are some jobs running in the background for this bundle element. Otherwise, false. Read-only.
}

export type StateBundleElement = BundleElement<"StateBundleElement"> & {
  isResolved: boolean // If true, then issues in this state are considered to be resolved.
  localizedName: string | null // The localized name of the field value. Can be null.
  bundle: Bundle<"State", StateBundleElement> | null // The reference to the bundle that contains this value. Read-only. Can be null.
  hasRunningJob: boolean // If true, there are some jobs running in the background for this bundle element. Otherwise, false. Read-only.
}

export type VersionBundleElement = BundleElement<"VersionBundleElement"> & {
  released: boolean // Indicates whether the version is marked as released.
  releaseDate: number | null // The release date that is associated with the version. Can be null.
  startDate: number | null // The start date that is associated with the version. Available since 2023.1. Can be null.
  bundle: Bundle<"Version", VersionBundleElement> | null // The reference to the bundle that contains this value. Read-only. Can be null.
  hasRunningJob: boolean // If true, there are some jobs running in the background for this bundle element. Otherwise, false. Read-only.
}

export type OwnedBundleElement = BundleElement<"OwnedBundleElement"> & {
  owner: User | null // The user who is associated with the value. Can be null.
  bundle: Bundle<"Owned", OwnedBundleElement> | null // The reference to the bundle that contains this value. Read-only. Can be null.
  hasRunningJob: boolean // If true, there are some jobs running in the background for this bundle element. Otherwise, false. Read-only.
}

export type UserBundleElement = BundleElement<"UserBundleElement"> & {
  owner: User | null // The user who is associated with the value. Can be null.
  bundle: Bundle<"Owned", OwnedBundleElement> | null // The reference to the bundle that contains this value. Read-only. Can be null.
  hasRunningJob: boolean // If true, there are some jobs running in the background for this bundle element. Otherwise, false. Read-only.
}
