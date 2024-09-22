import type { Visibility } from "./Visibility"
import type { EntityBase } from "./Entity"
import type { User } from "./User"

export type Attachment<T extends string> = EntityBase<T> & {
  name: string | null // The name of the file. Can be null.
  author: User | null // The user who attached the file. Read-only. Can be null.
  created: number // The timestamp in milliseconds indicating the moment when the attachment was created. Stored as a unix timestamp at UTC. Read-only.
  updated: number // The timestamp in milliseconds indicating the last update of the attachment. Stored as a unix timestamp at UTC. Read-only.
  size: number // The size of the attached file in bytes. Read-only.
  extension: string | null // The extension that defines the file type. Read-only. Can be null.
  charset: string | null // The charset of the file. Read-only. Can be null.
  mimeType: string | null // The MIME type of the file. Read-only. Can be null.
  metaData: string | null // The dimensions of an image file. For an image file, the value is rw=&rh=. For a non-image file, the value is empty. Read-only. Can be null.
  draft: boolean // If true, the attachment is not yet published, otherwise false. Read-only.
  removed: boolean // If true, the attachment is considered to be removed. Read-only.
  base64Content: string | null // The data URI that represents the attachment. Can be null.
  url: string | null // URL of the file. Read-only. Can be null.
  visibility: Visibility | null // The visibility settings of the attachment. Can be null.
}
