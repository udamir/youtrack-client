import { YouTrack } from "../../src"
import type { Entity, Project, ProjectCustomFieldType } from "../../src"
import {
  PROJECT_CUSTOM_FIELD_FIELDS,
  PROJECT_FULL_FIELDS,
  USER_FULL_FIELDS,
  CUSTOM_FIELD_FIELDS,
  ISSUE_FULL_FIELDS,
} from "./entities"
import type {
  ProjectTestEntity,
  UserTestEntity,
  IssueTestEntity,
  GroupTestEntity,
  CustomFieldTestEntity,
} from "./entities"

// Interface for API error response handling
interface ErrorWithResponseData extends Error {
  response: {
    data?: Record<string, unknown>
    status?: number
  }
}

/**
 * Helper class for YouTrack API testing
 * Provides utilities for working with YouTrack API in tests
 */
export class TestHelper {
  public yt: YouTrack
  public enableUpdates: boolean
  public restoreStateAfterTest: boolean
  public me: UserTestEntity

  // Track created entities for cleanup
  private createdProjects: ProjectTestEntity[] = []
  private createdCustomFields: CustomFieldTestEntity[] = []
  private createdIssues: IssueTestEntity[] = []
  private createdUsers: UserTestEntity[] = []
  private createdGroups: GroupTestEntity[] = []

  get createdProject() {
    return (id?: string): ProjectTestEntity | undefined =>
      id ? this.createdProjects.find((p) => p.id === id) : this.createdProjects[0]
  }

  get createdIssue() {
    return (id?: string): IssueTestEntity | undefined =>
      id ? this.createdIssues.find((i) => i.id === id) : this.createdIssues[0]
  }

  constructor(env: {
    YOUTRACK_TOKEN: string
    YOUTRACK_BASE_URL: string
    ENABLE_UPDATES: string
    RESTORE_STATE_AFTER_TEST: string
  }) {
    if (!env.YOUTRACK_BASE_URL) {
      throw new Error("YOUTRACK_BASE_URL is not defined in .env file")
    }

    if (!env.YOUTRACK_TOKEN) {
      throw new Error("YOUTRACK_TOKEN is not defined in .env file")
    }

    this.yt = YouTrack.client(env.YOUTRACK_BASE_URL, env.YOUTRACK_TOKEN)
    // Configure test behavior based on environment variables
    this.enableUpdates = env.ENABLE_UPDATES.toLowerCase() === "true"
    this.restoreStateAfterTest = env.RESTORE_STATE_AFTER_TEST.toLowerCase() === "true"
  }

  /**
   * Helper to check if an error is from the YouTrack API
   */
  public isYouTrackError(error: unknown): error is ErrorWithResponseData {
    return error instanceof Error && "response" in error && typeof (error as any).response === "object"
  }

  /**
   * Create a test project with the given name and short name
   * @param name Project name
   * @param shortName Project short name (should be unique)
   * @param description Optional project description
   */
  public async createTestProject(
    name = "Test Project",
    shortName = `TP_${Date.now().toString(36)}`,
    description = "Project created for automated testing",
  ): Promise<Entity<Project, typeof PROJECT_FULL_FIELDS>> {
    if (!this.enableUpdates) {
      throw new Error("Cannot create project: ENABLE_UPDATES is set to false")
    }

    try {
      const me = await this.getCurrentUser()

      // Create the project - access Projects through Admin namespace
      const project = await this.yt.Admin.Projects.createProject(
        {
          name,
          shortName,
          description,
          leader: {
            id: me.id,
          },
        },
        {
          fields: PROJECT_FULL_FIELDS,
        },
      )

      // Track project ID for later cleanup
      if (project) {
        this.createdProjects.push(project)
      }

      return project
    } catch (error) {
      if (this.isYouTrackError(error)) {
        console.error("Failed to create project:", error.response.data)
      }
      throw error
    }
  }

  /**
   * Get the current user (for authentication checks)
   */
  public async getCurrentUser(): Promise<UserTestEntity> {
    if (!this.me) {
      this.me = await this.yt.Users.getCurrentUserProfile({ fields: USER_FULL_FIELDS })
    }
    return this.me
  }

  /**
   * Delete a test project by ID
   * @param projectId ID of the project to delete
   */
  public async deleteTestProject(projectId: string): Promise<void> {
    if (!this.enableUpdates) {
      return
    }

    try {
      await this.yt.Admin.Projects.deleteProject(projectId)

      // Remove from tracking array
      const index = this.createdProjects.findIndex((p) => p.id === projectId)
      if (index !== -1) {
        this.createdProjects.splice(index, 1)
      }
    } catch (error) {
      if (this.isYouTrackError(error)) {
        console.error(`Failed to delete project ${projectId}:`, error.response.data)
      }
      // Don't rethrow to avoid breaking cleanup
      console.warn(`Warning: Could not delete project ${projectId}`)
    }
  }

  /**
   * Create a custom field and add it to a project
   * @param projectId ID of the project to add the field to
   * @param name Name of the custom field
   * @param fieldTypeId ID of the custom field type
   */
  public async createProjectCustomField(projectId: string, name: string, type: ProjectCustomFieldType) {
    if (!this.enableUpdates) {
      throw new Error("Cannot create custom field: ENABLE_UPDATES is set to false")
    }

    try {
      // Create the custom field using the field type reference
      const customField = await this.yt.Admin.CustomFields.createCustomField(
        {
          name,
          fieldType: type,
        },
        { fields: CUSTOM_FIELD_FIELDS },
      )

      this.createdCustomFields.push(customField)

      // Add the custom field to the project
      const projectCustomField = await this.yt.Admin.Projects.addCustomFieldToProject(
        projectId,
        {
          field: { id: customField.id },
        },
        {
          fields: PROJECT_CUSTOM_FIELD_FIELDS,
        },
      )

      return projectCustomField
    } catch (error) {
      if (this.isYouTrackError(error)) {
        console.error("Failed to create custom field:", error.response.data)
      }
      throw error
    }
  }

  /**
   * Create an issue in the specified project
   * @param projectId Project ID
   * @param summary Issue summary
   * @param description Issue description
   */
  public async createTestIssue(
    projectId: string,
    summary = "Test Issue",
    description = "Issue created for automated testing",
  ): Promise<IssueTestEntity> {
    if (!this.enableUpdates) {
      throw new Error("Cannot create issue: ENABLE_UPDATES is set to false")
    }

    try {
      const issue = await this.yt.Issues.createIssue(
        {
          summary,
          description,
          project: { id: projectId },
        },
        {
          fields: ISSUE_FULL_FIELDS,
        },
      )

      if (issue) {
        this.createdIssues.push(issue)
      }

      return issue
    } catch (error) {
      if (this.isYouTrackError(error)) {
        console.error("Failed to create issue:", error.response.data)
      }
      throw error
    }
  }

  /**
   * Delete an issue by ID
   * @param issueId ID of the issue to delete
   */
  public async deleteTestIssue(issueId: string): Promise<void> {
    if (!this.enableUpdates) {
      return
    }

    try {
      await this.yt.Issues.deleteIssue(issueId)

      // Remove from tracking array
      const index = this.createdIssues.findIndex((i) => i.id === issueId)
      if (index !== -1) {
        this.createdIssues.splice(index, 1)
      }
    } catch (error) {
      if (this.isYouTrackError(error)) {
        console.error(`Failed to delete issue ${issueId}:`, error.response.data)
      }
      console.warn(`Warning: Could not delete issue ${issueId}`)
    }
  }

  /**
   * Get available custom field types
   */
  public async getCustomFieldTypes() {
    return this.yt.Admin.CustomFields.getCustomFields({ fields: "id,name,fieldType(id,valueType)" })
  }

  /**
   * Cleanup all resources created during tests
   */
  public async cleanup(): Promise<void> {
    if (!this.restoreStateAfterTest || !this.enableUpdates) {
      return
    }

    console.log("Cleaning up test resources...")

    // Delete issues first
    for (const issue of [...this.createdIssues]) {
      await this.deleteTestIssue(issue.id)
    }

    // Delete projects (this should cascade to delete child entities)
    for (const project of [...this.createdProjects]) {
      await this.deleteTestProject(project.id)
    }

    // Delete custom fields
    for (const customField of [...this.createdCustomFields]) {
      await this.yt.Admin.CustomFields.deleteCustomField(customField.id)
    }

    console.log("Cleanup complete")
  }
}
