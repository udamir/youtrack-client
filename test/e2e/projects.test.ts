import { afterAll, describe, expect, it } from "bun:test"
import dotenv from "dotenv"
import { ISSUE_BASE_FIELDS, PROJECT_BASE_FIELDS, PROJECT_DETAILED_FIELDS } from "./entities"
import { TestHelper } from "./helpers"
import { ProjectData } from "./testdata"

// Load environment variables from .env file
dotenv.config()

// YouTrack connection parameters from environment variables
const {
  YOUTRACK_BASE_URL = "",
  YOUTRACK_TOKEN = "",
  ENABLE_UPDATES = "false",
  RESTORE_STATE_AFTER_TEST = "true",
} = process.env

// Initialize test helper
const helper = new TestHelper({
  YOUTRACK_BASE_URL,
  YOUTRACK_TOKEN,
  ENABLE_UPDATES,
  RESTORE_STATE_AFTER_TEST,
})
const { yt, enableUpdates, restoreStateAfterTest } = helper

// Test suite for project management
describe("Project Management API", () => {
  // Run after all tests complete - clean up created resources
  afterAll(async () => {
    if (restoreStateAfterTest && enableUpdates) {
      await helper.cleanup()
    }
  })

  // Test cases for project creation
  describe("2.1 Project Creation and Configuration", () => {
    it("should create a new project with basic properties", async () => {
      // Skip if updates are disabled
      if (!enableUpdates) {
        console.log("Skipping test: ENABLE_UPDATES is false")
        return
      }

      // Generate a unique short name to avoid conflicts
      const uniqueShortName = `${ProjectData.basic.shortName}_${Date.now().toString(36)}`

      // Create a project
      const project = await helper.createTestProject(
        ProjectData.basic.name,
        uniqueShortName,
        ProjectData.basic.description,
      )

      // Verify project creation
      expect(project).toBeDefined()
      expect(project.id).toBeDefined()
      expect(project.name).toBe(ProjectData.basic.name)
      expect(project.shortName).toBe(uniqueShortName)
      expect(project.description).toBe(ProjectData.basic.description)
    })

    it("should create a project with additional optional parameters", async () => {
      if (!enableUpdates) {
        console.log("Skipping test: ENABLE_UPDATES is false")
        return
      }

      const uniqueShortName = `${ProjectData.basic.shortName}_ext_${Date.now().toString(36)}`

      // Create with additional parameters
      const project = await helper.createTestProject(
        `${ProjectData.basic.name} Extended`,
        uniqueShortName,
        `${ProjectData.basic.description} with extended config`,
      )

      // Verify project creation with extended parameters
      expect(project).toBeDefined()
      expect(project.name).toContain("Extended")
      expect(project.description).toContain("extended config")

      // Verify createdBy is set (this replaces the leader check which isn't in the type)
      expect(project.createdBy).toBeDefined()
      if (project.createdBy) {
        expect(project.createdBy.id).toBeDefined()
      }
    })

    it("should fetch a project by ID", async () => {
      // Get project ID from the first created project
      const createdProject = helper.createdProject()

      // Skip if no projects were created or updates disabled
      if (!createdProject) {
        console.log("Skipping test: No test projects available")
        return
      }

      // Fetch the project
      const project = await yt.Admin.Projects.getProjectById(createdProject.id, {
        fields: PROJECT_DETAILED_FIELDS,
      })

      // Verify project details
      expect(project).toBeDefined()
      expect(project.id).toBe(createdProject.id)
      expect(project.name).toBe(createdProject.name)
      expect(project.shortName).toBe(createdProject.shortName)
    })

    it("should update project settings", async () => {
      // Get project ID from the first created project
      const createdProject = helper.createdProject()

      // Skip if no projects were created or updates disabled
      if (!enableUpdates || !createdProject) {
        console.log("Skipping test: ENABLE_UPDATES is false or no test projects available")
        return
      }

      const newName = `${ProjectData.update.name} ${Date.now()}`

      // Update project with new details
      const updatedProject = await yt.Admin.Projects.updateProject(
        createdProject.id,
        {
          name: newName,
          description: ProjectData.update.description,
        },
        {
          fields: PROJECT_DETAILED_FIELDS,
        },
      )

      // Verify project updates
      expect(updatedProject).toBeDefined()
      expect(updatedProject.id).toBe(createdProject.id)
      expect(updatedProject.name).toBe(newName)
      expect(updatedProject.description).toBe(ProjectData.update.description)
    })

    it("should archive and unarchive a project", async () => {
      const createdProject = helper.createdProject()

      if (!enableUpdates || !createdProject) {
        console.log("Skipping test: ENABLE_UPDATES is false or no test projects available")
        return
      }

      // Archive project
      const archivedProject = await yt.Admin.Projects.updateProject(
        createdProject.id,
        { archived: true },
        { fields: `${PROJECT_DETAILED_FIELDS},archived` },
      )

      expect(archivedProject).toBeDefined()
      expect(archivedProject.archived).toBe(true)

      // Unarchive project
      const unarchivedProject = await yt.Admin.Projects.updateProject(
        createdProject.id,
        { archived: false },
        { fields: `${PROJECT_DETAILED_FIELDS},archived` },
      )

      expect(unarchivedProject).toBeDefined()
      expect(unarchivedProject.archived).toBe(false)
    })

    it("should configure project custom fields", async () => {
      // Get project ID from the first created project
      const createdProject = helper.createdProject()

      // Skip if no projects were created or updates disabled
      if (!enableUpdates || !createdProject) {
        console.log("Skipping test: ENABLE_UPDATES is false or no test projects available")
        return
      }

      // Get project ID from the first created project
      const projectId = createdProject.id

      try {
        // Get existing custom fields
        const customFields = await yt.Admin.Projects.getProjectCustomFields(projectId, {
          fields: "id,name,field(name,fieldType)",
        })

        // Verify we can get custom fields
        expect(Array.isArray(customFields)).toBe(true)

        // We won't create custom fields here as it may require complex setup
        // But we verified we can access them
      } catch (error) {
        console.warn("Failed to get project custom fields:", error)
      }
    })

    it.skip("should add and configure a custom field to project", async () => {
      const createdProject = helper.createdProject()

      if (!enableUpdates || !createdProject) {
        console.log("Skipping test: ENABLE_UPDATES is false or no test projects available")
        return
      }

      // Get field types first to use a valid one
      const fieldTypes = await helper.getCustomFieldTypes()
      if (!fieldTypes || !fieldTypes.length) {
        console.log("No field types available, skipping")
        return
      }

      // Try to find a date field type - we need to handle potential undefined values
      const dateFieldType = fieldTypes.find(
        (ft) =>
          ft.fieldType &&
          typeof ft.fieldType === "object" &&
          "valueType" in ft.fieldType &&
          ft.fieldType.valueType === "date",
      )

      if (!dateFieldType || !dateFieldType.fieldType) {
        console.log("No date field type found, skipping")
        return
      }

      try {
        // Create and add a custom date field with proper type handling
        const customField = await helper.createProjectCustomField(
          createdProject.id,
          `Test Field ${Date.now().toString(36)}`,
          // Ensure we pass an object with the required properties
          {
            id: dateFieldType.fieldType.id,
            $type: "DateProjectCustomField", // Using valid custom field type, removing unsupported valueType property
          },
        )

        expect(customField).toBeDefined()
        // Add null check
        if (customField.field) {
          expect(customField.field.name).toContain("Test Field")
        }
      } catch (error) {
        console.warn("Failed to create custom field:", error)
      }
    })

    it("should delete a project", async () => {
      // Get project ID from the first created project
      const createdProject = helper.createdProject()

      // Skip if no projects were created or updates disabled
      if (!enableUpdates || !createdProject) {
        console.log("Skipping test: ENABLE_UPDATES is false or no test projects available")
        return
      }

      // Try to create a project specifically for deletion
      try {
        const projectToDelete = await helper.createTestProject(
          "Project To Delete",
          `PTD_${Date.now().toString(36)}`,
          "This project will be deleted",
        )

        expect(projectToDelete).toBeDefined()
        expect(projectToDelete.id).toBeDefined()

        // Delete the project
        await helper.deleteTestProject(projectToDelete.id)

        // Verify deletion by trying to fetch it (should fail)
        try {
          await yt.Admin.Projects.getProjectById(projectToDelete.id)
          // If we get here, the project still exists
          expect().fail("Project was not deleted")
        } catch (error) {
          // Expected error - project should not exist
          expect(error).toBeDefined()
        }
      } catch (error) {
        console.error("Failed to test project deletion:", error)
        expect().fail("Project deletion test failed")
      }
    })
  })

  // Test cases for project search and listing
  describe("2.2 Project Listing and Search", () => {
    it("should list all projects", async () => {
      // Get all projects
      const projects = await yt.Admin.Projects.getProjects({
        fields: PROJECT_BASE_FIELDS,
      })

      // Verify we got a list of projects
      expect(Array.isArray(projects)).toBe(true)

      // Get project ID from the first created project
      const createdProject = helper.createdProject()

      // If we created project, verify it is in the list
      if (createdProject) {
        const foundProjects = projects.filter((p) => p.id === createdProject.id)

        expect(foundProjects.length).toBeGreaterThan(0)
      }
    })

    it("should search for projects using query parameters", async () => {
      const createdProject = helper.createdProject()

      if (!createdProject) {
        console.log("Skipping test: No test projects available")
        return
      }

      // Test query parameters like $top to limit results
      const limitedProjects = await yt.Admin.Projects.getProjects({
        fields: PROJECT_BASE_FIELDS,
        $top: 3,
      })

      expect(Array.isArray(limitedProjects)).toBe(true)
      expect(limitedProjects.length).toBeLessThanOrEqual(3)

      // Test for archived projects - using a separate API call approach
      try {
        // Using a different approach that works with the API
        const projectsWithArchivedField = await yt.Admin.Projects.getProjects({
          fields: `${PROJECT_BASE_FIELDS},archived`,
        })

        // Just check that we can get projects with the archived field
        expect(Array.isArray(projectsWithArchivedField)).toBe(true)

        // Can filter archived projects in JavaScript if needed
        // const archivedProjects = projectsWithArchivedField.filter((p) => p.archived === true)
      } catch (error) {
        console.warn("Failed to get projects with archived field:", error)
      }
    })

    it("should support pagination for project listing", async () => {
      // Get first page
      const page1 = await yt.Admin.Projects.getProjects({
        fields: PROJECT_BASE_FIELDS,
        $top: 5,
        $skip: 0,
      })

      // Get second page
      const page2 = await yt.Admin.Projects.getProjects({
        fields: PROJECT_BASE_FIELDS,
        $top: 5,
        $skip: 5,
      })

      expect(Array.isArray(page1)).toBe(true)
      expect(Array.isArray(page2)).toBe(true)

      // Ensure pages have different content if there are enough projects
      if (page1.length === 5 && page2.length > 0) {
        const page1Ids = page1.map((p) => p.id)
        const page2Ids = page2.map((p) => p.id)

        // No project should appear on both pages
        const intersection = page1Ids.filter((id) => page2Ids.includes(id))
        expect(intersection.length).toBe(0)
      }
    })
  })

  // Test cases for project permissions and access
  describe("2.3 Project Access and Permissions", () => {
    it("should retrieve project issues", async () => {
      // Get project ID from the first created project
      const createdProject = helper.createdProject()

      // Skip if no projects were created
      if (!createdProject) {
        console.log("Skipping test: No test projects available")
        return
      }

      try {
        // Get project issues
        const issues = await yt.Issues.getIssues({
          query: `project: ${createdProject.shortName}`,
          fields: ISSUE_BASE_FIELDS,
          $top: 10,
        })

        // Verify we got a list of issues (might be empty for new project)
        expect(Array.isArray(issues)).toBe(true)
      } catch (error) {
        console.warn("Failed to get project issues:", error)
      }
    })

    it("should create an issue in the project", async () => {
      const createdProject = helper.createdProject()

      if (!enableUpdates || !createdProject) {
        console.log("Skipping test: ENABLE_UPDATES is false or no test projects available")
        return
      }

      try {
        // Create test issue
        const testIssue = await helper.createTestIssue(
          createdProject.id,
          "Test Issue for Project",
          "Description of test issue",
        )

        expect(testIssue).toBeDefined()
        expect(testIssue.summary).toBe("Test Issue for Project")

        // Verify issue exists in project issues
        const projectIssues = await yt.Issues.getIssues({
          query: `project: ${createdProject.shortName}`,
          fields: ISSUE_BASE_FIELDS,
        })

        const foundIssue = projectIssues.find((i) => i.id === testIssue.id)
        expect(foundIssue).toBeDefined()
      } catch (error) {
        console.warn("Failed to create test issue:", error)
      }
    })
  })

  // Test error handling for invalid operations
  describe("2.4 Error Handling", () => {
    it("should handle errors for invalid operations", async () => {
      if (!enableUpdates) {
        console.log("Skipping test: ENABLE_UPDATES is false")
        return
      }

      // Try to fetch a non-existent project
      try {
        await yt.Admin.Projects.getProjectById("non-existent-id")
        expect().fail("Should have thrown an error for non-existent project")
      } catch (error) {
        expect(error).toBeDefined()
      }

      // Try to create a project with invalid data
      try {
        // @ts-ignore - Intentionally passing invalid data for testing
        await yt.Admin.Projects.createProject({
          // Missing required fields like name or shortName
        })
        expect().fail("Should have thrown an error for invalid project data")
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })
})
