import type { FetchApi, FieldsParam, FilterFields, ListParams, Schema } from "../types"
import { RequestBuilder } from "../utils/queryBuilder"
import type { Agile } from "../types/entities/Agile"
import { fields } from "../utils/fetchHelpers"

export type AgileSchema = Schema<Agile>
export type AgileFiltered<TSchema extends AgileSchema> = FilterFields<Agile, TSchema>

export type AgileTemplateParam = {
  template?: 'kanban' | 'scrum' | 'version' | 'custom' | 'personal'
}

export class AgilesApi {
  constructor(private fetch: FetchApi) {}

  async getAgiles<TSchema extends AgileSchema>(
    params?: ListParams & FieldsParam<TSchema>,
  ): Promise<AgileFiltered<TSchema>[]> {
    return this.fetch<AgileFiltered<TSchema>[]>(
      ...new RequestBuilder("api/agiles", { fields, $skip: "number", $top: "number" }, params).get(),
    )
  }

  async createAgile<TSchema extends AgileSchema>(
    body: Omit<Agile, "id">,
    params?: AgileTemplateParam & FieldsParam<TSchema>,
  ): Promise<AgileFiltered<TSchema>[]> {
    return this.fetch<AgileFiltered<TSchema>[]>(
      ...new RequestBuilder("api/agiles", { fields, template: "string" }, params).post(body),
    )
  }

  async getAgileById<TSchema extends AgileSchema>(
    id: string,
    params?: FieldsParam<TSchema>,
  ): Promise<AgileFiltered<TSchema>[]> {
    return this.fetch<AgileFiltered<TSchema>[]>(...new RequestBuilder(`/api/agiles/${id}`, { fields }, params).get())
  }

  async updateAgile<TSchema extends AgileSchema>(
    id: string,
    body: Omit<Agile, "id">,
    params?: FieldsParam<TSchema>,
  ): Promise<AgileFiltered<TSchema>[]> {
    return this.fetch<AgileFiltered<TSchema>[]>(
      ...new RequestBuilder(`/api/agiles/${id}`, { fields }, params).post(body),
    )
  }

  async deleteAgile<TSchema extends AgileSchema>(
    id: string,
    params?: FieldsParam<TSchema>,
  ): Promise<AgileFiltered<TSchema>[]> {
    return this.fetch<AgileFiltered<TSchema>[]>(...new RequestBuilder(`/api/agiles/${id}`, { fields }, params).delete())
  }

  async getAgileSprints<TSchema extends AgileSchema>(
    AgileId: string,
    params?: ListParams & FieldsParam<TSchema>,
  ): Promise<AgileFiltered<TSchema>[]> {
    return this.fetch<AgileFiltered<TSchema>[]>(
      ...new RequestBuilder(`/api/agiles/${AgileId}/sprints`, { fields, $skip: "number", $top: "number" }, params).get(),
    )
  }
}
