import { Api } from "../types";
import { Injectable } from "@angular/core";
@Injectable()
export class ApiService {
    get swaggerDemoPostFail(): Api {
        return {
            id: 0,
            title: "swagger错误Post测试",
            url: "/assets/demo-swagger.json",
            method: "Post",
            query: { name: 123 },
            body: {},
            status: "active",
            percent: 0
        }
    }
    get swaggerDemoFail(): Api {
        return {
            id: 1,
            title: "swagger 标准Get测试",
            url: "/assets/demo-swagger.json",
            method: "Get",
            query: { name: 123 },
            body: {},
            status: "active",
            percent: 0
        }
    }
}