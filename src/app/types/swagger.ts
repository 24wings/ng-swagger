export interface SwaggerJson {
    basePath: string;
    definitions: ApiDefinitions;
    paths: PathObject;
    tags: Tag[];


}
export interface ApiDefinitions {
    [key: string]: ApiModel
}

export interface ApiModelPropetys {
    [key: string]: ApiPropertys
}
export interface ApiModel {
    properties: ApiPropertys;
}
export interface ApiPropertys {
    [key: string]: ApiProperty
}
export interface ApiProperty {
    type?: ApiPropertyTypeEnum;
    format?: ApiPropertyTypeEnum;
    $ref?: string;
    enum?: string[];
    description?: string;
    items?: { $ref: string, type: string }
    tags?: string[];
}

export enum ApiPropertyFormatEnum {
    Int64 = "int64"
}
export enum ApiPropertyTypeEnum {
    integer = "integer",
    dateTime = "date-time",
    array = "array",
    string = "string"
}


export interface ApiEnumModels {
    [key: string]: ApiProperty;
}

export interface PathObject {
    [key: string]: Path;
}
export interface Path {
    get: PathProp;
    post: PathProp;
}
export interface PathProp {
    /** api 简述 */
    summary: string;
    parameters: Parameter[];
    /**分类*/
    tags: string[];

}

export interface Parameter {
    description: string;
    format: string;
    in: "query" | "body";
    name: string;
    required: boolean;
    type: string
}


export interface Tag {
    name: string;
    description: string;
    /**ext */
    checked?: boolean;
}