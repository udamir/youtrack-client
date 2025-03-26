import * as dotenv from "dotenv"
import axios from "axios"
import { YouTrack } from "../../src"

// load environment variables from .env file
dotenv.config()

// define test youtrack project and token from environment variables
const { 
  YOUTRACK_BASE_URL = "", 
  YOUTRACK_TOKEN = "", 
  TEST_PROJECT_ID = "",
  ENABLE_UPDATES = "false", 
  RESTORE_STATE_AFTER_TEST = "true",
} = process.env

const yt = YouTrack.axiosClient(axios, YOUTRACK_BASE_URL, YOUTRACK_TOKEN)

// Convert string environment variables to booleans
const enableUpdates = ENABLE_UPDATES.toLowerCase() === "true"
const restoreStateAfterTest = RESTORE_STATE_AFTER_TEST.toLowerCase() === "true"

describe("Basic issue cases", () => {
  it("should create and delete test issue in test project", async () => {
    if (!enableUpdates) {
      console.log("Skipping issue creation test - ENABLE_UPDATES is set to false")
      return
    }

    // Ensure TEST_PROJECT_ID is provided
    if (!TEST_PROJECT_ID) {
      console.error("TEST_PROJECT_ID is not defined in .env file. Please add a valid project ID.")
      return
    }

    const issue = await yt.Issues.createIssue({
      project: { id: TEST_PROJECT_ID },
      summary: "Test issue",
      description: "This is a test issue created by automated tests"
    }, { fields: "id,summary,created,updated,project(id,name)" })
    
    expect(issue.id).toBeDefined()
    expect(issue.summary).toBe("Test issue")
    expect(issue.created).toBeDefined()
    expect(issue.updated).toBeDefined()
    
    const deleted = await yt.Issues.deleteIssue(issue.id)
    expect(deleted).toBe("")

    // Verify the issue was deleted by attempting to fetch it - should throw 404
    try {
      await yt.Issues.getIssueById(issue.id, { fields: "id" })
      fail("Issue was not deleted - it can still be fetched")
    } catch (error) {
      // Ensure it's specifically a 404 Not Found error from Axios
      expect(axios.isAxiosError(error)).toBe(true)
      if (axios.isAxiosError(error)) {
        expect(error.response?.status).toBe(404)
      }
    }
  })

  it("should get issues by query", async () => {
    // This test doesn't modify data, so it can always run
    const issues = await yt.Issues.getIssues({ 
      fields: "id,idReadable,summary,project(id,name)", 
      $top: 5 
    })
    
    expect(Array.isArray(issues)).toBe(true)
    
    if (issues.length > 0) {
      // Verify the structure of returned issues
      const firstIssue = issues[0]
      expect(firstIssue.id).toBeDefined()
      expect(firstIssue.summary).toBeDefined()
      if (firstIssue.project) {
        expect(firstIssue.project.id).toBeDefined()
      }
    }
  })

  it("should get issue by ID", async () => {
    // This test may need to create a test issue first to have a guaranteed ID to fetch
    let testIssueId: string | null = null
    let shouldDeleteIssue = false

    try {
      // First try to get any existing issue
      const issues = await yt.Issues.getIssues({ 
        fields: "id", 
        $top: 1 
      })

      if (issues.length > 0) {
        testIssueId = issues[0].id
      } else if (enableUpdates) {
        // If no issues exist and we're allowed to create one
        const issue = await yt.Issues.createIssue({
          project: { id: TEST_PROJECT_ID },
          summary: "Test issue for getIssueById test",
          description: "This is a test issue created to test the getIssueById API"
        }, { fields: "id" })
        
        testIssueId = issue.id
        shouldDeleteIssue = true
      } else {
        console.log("Skipping getIssueById test - no issues found and ENABLE_UPDATES is false")
        return
      }

      // Now test fetching the issue by ID
      const fetchedIssue = await yt.Issues.getIssueById(testIssueId, {
        fields: "id,summary,description,created,updated,project(id,name)"
      })
      
      expect(fetchedIssue.id).toBe(testIssueId)
      expect(fetchedIssue.summary).toBeDefined()
      expect(fetchedIssue.created).toBeDefined()
      expect(fetchedIssue.updated).toBeDefined()
      expect(fetchedIssue.project?.id).toBeDefined()      
    } finally {
      // Clean up any issue we created for this test
      if (shouldDeleteIssue && testIssueId && restoreStateAfterTest) {
        await yt.Issues.deleteIssue(testIssueId)
      }
    }
  })
})
