import type { EntityBase } from "./Entity"
import type { User } from "./User"

export type GlobalSettings = EntityBase<"GlobalSettings"> & {
  systemSettings?: SystemSettings // System settings that affect core functionality of YouTrack.
  notificationSettings?: NotificationSettings // The Notifications settings of the YouTrack service.
  restSettings?: RestCorsSettings // The Resource sharing (CORS) settings of the YouTrack service.
  appearanceSettings?: AppearanceSettings // Visual settings of the YouTrack service.
  localeSettings?: LocaleSettings // System language settings.
  license?: License // License information.
}

export type SystemSettings = EntityBase<"SystemSettings"> & {
  baseUrl?: string // Base URL of the YouTrack installation.
  maxUploadFileSize: number // Maximum size of the file that can be uploaded.
  maxExportItems: number // Maximum number of issues that can be exported.
  administratorEmail?: string // Email of server administrator.
  allowStatisticsCollection: boolean // Indicates whether it is allowed to collect usage statistics.
  isApplicationReadOnly: boolean // true, if the application is currently in the read-only mode. Otherwise, false.
}

export type NotificationSettings = EntityBase<"NotificationSettings"> & {
  emailSettings: EmailSettings // Settings for sending emails.
}

export type EmailSettings = EntityBase<"EmailSettings"> & {
  isEnabled: boolean // true if email notifications are enabled, otherwise false.
  host?: string // Mail server that is used for notification.
  port: number // Mail server port.
  mailProtocol: "SMTP" | "SMTPS" | "SMTP_TLS" // Mail protocol.
  anonymous: boolean // If true, mail server is accessed without authorization.
  login?: string // Mail server login.
  sslKey?: StorageEntry // SSL key to be used for accessing the mail server.
  from: string // From address.
  replyTo?: string // Reply-to address.
}

export type StorageEntry = EntityBase<"StorageEntry"> & {
  name?: string // Name of the SSL key.
}

export type RestCorsSettings = EntityBase<"RestCorsSettings"> & {
  allowedOrigins?: string[] // Origins that are allowed for cross-origin requests.
  allowAllOrigins?: boolean // Indicates whether requests from all origins are allowed.
}

export type AppearanceSettings = EntityBase<"AppearanceSettings"> & {
  timeZone?: TimeZoneDescriptor // Default application time zone.
  dateFieldFormat?: DateFormatDescriptor // Default format for dates presentation.
  logo?: Logo // Application logo.
}

export type DateFormatDescriptor = EntityBase<"DateFormatDescriptor"> & {
  presentation?: string // Name of the date format.
  pattern?: string // Pattern that is applied when showing date with time.
  datePattern?: string // Pattern that is applied when showing date.
}

export type Logo = EntityBase<"Logo"> & {
  url?: string // Url of the logo image.
}

export type TimeZoneDescriptor = EntityBase<"TimeZoneDescriptor"> & {
  presentation?: string // The name of the time zone.
  offset?: number // Time zone offset in minutes.
}

export type LocaleSettings = EntityBase<"LocaleSettings"> & {
  locale?: LocaleDescriptor // Current locale of YouTrack.
  isRTL?: boolean // Indicates whether the current system language is right-to-left.
}

export type LocaleDescriptor = EntityBase<"LocaleDescriptor"> & {
  locale?: string | null // Locale code.
  language?: string | null // Language abbreviation.
  community?: boolean // Indicates whether this locale is supported by community.
  name?: string | null // Name of the locale.
}

export type License = EntityBase<"License"> & {
  username?: string | null // Username used for license.
  license?: string | null // License key.
  error?: string | null // License error. If there is no error, this property is empty.
}

export type Telemetry = EntityBase<"Telemetry"> & {
  installationFolder?: string // Installation folder of YouTrack.
  databaseLocation?: string // Location of the YouTrack database.
  logsLocation?: string // Location of the logs.
  availableProcessors?: number // Number of available processors.
  availableMemory?: string // Available memory.
  allocatedMemory?: string // Allocated memory.
  usedMemory?: string // Used memory.
  uptime?: string // Uptime of the YouTrack application.
  startedTime?: number // The timestamp when YouTrack was started.
  databaseBackgroundThreads?: number // Number of database background threads.
  pendingAsyncJobs?: number // Number of pending asynchronous jobs.
  cachedResultsCountInDBQueriesCache?: number // Size of the database queries cache.
  databaseQueriesCacheHitRate?: string // Queries cache hit rate.
  blobStringsCacheHitRate?: string // Blobs cache hit rate.
  totalTransactions?: number // Number of transactions.
  transactionsPerSecond?: string // Number of transactions per second.
  requestsPerSecond?: string // Number of requests per second.
  databaseSize?: string // Size of the database (without blobs).
  fullDatabaseSize?: string // Full size of the database.
  textIndexSize?: string // Size of the text index.
  onlineUsers?: OnlineUsers // Online users.
  reportCalculatorThreads?: number // Number of report calculator threads.
  notificationAnalyzerThreads?: number // Number of notification analyzer threads.
}

export type OnlineUsers = EntityBase<"OnlineUsers"> & {
  users?: number // Number of online users.
}

export type BackupFile = EntityBase<"BackupFile"> & {
  name: string // Name of the backup file.
  size: number // Size of the file.
  creationDate: number // The timestamp in milliseconds indicating the moment when the backup file was created.
  link: string // The link to the backup file.
}

export type DatabaseBackupSettings = EntityBase<'DatabaseBackupSettings'> & {
  location?: string; // The location of the backups storage folder.
  filesToKeep: number; // The number of backup files that should be stored.
  cronExpression?: string; // The cron expression that defines the schedule of the automatic backups.
  archiveFormat: 'TAR_GZ' | 'ZIP'; // The current selected format of backup files.
  isOn: boolean; // If true, the automatic regular backup is enabled. Otherwise, false.
  availableDiskSpace: number; // The size of available disk space.
  notifiedUsers: User[]; // The list of users who get notifications about backup failures.
  backupStatus: BackupStatus; // The current status of the backup.
};

export type BackupStatus = EntityBase<'BackupStatus'> & {
  backupInProgress: boolean; // If true, the backup is currently running. Otherwise, false.
  backupCancelled: boolean; // If true, the last backup operation was cancelled. Otherwise, false.
  backupError?: BackupError; // The error that appeared during the previous backup process. Returns null, if there was no error.
};

export type BackupError = EntityBase<'BackupError'> & {
  date?: number; // The timestamp in milliseconds indicating the moment when the error appeared. Stored as a unix timestamp at UTC.
  errorMessage?: string; // Description of the error.
};
