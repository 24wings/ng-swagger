import { TemplateAdapter } from "./adapter";
import { SwaggerJson, ApiModel } from "./swagger";
import { SwaggerParser } from "./swagger-parser";

export class JavaTemplateAdapter implements TemplateAdapter {
    getEnumTemplate(key: string, enumValue): string {
        console.log(enumValue)
        return `public  enum ${key}  {
        ${enumValue.enum.join(',\n        ')} ;
            }`;
        ;
    }
    getModelTemplate(key: string, modelValue: ApiModel): string {
        return `export class ${key} {
        ${Object.keys(modelValue.properties).map(key => key + ":" + this.swaggerParser.getModelType(this.swaggerParser.getType(key, modelValue.properties[key], key))).join('\n        ')}
        }`
    }
    getContollerTemplate(key: string, controller): string {
        return "";
    }
    getApiTemplate(key: string, apiValue): string {
        return "";
    }
    constructor(public swaggerJson: SwaggerJson, public swaggerParser?: SwaggerParser) {
        if (!swaggerParser) this.swaggerParser = new SwaggerParser(swaggerJson);
    }
    getImportEnum(modelName: string, model: ApiModel): string {
        return "";
    }
    getImportModels(model: ApiModel): string {
        return "";
    }
}  