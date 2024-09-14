import type { SearchSuggestions, Entity, FieldsParam, Schema } from "../types"
import { fields, RequestBuilder } from "../utils"
import { ResourceApi } from "./common"

type SearchSuggestionsSchema = Schema<SearchSuggestions>
type SearchSuggestionsEntity<TSchema extends SearchSuggestionsSchema> = Entity<SearchSuggestions, TSchema>

/**
 * Lets you get suggestions for the currently entered search query.
 * https://www.jetbrains.com/help/youtrack/devportal/resource-api-search-assist.html
 */
export class SearchApi extends ResourceApi {
  /**
   * Get search query suggestions for the currently entered search query.
   * @param query - The current search query for which suggestions are requested.
   * @param fields - A list of SearchSuggestions attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns Search query suggestions.
   */
  async getSearchSuggestions<TSchema extends SearchSuggestionsSchema>(
    query: string,
    params?: FieldsParam<TSchema>
  ): Promise<SearchSuggestionsEntity<TSchema>> {
    return this.fetch<SearchSuggestionsEntity<TSchema>>(
      ...new RequestBuilder("api/search/assist", { fields }, params).post({ query })
    )
  }
}