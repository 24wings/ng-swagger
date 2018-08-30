import { TemplateAdapter, AdapterConfig } from "./adapter";
import { SwaggerJson, ApiModel, ApiPropertyTypeEnum } from "./swagger";
import { SwaggerParser } from "./swagger-parser";
import { captilize } from "./util";

export class TypescriptTemplateAdapter implements TemplateAdapter {
    getEnumTemplate(key: string, enumValue): string {
        return `export  enum ${key}  {
        ${enumValue.enum.map(en => `${en}="${en}";`).join('\n      ')}
    }
        `;

    }
    getModelTemplate(key: string, modelValue: ApiModel): string {
        return `export class ${key} {
        ${Object.keys(modelValue.properties).map(key => key + ":" + this.swaggerParser.getModelType(this.swaggerParser.getType(modelValue.properties[key].type, modelValue.properties[key], key))).join('\n        ')}
        }`}
    getImportEnum(modelName: string, model: ApiModel): string {
        console.log(`modelname;${modelName}`)
        let str: string[] = []


        let totalEnum = this.swaggerParser.getTotalEnums();

        for (let propKey in model.properties) {
            let prop = model.properties[propKey];
            if (prop.type == ApiPropertyTypeEnum.string && prop.enum != null) {
                /** 统配 enum */
                let keys = Object.keys(totalEnum);
                if (keys.indexOf(captilize(propKey) + "Enum") != -1) {
                    str.push(captilize(propKey) + "Enum")
                }
                if (keys.indexOf(captilize(modelName) + captilize(propKey) + "Enum") != -1) {
                    str.push(captilize(modelName) + captilize(propKey) + "Enum")
                }
            } else {
                // console.log(`not`, prop);
            }
        }
        return str.map(enumName => `import {${enumName}} from "../enum/${enumName}";`).join(`\n`) + "\n";
    }

    getContollerTemplate(key: string, controller): string {
        return "";
    }
    getApiTemplate(key: string, apiValue): string {
        return "";
    }
    getImportModels(model: ApiModel): string {
        let keys = Object.getOwnPropertyNames(model.properties);
        let importModels: string[] = [];

        for (let key in model.properties) {
            let prop = model.properties[key];

            if (prop.$ref) {
                let name = prop.$ref.replace("#/definitions/", "");
                if (importModels.indexOf(name) == -1)
                    importModels.push(prop.$ref.replace("#/definitions/", ""));
            } else {
                if (prop.items) {
                    // debugger;

                    if (prop.items.$ref) {
                        let name = prop.items.$ref.replace("#/definitions/", "");
                        if (importModels.indexOf(name) == -1)
                            importModels.push(name);
                    }

                }
            }
        }

        return importModels.map(modelName => `import {${modelName}} from "../entity/${modelName}";`).join('\n') + "\n";
    }

    constructor(public swaggerJson: SwaggerJson, public opt: AdapterConfig, public swaggerParser?: SwaggerParser) {
        if (!swaggerParser) this.swaggerParser = new SwaggerParser(swaggerJson);
    }


}