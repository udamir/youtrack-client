import dotenv from "dotenv"
import axios from "axios"
import { type Entity, type User, YouTrack } from "../../src"

// init environment variables from .env file
dotenv.config()

// define test youtrack project and token from environment variables
const {
  YOUTRACK_BASE_URL = "",
  YOUTRACK_TOKEN = "",
  ENABLE_UPDATES = "false", // Set to true to enable update tests
  RESTORE_STATE_AFTER_TEST = "true",
} = process.env

const enableUpdates = ENABLE_UPDATES.toLowerCase() === "true"
const restoreStateAfterTest = RESTORE_STATE_AFTER_TEST.toLowerCase() === "true"

const yt = YouTrack.axiosClient(axios, YOUTRACK_BASE_URL, YOUTRACK_TOKEN)

// Basic user cases:
describe("Basic user cases", () => {
  let userId: string
  it("should get current user profile", async () => {
    const me = await yt.Users.getCurrentUserProfile({ fields: "id,avatarUrl,email,fullName" })
    expect(me.id).toBeDefined()
    expect(me.avatarUrl).toBeDefined()
    expect(me.email).toBeDefined()
    expect(me.fullName).toBeDefined()
    userId = me.id
  })

  it("should get user by id", async () => {
    const user = await yt.Users.getUserProfile(userId, { fields: "id,avatarUrl,email,fullName" })
    expect(user.id).toBe(userId)
    expect(user.avatarUrl).toBeDefined()
    expect(user.email).toBeDefined()
    expect(user.fullName).toBeDefined()
  })

  it("should get users general profile", async () => {
    const users = await yt.Users.getUsers({ fields: "id,avatarUrl,email,fullName" })
    expect(users.length).toBeGreaterThan(0)
    expect(users[0].id).toBeDefined()
    expect(users[0].avatarUrl).toBeDefined()
    expect(users[0].email).toBeDefined()
    expect(users[0].fullName).toBeDefined()
  })
})

// Advanced user profile cases
describe("User profile management", () => {
  let userId: string

  beforeAll(async () => {
    // Get current user ID to use in tests
    const me = await yt.Users.getCurrentUserProfile({ fields: ["id"] })
    userId = me.id
  })

  it("should get user general profile", async () => {
    const generalProfile = await yt.Users.getUserGeneralProfile(userId, {
      fields:
        "id,dateFieldFormat(id,pattern,presentation,datePattern),timezone(presentation,offset),locale(name,locale)",
    })

    expect(generalProfile.id).toBeDefined()
    expect(generalProfile.dateFieldFormat.pattern).toBeDefined()
    expect(generalProfile.dateFieldFormat.presentation).toBeDefined()
    expect(generalProfile.dateFieldFormat.datePattern).toBeDefined()
    expect(generalProfile.locale.name).toBeDefined()
    expect(generalProfile.locale.locale).toBeDefined()
    expect(generalProfile.timezone.presentation).toBeDefined()
    expect(generalProfile.timezone.offset).toBeDefined()
  })

  it("should get user time tracking profile", async () => {
    const timeTrackingProfile = await yt.Users.getUserTimeTrackingProfile(userId, {
      fields: "id,periodFormat(id)",
    })

    expect(timeTrackingProfile.id).toBeDefined()
    expect(timeTrackingProfile.periodFormat.id).toBeDefined()
  })

  it("should get user saved queries", async () => {
    const savedQueries = await yt.Users.getUserSavedQueries(userId, {
      fields: "id,name,query",
      $top: 10,
    })

    expect(Array.isArray(savedQueries)).toBe(true)

    if (savedQueries.length > 0) {
      expect(savedQueries[0].id).toBeDefined()
      expect(savedQueries[0].name).toBeDefined()
      expect(savedQueries[0].query).toBeDefined()
    }
  })
})

// Notification profiles
describe("User notification profiles", () => {
  const fields = "id,profiles(notifications(id))" as const
  let user: Entity<User, typeof fields>

  beforeAll(async () => {
    // Get current user ID
    user = await yt.Users.getCurrentUserProfile({ fields })
  })

  it("should get user notification profile", async () => {
    const notificationProfile = await yt.Users.getUserNotificationProfile(user.id, {
      fields: [
        "id",
        "notifyOnOwnChanges",
        "emailNotificationsEnabled",
        "mentionNotificationsEnabled",
        "duplicateClusterNotificationsEnabled",
        "mailboxIntegrationNotificationsEnabled",
        "usePlainTextEmails",
        "autoWatchOnComment",
        "autoWatchOnCreate",
        "autoWatchOnVote",
        "autoWatchOnUpdate",
      ],
    })

    expect(notificationProfile.id).toBeDefined()
    expect(typeof notificationProfile.emailNotificationsEnabled).toBe("boolean")
    expect(typeof notificationProfile.notifyOnOwnChanges).toBe("boolean")
  })
})

// User tags tests
describe("User tags", () => {
  let userId: string

  beforeAll(async () => {
    // Get current user ID
    const me = await yt.Users.getCurrentUserProfile({ fields: ["id"] })
    userId = me.id
  })

  it("should get user tags", async () => {
    const tags = await yt.Users.getUserTags(userId, {
      fields: "id,$type,name,owner(id)",
      $top: 10,
    })

    // Check if there are any tags
    if (tags.length > 0) {
      expect(tags[0].id).toBeDefined()
      expect(typeof tags[0].name).toBe("string")

      if ("owner" in tags[0] && tags[0].owner) {
        expect(tags[0].owner.id).toBeDefined()
      }
    }
  })
})

// Update tests - conditionally executed to avoid modifying data
describe("User profile updates", () => {
  if (!enableUpdates) return

  const fields = [
    "id",
    {
      profiles: [
        {
          general: ["id", { timezone: ["id", "offset", "presentation"] }],
          notifications: [
            "id",
            "notifyOnOwnChanges",
            "emailNotificationsEnabled",
            "mentionNotificationsEnabled",
            "duplicateClusterNotificationsEnabled",
            "mailboxIntegrationNotificationsEnabled",
            "usePlainTextEmails",
            "autoWatchOnComment",
            "autoWatchOnCreate",
            "autoWatchOnVote",
            "autoWatchOnUpdate",
          ],
          timetracking: ["id", { periodFormat: ["id"] }],
        },
      ],
    },
  ] as const

  let me: Entity<User, typeof fields>

  beforeAll(async () => {
    // Get current user ID
    me = await yt.Users.getCurrentUserProfile({ fields })
  })

  it("should update user general profile", async () => {
    // Test timezone change to a different timezone
    const updatedProfile = await yt.Users.updateUserGeneralProfile(
      me.id,
      {
        timezone: {
          id: "UTC",
        },
      },
      { fields: "id,$type,timezone(id,offset,presentation)" },
    )

    // Check if update was successful
    expect(updatedProfile.timezone.id).toBe("Etc/UTC")

    // Restore original timezone
    if (restoreStateAfterTest) {
      const restoredProfile = await yt.Users.updateUserGeneralProfile(
        me.id,
        {
          timezone: me.profiles.general.timezone,
        },
        { fields: "id,$type,timezone(id,offset,presentation)" },
      )

      // Check if restore was successful
      expect(restoredProfile.timezone.id).toBe(me.profiles.general.timezone.id)
    }
  })

  it("should update user time tracking profile", async () => {
    // Get current settings first
    const currentFormat = me.profiles.timetracking.periodFormat.id

    // Choose a different period format (this is a restricted enum type)
    const newFormat = currentFormat === "HOURS_MINUTES" ? "MINUTES" : "HOURS_MINUTES"

    const updatedProfile = await yt.Users.updateUserTimeTrackingProfile(
      me.id,
      { periodFormat: { id: newFormat } },
      { fields: "id,$type,periodFormat(id)" },
    )

    // Check if update was successful
    expect(updatedProfile.periodFormat.id).toBe(newFormat)

    // Restore original setting
    if (restoreStateAfterTest) {
      const restoredProfile = await yt.Users.updateUserTimeTrackingProfile(
        me.id,
        { periodFormat: { id: currentFormat } },
        { fields: "id,$type,periodFormat(id)" },
      )

      // Check if restore was successful
      expect(restoredProfile.periodFormat.id).toBe(currentFormat)
    }
  })

  it("should update user notification profile", async () => {
    // Save original state to restore later
    const originalState = me.profiles.notifications.emailNotificationsEnabled

    // Toggle enabled state
    const updatedProfile = await yt.Users.updateUserNotificationProfile(
      me.id,
      { emailNotificationsEnabled: !originalState },
      { fields: "id,emailNotificationsEnabled" },
    )

    // Verify the update
    expect(updatedProfile.emailNotificationsEnabled).toBe(!originalState)

    // Restore original settings
    if (restoreStateAfterTest) {
      const restoredProfile = await yt.Users.updateUserNotificationProfile(
        me.id,
        { emailNotificationsEnabled: originalState },
        { fields: "id,emailNotificationsEnabled" },
      )

      // Check if restore was successful
      expect(restoredProfile.emailNotificationsEnabled).toBe(originalState)
    }
  })
})
