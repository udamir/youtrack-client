import type {
  Schema,
  FieldsParam,
  Entity,
  ListParams,
  CustomField,
  FieldType,
  CustomFieldDefaults,
  ProjectCustomField,
  DeepPartial,
} from "../../types"
import { fields, queryParams, RequestBuilder } from "../../utils"
import { ResourceApi } from "../common"

type CustomFieldSchema = Schema<CustomField>
type FieldTypeSchema = Schema<FieldType>
type CustomFieldDefaultsSchema = Schema<CustomFieldDefaults>
type ProjectCustomFieldSchema = Schema<ProjectCustomField>

type CustomFieldEntity<TSchema extends CustomFieldSchema> = Entity<CustomField, TSchema>
type FieldTypeEntity<TSchema extends FieldTypeSchema> = Entity<FieldType, TSchema>
type CustomFieldDefaultsEntity<TSchema extends CustomFieldDefaultsSchema> = Entity<CustomFieldDefaults, TSchema>
type ProjectCustomFieldEntity<TSchema extends ProjectCustomFieldSchema> = Entity<ProjectCustomField, TSchema>

export class CustomFieldsApi extends ResourceApi {
  /**
   * Get all available custom fields in the system.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Maximum number of entries to return.
   * @param params.$skip - Optional. Number of entries to skip before returning the first one.
   * @returns A promise that resolves to a list of CustomField entities.
   */
  async getCustomFields<TSchema extends CustomFieldSchema>(
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<CustomFieldEntity<TSchema>[]> {
    return this.fetch<CustomFieldEntity<TSchema>[]>(
      ...new RequestBuilder(
        "api/admin/customFieldSettings/customFields",
        { fields, ...queryParams("$skip", "$top") },
        params,
      ).get(),
    )
  }

  /**
   * Create a new custom field in the system.
   * @param body - Required fields: name, fieldType.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the created CustomField entity.
   */
  async createCustomField<TSchema extends CustomFieldSchema>(
    body: {
      name: string
      fieldType: FieldType
    } & DeepPartial<CustomField>,
    params?: FieldsParam<TSchema>,
  ): Promise<CustomFieldEntity<TSchema>> {
    return this.fetch<CustomFieldEntity<TSchema>>(
      ...new RequestBuilder("api/admin/customFieldSettings/customFields", { fields }, params).post(body),
    )
  }

  /**
   * Read the custom field with the specific ID.
   * @param fieldId - The database ID of the custom field.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the requested CustomField entity.
   */
  async getCustomFieldById<TSchema extends CustomFieldSchema>(
    fieldId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<CustomFieldEntity<TSchema>> {
    return this.fetch<CustomFieldEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/customFieldSettings/customFields/${fieldId}`, { fields }, params).get(),
    )
  }

  /**
   * Update the custom field with the specific ID.
   * @param fieldId - The database ID of the custom field.
   * @param body - The fields to update in the custom field.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the updated CustomField entity.
   */
  async updateCustomField<TSchema extends CustomFieldSchema>(
    fieldId: string,
    body: DeepPartial<CustomField>,
    params?: FieldsParam<TSchema>,
  ): Promise<CustomFieldEntity<TSchema>> {
    return this.fetch<CustomFieldEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/customFieldSettings/customFields/${fieldId}`, { fields }, params).post(body),
    )
  }

  /**
   * Delete the custom field with the specific ID.
   * @param fieldId - The database ID of the custom field.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the deleted CustomField entity.
   */
  async deleteCustomField<TSchema extends CustomFieldSchema>(
    fieldId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<CustomFieldEntity<TSchema>> {
    return this.fetch<CustomFieldEntity<TSchema>>(
      ...new RequestBuilder(`api/admin/customFieldSettings/customFields/${fieldId}`, { fields }, params).delete(),
    )
  }

  /**
   * Get all available field types.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. Maximum number of entries to return.
   * @param params.$skip - Optional. Number of entries to skip before returning the first one.
   * @returns A promise that resolves to the list of FieldType entities.
   */
  async getFieldTypes<TSchema extends FieldTypeSchema>(
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<FieldTypeEntity<TSchema>[]> {
    return this.fetch<FieldTypeEntity<TSchema>[]>(
      ...new RequestBuilder(
        "api/admin/customFieldSettings/types",
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }

  /**
   * Get default settings for the field.
   * @param fieldId - The database ID of the custom field.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the CustomFieldDefaults entity.
   */
  async getCustomFieldDefaults<TSchema extends CustomFieldDefaultsSchema>(
    fieldId: string,
    params?: FieldsParam<TSchema>,
  ): Promise<CustomFieldDefaultsEntity<TSchema>> {
    return this.fetch<CustomFieldDefaultsEntity<TSchema>>(
      ...new RequestBuilder(
        `api/admin/customFieldSettings/customFields/${fieldId}/fieldDefaults`,
        { fields },
        params,
      ).get(),
    )
  }

  /**
   * Update default settings for the field.
   * @param fieldId - The database ID of the custom field.
   * @param body - The new default settings for the field.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @returns A promise that resolves to the updated CustomFieldDefaults entity.
   */
  async updateCustomFieldDefaults<TSchema extends CustomFieldDefaultsSchema>(
    fieldId: string,
    body: DeepPartial<CustomFieldDefaults>,
    params?: FieldsParam<TSchema>,
  ): Promise<CustomFieldDefaultsEntity<TSchema>> {
    return this.fetch<CustomFieldDefaultsEntity<TSchema>>(
      ...new RequestBuilder(
        `api/admin/customFieldSettings/customFields/${fieldId}/fieldDefaults`,
        { fields },
        params,
      ).post(body),
    )
  }

  /**
   * Get all project related settings of this custom field.
   * This method lets you see in which projects this custom field is used.
   * @param fieldId - The database ID of the custom field.
   * @param params - Optional parameters for response filtering.
   * @param params.fields - A list of attributes that should be returned in the response. If no field is specified, only the entityId is returned.
   * @param params.$top - Optional. The maximum number of entries to return in the response.
   * @param params.$skip - Optional. The number of entities to skip before returning the first one.
   * @returns A promise that resolves to the list of ProjectCustomField entities.
   */
  async getCustomFieldInstances<TSchema extends ProjectCustomFieldSchema>(
    fieldId: string,
    params?: FieldsParam<TSchema> & ListParams,
  ): Promise<ProjectCustomFieldEntity<TSchema>[]> {
    return this.fetch<ProjectCustomFieldEntity<TSchema>[]>(
      ...new RequestBuilder(
        `api/admin/customFieldSettings/customFields/${fieldId}/instances`,
        { fields, ...queryParams("$top", "$skip") },
        params,
      ).get(),
    )
  }
}
