import type { CommandList, Entity, FieldsParam, Schema } from "../types"
import { fields, RequestBuilder } from "../utils"
import { ResourceApi } from "./common"

type CommandListSchema = Schema<CommandList>
type CommandListEntity<TSchema extends CommandListSchema> = Entity<CommandList, TSchema>

/**
 * This resource lets you apply commands to issues.
 * https://www.jetbrains.com/help/youtrack/devportal/resource-api-commands.html
 */
export class CommandsApi extends ResourceApi {
  /**
   * Applies a command to the specified issues.
   * @param body - Required fields: query - the command to apply, issues (id or idReadable of at least one issue that the command will be applied to).
   * @param params.fields - A list of CommandList attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.muteUpdateNotifications - Set this parameter to true if no notifications should be sent on changes made by this request.
   * @returns The result of the command application.
   */
  async applyCommandToIssues<TSchema extends CommandListSchema>(
    body: Partial<Omit<CommandList, "id">>,
    params?: FieldsParam<TSchema> | { muteUpdateNotifications?: boolean }
  ): Promise<CommandListEntity<TSchema>> {
    return this.fetch<CommandListEntity<TSchema>>(
      ...new RequestBuilder('api/commands', { fields, muteUpdateNotifications: "string" }, params).post(body)
    )
  }

  /**
   * Gets command suggestions for the specified query.
   * @param body - Required fields: query - the command that you'll get suggestions for.
   * @param params.fields - A list of CommandList attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A list of command suggestions based on the specified query.
   */
  async getCommandSuggestions<TSchema extends CommandListSchema>(
    body: Partial<Omit<CommandList, "id">>,
    params?: FieldsParam<TSchema>
  ): Promise<CommandListEntity<TSchema>> {
    return this.fetch<CommandListEntity<TSchema>>(
      ...new RequestBuilder('api/commands/assist', { fields }, params).post(body)
    )
  }
}