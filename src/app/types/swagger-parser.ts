import { SwaggerJson, ApiModel, ApiProperty, ApiPropertyTypeEnum, ApiPropertys, ApiDefinitions, PathObject, Tag } from "./swagger";
import { captilize } from "./util";

export class SwaggerParser {
    public getTotalApi(): PathObject {
        return this.swaggerJson.paths;
    }
    public getApiTags(): Tag[] {
        return this.swaggerJson.tags;
    }
    public getTotalClass(): ApiDefinitions {
        return this.swaggerJson.definitions;
    }

    public getTotalEnums(): ApiPropertys {
        let props: ApiPropertys = {};
        let enums: { key: string, prop: ApiProperty, model: string }[] = [];
        for (let key in this.swaggerJson.definitions) {
            let model = this.swaggerJson.definitions[key];
            for (let propKey in model.properties) {
                let prop = model.properties[propKey];
                if (prop.type == ApiPropertyTypeEnum.string && prop.enum != null) {
                    /** 统配 enum */
                    enums.push({ key: propKey, prop, model: key });
                } else {
                    // console.log(`not`, prop);
                }
            }
        }
        enums.forEach(e => {
            if (e.prop) {
                /** 重复多次判断 */
                let samekeys = enums.filter(eu => e.key == eu.key);
                /**
                 * 此时有相同的属性名称
                 * 判断每个key 的enum是否与其他完全一致
                 */
                if (samekeys.length > 1) {
                    console.log(`=======${e.model}=${e.key}========`);
                    let isAllthesame = true;
                    samekeys.forEach(onekey => {
                        samekeys.forEach(temkey => {
                            if (!this.enumThemsame(onekey.prop.enum as string[], temkey.prop.enum as string[])) {
                                isAllthesame = false;
                            }
                        }
                        )
                    })
                    if (isAllthesame) {
                        // console.log(`isallthesam `, e);
                        props[captilize(e.key) + "Enum"] = {
                            type: ApiPropertyTypeEnum.string,
                            enum: e.prop.enum,
                            description: e.prop.description
                        }
                    } else {
                        props[captilize(e.model) + captilize(e.key) + "Enum"] = {
                            type: ApiPropertyTypeEnum.string,
                            enum: e.prop.enum,
                            description: e.prop.description
                        }
                    }
                } else {
                    // console.log(`--------${e.key}-------------`);
                    props[captilize(e.key) + "Enum"] = {
                        type: ApiPropertyTypeEnum.string,
                        enum: e.prop.enum,
                        description: e.prop.description
                    }
                }
            }
        })
        /**
         * 1. key 分组
         * 如果 key相同而且所有属性相同,保留一个enum  原名
         * 如果 key相同而不同model的enum值不同,则进行分不同组
         */
        console.log(Object.getOwnPropertyNames(props))
        return props;
    }
    enumThemsame(e1: string[], e2: string[]) {
        return e1.every((str, i) => str === e2[i]) && e2.length == e1.length;

    }
    getType(key: string, property: ApiProperty, modelName: string): string {
        // console.log(key, property); 
        if (property.type) {
            switch (property.type.toLowerCase()) {
                case "integer":
                    return "number";
                case "number":
                    return "number";
                case "string":
                    switch (property.format) {
                        case ApiPropertyTypeEnum.dateTime:
                            return "Date";
                        default:
                            if (!property.enum) {
                                return "string";
                            } else {
                                let totalEnum = this.getTotalEnums();
                                /** 统配 enum */
                                let keys = Object.keys(totalEnum);
                                if (keys.indexOf(captilize(key) + "Enum") != -1) {
                                    // debugger
                                    console.log(key)
                                    return captilize(key) + "Enum";
                                }
                                if (keys.indexOf(captilize(modelName) + captilize(key) + "Enum") != -1) {
                                    return captilize(modelName) + captilize(key) + "Enum";
                                }
                                else {
                                    // console.log(`not`, prop);
                                }
                                /** count enum  */
                            }
                            return "string"
                    }
                case "object":
                    return "any";
                case "boolean":
                    return "boolean";
                case "array":
                    if (property.items) {
                        if (property.items.$ref) {
                            return property.items.$ref
                        }
                        if (property.items.type) {
                            return `${property.items.type} []`
                        }

                    } else {
                        return "unkown"
                    }

                default:
                    if (property.$ref != null) {
                        return property.$ref
                    } else {
                        return "unkown";
                    }
            }
        } else {
            return property.$ref as string;
        }
    }
    getImports(model: ApiModel, ): string[] {
        let keys = Object.getOwnPropertyNames(model.properties);
        let importModels: Set<string> = new Set();
        for (let key in model.properties) {
            let prop = model.properties[key];
            if (prop.$ref) {
                importModels.add(prop.$ref.replace("#/definitions/", ""));
            }
            if (prop.items) {
                if (prop.items.$ref) {
                    importModels.add(prop.items.$ref.replace("#/definitions/", ""));
                }

            }
        }
        let values = importModels.values()
        let models: string[] = [];
        // for (let value of values) {
        //     models.push(value);
        // }
        return models;

    }
    getImportEnum(modelName: string, model: ApiModel): string[] {
        console.log(`modelname;${modelName}`)
        let str: string[] = []
        let totalEnum = this.getTotalEnums();

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
        return str;
    }
    getModelType(key: string): string {
        if (key && key.startsWith("#/definitions")) {
            let models = Object.getOwnPropertyNames(this.swaggerJson.definitions);
            if (models.find(model => model == key.replace("#/definitions/", ""))) {
                return key.replace("#/definitions/", "")
            } else {
                return key;
            }

        } else {
            if (key.endsWith("Enum")) {
                return key;
            } else {
                return key;
            }
        }
    }
    constructor(public swaggerJson: SwaggerJson) {
        console.log(swaggerJson);
    }

}





