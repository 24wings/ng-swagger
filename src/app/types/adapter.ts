import { ApiModel } from "./swagger";

export interface TemplateAdapter {
    getEnumTemplate(key: string, enumValue): string;
    getModelTemplate(key: string, modelValue): string;
    getContollerTemplate(key: string, controllerValue): string;
    getApiTemplate(key: string, apiValue): string;
    getImportEnum(modelName: string, model: ApiModel): string;
    getImportModels(model: ApiModel): string;
}

export interface AdapterConfig {
    enumTemplateUrl: string;
    modelTemplateUrl: string;
    apiTemplateUrl: string;
}
