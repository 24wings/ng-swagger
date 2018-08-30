
import { SwaggerJson, ApiModel, ApiProperty, ApiEnumModels, ApiPropertyTypeEnum, ApiModelPropetys, ApiPropertys } from "./swagger";

import { SwaggerParser, } from "./swagger-parser";

import * as  nunjucks from 'nunjucks';


var env = new nunjucks.Environment();

// env.addFilter('getType', getType);
// env.addFilter('importModel', getImports);
// env.addFilter('getModelType', getModelType);
// env.addFilter("importEnum", getImportEnum);
// env.addFilter("getTotalEnums", getTotalEnums);

// getModelType
/** template path  support share-platorm */
// const TemplateDir = path.resolve(__dirname, "../template");
const ModelFilename = "model.nunjucks";
const EnumFilename = "enum.nunjucks";
const ApiFilename = "api.nunjucks";





interface TemplateCompileExt {
    output: string;
    model: ApiModel;
}


let enums: ApiEnumModels = {

}



export class SwaggerCode {

    generateFilesFromTemplate() {

        let swaggerJson = this.loadJson(this.opt.dataUrl);
        // getTotalEnums(swaggerJson); 
        // let swaggerParser = new SwaggerParser(swaggerJson);
        // let templateDir = TemplateDir + "/" + this.opt.template;
        // let dirs = fileDisplay(templateDir);
        // this.copyFilesFilterTemplateFile(templateDir, destDir);
        // let modelTemplate = dirs.find(dir => !dir.isDir && dir.filepath.endsWith("model"));

        // if (modelTemplate) {
        // this.generateModelFiles(modelTemplate.filepath, swaggerJson, { output: process.cwd() + "/" + this.opt.output })
        // }
        // let enumTemplate = dirs.find(dir => !dir.isDir && dir.filepath.endsWith(EnumFilename));
        // if (enumTemplate) {
        // this.generateEnumFiles(enumTemplate.filepath, swaggerJson, { output: process.cwd() + "/" + this.opt.output })
        // }
        // let apiTemplate = dirs.find(dir => !dir.isDir && dir.filepath.endsWith(EnumFilename));
        // if (enumTemplate) {
        // this.generateEnumFiles(enumTemplate.filepath, swaggerJson, { output: process.cwd() + "/" + this.opt.output })
        // }


    }
    copyFilesFilterTemplateFile(templateDir: string, destDir: string) {
    }
    generateModelFiles(templatePath: string, swaggerJson: SwaggerJson, opt: { output: string }) {
        for (let model in swaggerJson.definitions) {
            // let str = env.renderString(fs.readFileSync(templatePath, 'utf8'), { swagger: swaggerJson, model: { key: model, value: swaggerJson.definitions[model] } });
            // console.log(str)
            // let outpath = `${opt.output}${templatePath.replace(process.cwd(), "").replace(ModelFilename, "")}${model}.ts`;
            // console.log(outpath);
            // writeFile(outpath, str, (err: any) => err ? console.log(err) : "");
        }
    }
    generateEnumFiles(templatePath: string, swaggerJson: SwaggerJson, opt: { output: string }) {
        // let enumObj = this.getTotalEnums()

        // for (let e in enumObj) {
        // let obj = enumObj[e];
        // console.log(obj)
        // let str = env.renderString(fs.readFileSync(templatePath, 'utf8'), { swagger: swaggerJson, enum: { key: e, value: obj } });
        // console.log(str)
        // let outpath = `${opt.output}${templatePath.replace(process.cwd(), "").replace(EnumFilename, "")}${e}.enum.ts`;
        // console.log(outpath);
        // writeFile(outpath, str, (err: any) => err ? console.log(err) : "");
        // }
    }
    generateApiFiles() {

        // for (let e in enumObj) {
        //     let obj = enumObj[e];
        //     console.log(obj)
        // let str = env.renderString(fs.readFileSync(templatePath, 'utf8'), { swagger: swaggerJson, enum: { key: e, value: obj } });
        // console.log(str)
        // let outpath = `${opt.output}${templatePath.replace(process.cwd(), "").replace(EnumFilename, "")}${e}.enum.ts`;
        // console.log(outpath);
        // writeFile(outpath, str, (err: any) => err ? console.log(err) : "");
        // }
    }


    private loadJson(dataUrlpath: string) {
        // if (this.opt.template.match("http://")) {
        //     console.log(`request swagger json from ${dataUrlpath}`);
        //     return null as any;

        // } else {
        //     let aboPath = path.resolve(process.cwd(), dataUrlpath);
        //     let exist = fs.existsSync(aboPath);
        //     if (exist) {
        //         return JSON.parse(fs.readFileSync(aboPath, "utf8"));
        //     } else {
        //         console.error(`local file ${aboPath} is not exist`)
        //         return null as any;
        //     }

        // }
    }



    constructor(public opt: { dataUrl: string, output: string, template: string, format: string }) {
        console.log(opt);
    }


}

