import type { EntityBase } from "./Entity"
import type { User } from "./User"
import type { Project } from "./Project"

export type Workflow = EntityBase<"Workflow"> & {
  name: string
  title: string
  autoAttach: boolean
  compatible: boolean
  converted: boolean
  entityExtensionsFile: object | null
  language: PackageLanguage
  manifestFile: AppConfigFile
  minimalApiVersion: string | null
  permanent: boolean
  restoreStatus: WorkflowRestoreStatus
  rules: WorkflowRule[]
  settingsFile: object | null
  updated: number
  updatedBy: User | null
  usages: WorkflowUsage[]
}

export type PackageLanguage = EntityBase<"PackageLanguage">

export type AppConfigFile = EntityBase<"AppConfigFile"> & {
  name: string
  content: string | null
  editable: boolean
  updated: number
  updatedBy: User | null
}

export type WorkflowRestoreStatus = EntityBase<"Status">

export type WorkflowRule = EntityBase<"WorkflowRule"> & {
  name: string
  title: string | null
  description: string | null
  script: string | null
  type: string
  updated: number
  updatedBy: User | null
  usages: WorkflowRuleUsage[]
  workflow: Workflow
}

export type WorkflowRuleUsage = EntityBase<"WorkflowRuleUsage"> & {
  enabled: boolean
  isBroken: boolean
  problems: WorkflowProblem[]
  project: Project
  rule: WorkflowRule
}

export type WorkflowProblem = EntityBase<"Problem"> & {
  message: string
  fixes: string[]
  global: boolean
  problemKey: string
}

export type WorkflowLog = EntityBase<"WorkflowLog"> & {
  level: string
  message: string
  presentation: string
  stacktrace: string
  timestamp: number
  username: string
}

export type WorkflowUsage = EntityBase<"WorkflowUsage"> & {
  project: Project
  isBroken: boolean
}
