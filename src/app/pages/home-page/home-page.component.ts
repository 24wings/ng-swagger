import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { SwaggerJson, ApiPropertys, ApiDefinitions, Tag, PathObject } from '../../types/swagger';
import { SwaggerParser } from '../../types/swagger-parser';
import { TypescriptTemplateAdapter } from '../../types/typescript-adapter';
import { AdapterConfig } from '../../types/adapter';
import { JavaTemplateAdapter } from '../../types/java-adapter';
import { ZipService } from '../../service/zip-service';
enum View {
  All,
  Enum,
  Entity,
  Api,
  Service
}

type ItemType = "enum" | "model" | "api" | "controller";
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  View = View;
  state = View.All;
  importDataModalVisible: boolean = false;
  type: ItemType;
  downloadOptions = {
    enumDir: "/share_platform/enum/",
    entityDir: "/share_platform/entity/",
    apiDir: "/share_platform/api/"

  }

  keywords: string = "";
  checkOptionsOne = [
    { label: '编辑器,设计器与代码同步', value: 'Apple', checked: true },
    { label: '测试集成,分组多样性参数,数据库表集成测试(后端java,单表查询封装称jar)', value: 'Pear' },
    { label: '类图与uml 实体分析,xml', value: 'Orange' },
    { label: 'enum,api,model,service,工具,管道', value: 'Orange' },
    { label: '前端文档解析' },

  ];
  download() {
    let enumFiles = Object.keys(this.totalEnums).map(key => { return { path: this.downloadOptions.enumDir + key + ".ts", content: this.tsAdapter.getEnumTemplate(key, this.totalEnums[key]) } });
    let entityFiles = Object.keys(this.totalClass).map(key => {
      return {
        path: this.downloadOptions.entityDir + key + ".ts",
        content: this.tsAdapter.getImportModels(this.totalClass[key])
          + this.tsAdapter.getImportEnum(key, this.totalClass[key])
          + this.tsAdapter.getModelTemplate(key, this.totalClass[key])
      }
    });
    let apiFiels = Object.keys(this.totalApi).map(key => { return { path: this.downloadOptions.apiDir + key + ".ts", content: this.tsAdapter.getApiTemplate(key, this.totalApi[key]) } });
    this.zip.downloadZip(enumFiles.concat(...entityFiles).concat(...apiFiels));
  }
  getSelectParams(): { in: 'query' | 'body', name: string, description: string, required: boolean }[] {
    return (this.selectedData.data.value.get || this.selectedData.data.value.post).parameters;
  }
  getSelelectQueryParams() {
    return this.getSelectParams().filter(param => param.in == 'query');
  }
  getSelelectBodyParams() {
    return this.getSelectParams().filter(param => param.in == 'body');
  }
  log(value: object[]): void {
    console.log(value);
  }
  visible: boolean = false;
  objectKeys = Object.keys;
  url: string = "/assets/demo-swagger.json";
  javaAdapter: JavaTemplateAdapter;
  tsAdapter: TypescriptTemplateAdapter;
  opt: AdapterConfig = {
    enumTemplateUrl: "http://localhost:4200/assets/templates/typescript/enum.nunjucks",
    modelTemplateUrl: "/assets/templates/typescript/mode.nunjucks",
    apiTemplateUrl: "/assets/template/typescript/api.nunjucks"
  }
  getModalTitle(): string {
    if (this.selectedData) {
      switch (this.selectedData.type) {
        case "enum":
          return "枚举:" + this.selectedData.data.key;
        case "model":
          return "实体:" + this.selectedData.data.key;
        case "api":
          return (this.selectedData.data.value.get ? `<span class="symbol get"></span>` : `<span class="symbol post"></span>`) + "接口:" + this.selectedData.data.key;
      }
    } else {
      return "unkown"
    }
  }
  selectedData: { type: ItemType, data: any };
  searchByKeyword() {
    if (this.keywords) {

    } else {
      this.parseData();
    }

  }
  checkTypes(type?: ItemType) {
    if (type) {
      this.type = type
    } else {
      this.type = null;
    }
  }

  title = 'app';
  multiApi: boolean = false;
  swaggerJson: SwaggerJson;

  totalEnums: ApiPropertys = {};
  totalClass: ApiDefinitions = {};
  totalApi: PathObject = {};
  totalTags: Tag[] = [];
  listOfOption = [];
  listOfTagOptions = [];
  displayPathObject: PathObject = {};


  logEnum(key: string, value) {
    this.visible = true;
    this.selectedData = { type: "enum", data: { key, value } };
    console.log(this.tsAdapter.getEnumTemplate(key, value));
    console.log(this.javaAdapter.getEnumTemplate(key, value));

  }
  logModel(key: string, value) {
    this.visible = true;
    this.selectedData = { type: "model", data: { key, value } };
    console.log(this.tsAdapter.getModelTemplate(key, value));
    console.log(this.javaAdapter.getModelTemplate(key, value));
  }
  logController(key: string, apiController) {
    this.visible = true;
    this.selectedData = { type: "controller", data: { key, apiController } };
  }
  logApi(key: string, value) {
    this.visible = true;
    this.selectedData = { type: "api", data: { key, value } };
    // console.log(this.tsAdapter.getModelTemplate(key, value));
    // console.log(this.javaAdapter.getModelTemplate(key, value));
  }

  ngOnInit(): void {
    // this.testProcess()
    // this.onEnter();
  }
  apiTagCheck(tag: Tag) {
    if (this.multiApi) {
      tag.checked = !tag.checked;
    } else {
      this.objectKeys(this.totalTags).forEach(key => this.totalTags[key].checked = false);
      tag.checked = true;
    }
    this.displayPathObject = this.filterApi();
  }

  filterApi(): PathObject {
    let result: PathObject = {};

    let tags = this.totalTags.filter(tag => tag.checked);

    if (tags.length > 0) {
      this.objectKeys(this.totalApi).filter(api => {
        let prop = this.totalApi[api].get || this.totalApi[api].post;
        let exisit = prop.tags.some(tag => tags.some(t => t.name == tag));
        console.log(tags, prop.tags, exisit);
        return exisit;
      }
      ).forEach(api => result[api] = this.totalApi[api]);
    } else {
      this.objectKeys(this.totalApi).forEach(api => result[api] = this.totalApi[api]);
    }
    return result;
  }

  async onEnter() {
    this.keywords = "";
    let result = <any>await this.http.get(this.url).toPromise().catch(e => this.nzMsg.error("404资源不存在"));
    if (result) {
      this.swaggerJson = result;
      this.parseData();
    }
  }
  async parseData() {
    if (this.swaggerJson) {
      let parser = new SwaggerParser(this.swaggerJson);
      this.tsAdapter = new TypescriptTemplateAdapter(this.swaggerJson, this.opt);
      this.javaAdapter = new JavaTemplateAdapter(this.swaggerJson);
      this.totalEnums = parser.getTotalEnums();
      this.totalClass = parser.getTotalClass();
      this.totalTags = parser.getApiTags();
      console.log(this.totalTags);
      this.totalApi = parser.getTotalApi();
      this.displayPathObject = this.filterApi();
    } else {
      this.nzMsg.error("404资源不存在")
    }
    console.log(this.swaggerJson);
  }
  constructor(public http: HttpClient,
    public nzMsg: NzMessageService,
    public zip: ZipService
  ) { }

}
