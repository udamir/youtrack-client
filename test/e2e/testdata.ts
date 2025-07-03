/**
 * Test data for YouTrack API end-to-end tests
 * This file contains predefined test data for various YouTrack entities
 */

/**
 * Project test data
 */
export const ProjectData = {
  // Basic project data
  basic: {
    name: "E2E Test Project",
    shortName: "E2ETP",
    description: "Project created for E2E tests",
  },

  // Project with detailed settings
  detailed: {
    name: "E2E Detailed Project",
    shortName: "E2EDP",
    description: "Project with detailed settings for testing",
    archived: false,
    template: "scrum",
  },

  // Project update data
  update: {
    name: "Updated Project Name",
    description: "Updated project description",
  },
}

/**
 * Issue test data
 */
export const IssueData = {
  // Basic issue
  basic: {
    summary: "Test issue created for E2E tests",
    description: "This is a test issue for E2E testing",
  },

  // Issue with detailed data
  detailed: {
    summary: "Detailed test issue",
    description: "Issue with detailed settings for testing",
    priority: "Normal",
    type: "Task",
    state: "Open",
  },

  // Issue update data
  update: {
    summary: "Updated issue summary",
    description: "Updated issue description",
  },

  // Additional issues for search testing

  // High priority bug issue
  bugHigh: {
    summary: "Critical authentication failure in production",
    description: "Users are unable to log in through the SSO authentication flow when using certain email domains.",
    priority: "Critical",
    type: "Bug",
    state: "Open",
    tags: ["security", "authentication", "production"],
    customFields: {
      Environment: "Production",
      "Affected Version": "2.5.3",
      Severity: "High",
      Reproducibility: "Always",
    },
  },

  // Feature request issue
  featureRequest: {
    summary: "Add support for multi-factor authentication",
    description:
      "As a security-conscious user, I want to be able to enable two-factor authentication to protect my account.",
    priority: "Normal",
    type: "Feature",
    state: "Backlog",
    tags: ["security", "enhancement", "authentication"],
    customFields: {
      Complexity: "Medium",
      "Target Version": "2.7.0",
      "User Impact": "High",
      "Business Value": "High",
    },
  },

  // Maintenance task issue
  maintenance: {
    summary: "Update deprecated API dependencies",
    description:
      "Several API dependencies are using deprecated methods that need to be updated before next major release.",
    priority: "Low",
    type: "Task",
    state: "In Progress",
    tags: ["maintenance", "technical-debt", "dependencies"],
    customFields: {
      "Estimated Hours": "16",
      "Target Version": "2.6.0",
      Component: "Core API",
      "Risk Level": "Low",
    },
  },

  // Resolved issue
  resolved: {
    summary: "Fix pagination in search results",
    description: "Search results pagination doesn't preserve filter parameters when moving to the next page.",
    priority: "Normal",
    type: "Bug",
    state: "Resolved",
    resolution: "Fixed",
    tags: ["ui", "search", "pagination"],
    customFields: {
      Environment: "All",
      "Fixed Version": "2.5.4",
      Component: "Search UI",
      Complexity: "Low",
    },
  },
}

/**
 * Issue custom fields test data
 */
export const CustomFieldData = {
  // Text field
  text: {
    name: "Test Text Field",
    type: "text",
    value: "Test text value",
    updatedValue: "Updated text value",
  },

  // Single enum field
  singleEnum: {
    name: "Test Single Enum",
    type: "enum[1]",
    values: ["Low", "Normal", "High", "Critical"],
    value: "Normal",
    updatedValue: "High",
  },

  // Multi enum field
  multiEnum: {
    name: "Test Multi Enum",
    type: "enum[*]",
    values: ["iOS", "Android", "Web", "Backend"],
    value: ["iOS", "Android"],
    updatedValue: ["iOS", "Android", "Web"],
  },

  // Date field
  date: {
    name: "Test Date Field",
    type: "date",
    value: new Date("2025-01-15T12:00:00Z"),
    updatedValue: new Date("2025-02-20T12:00:00Z"),
  },

  // Integer field
  integer: {
    name: "Test Integer Field",
    type: "integer",
    value: 42,
    updatedValue: 100,
  },

  // Float field
  float: {
    name: "Test Float Field",
    type: "float",
    value: 3.14,
    updatedValue: 6.28,
  },
}

/**
 * Issue link types test data
 */
export const IssueLinkData = {
  linkTypes: [
    "relates to",
    "depends on",
    "is required for",
    "subtask of",
    "parent for",
    "duplicates",
    "is duplicated by",
  ],

  // Test links
  links: [
    {
      type: "relates to",
      direction: "outward",
    },
    {
      type: "depends on",
      direction: "outward",
    },
    {
      type: "subtask of",
      direction: "outward",
    },
  ],
}

/**
 * Comment test data
 */
export const CommentData = {
  // Basic comment
  basic: {
    text: "This is a test comment",
  },

  // Comment with formatting
  formatted: {
    text: "**Bold text** and _italic text_\n* List item 1\n* List item 2",
  },

  // Comment update
  update: {
    text: "This is an updated comment text",
  },
}

/**
 * Attachment test data
 */
export const AttachmentData = {
  // Test files
  files: [
    {
      name: "test.txt",
      content: "This is a test file content",
      mimeType: "text/plain",
    },
    {
      name: "test.json",
      content: JSON.stringify({ test: "data" }, null, 2),
      mimeType: "application/json",
    },
  ],
}

/**
 * Work item test data
 */
export const WorkItemData = {
  // Basic work item
  basic: {
    duration: 60, // minutes
    text: "Test work item",
    date: new Date("2025-03-15T10:00:00Z"),
  },

  // Detailed work item
  detailed: {
    duration: 120, // minutes
    text: "Detailed work item description",
    date: new Date("2025-03-16T14:30:00Z"),
    type: "Development",
  },

  // Work item update
  update: {
    duration: 90, // minutes
    text: "Updated work description",
  },

  // Work types
  workTypes: ["Development", "Testing", "Documentation", "Meeting"],
}

/**
 * User test data
 */
export const UserData = {
  // Basic user
  basic: {
    login: "testuser",
    fullName: "Test User",
    email: "test.user@example.com",
  },

  // User with details
  detailed: {
    login: "detaileduser",
    fullName: "Detailed Test User",
    email: "detailed.user@example.com",
    jabber: "detailed@jabber.org",
    avatarUrl: "https://www.gravatar.com/avatar/detaileduser",
  },

  // User update
  update: {
    fullName: "Updated User Name",
    email: "updated.user@example.com",
  },
}

/**
 * Group test data
 */
export const GroupData = {
  // Basic group
  basic: {
    name: "Test Group",
    description: "Group for testing",
  },

  // Group update
  update: {
    name: "Updated Group Name",
    description: "Updated group description",
  },
}

/**
 * Agile board test data
 */
export const AgileBoardData = {
  // Basic agile board
  basic: {
    name: "Test Agile Board",
    sprintName: "Test Sprint",
    columnSettings: [
      { fieldValues: ["To Do"], wipLimit: 5 },
      { fieldValues: ["In Progress"], wipLimit: 3 },
      { fieldValues: ["Done"], wipLimit: -1 },
    ],
  },
}

/**
 * Sprint test data
 */
export const SprintData = {
  // Basic sprint
  basic: {
    name: "Sprint 1",
    start: new Date("2025-04-01T00:00:00Z"),
    finish: new Date("2025-04-15T23:59:59Z"),
  },

  // Sprint update
  update: {
    name: "Updated Sprint 1",
    finish: new Date("2025-04-20T23:59:59Z"),
  },
}

/**
 * Search query test data
 */
export const SearchData = {
  // Basic queries
  queries: [
    "project: {E2ETP}",
    "project: {E2ETP} #Unresolved",
    "project: {E2ETP} created: today",
    "project: {E2ETP} updated: today..-1d",
    "project: {E2ETP} type: Task",
    "project: {E2ETP} priority: Normal",
    "project: {E2ETP} summary: test",
    "project: {E2ETP} description: test",
  ],

  // Saved search
  savedSearch: {
    name: "Test Saved Search",
    query: "project: {E2ETP} #Unresolved",
  },
}

/**
 * Test data utility functions
 */
export const TestUtils = {
  /**
   * Generate a random string with prefix
   */
  randomString: (prefix: string): string => {
    return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`
  },

  /**
   * Generate a random date within the last 30 days
   */
  randomDate: (): Date => {
    const now = new Date()
    const daysAgo = Math.floor(Math.random() * 30)
    now.setDate(now.getDate() - daysAgo)
    return now
  },

  /**
   * Generate random enum value from array
   */
  randomEnum: <T>(values: T[]): T => {
    return values[Math.floor(Math.random() * values.length)]
  },
}
