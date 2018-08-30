import { Component, OnInit, Input, AfterViewInit, ViewChild, AfterContentInit, ViewChildren } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ApiRequestComponent } from '../api-request/api-request.component';
import { Api, ApiStatus } from '../../types';

@Component({
  selector: 'app-api-group',
  templateUrl: './api-group.component.html',
  styleUrls: ['./api-group.component.css']
})
export class ApiGroupComponent implements OnInit, AfterViewInit, AfterContentInit {

  @Input() title = "";
  @ViewChildren("apiCom")
  apiRequestComponents: ApiRequestComponent[];
  percent: number = 0;
  @Input() apis: Api[] = [];
  status: ApiStatus = "active";

  constructor(public http: HttpClient) { }

  ngOnInit() {

  }

  start() {
    this.apiRequestComponents.forEach(com => com.start());
  }
  clear() {
    this.status = "active";
    this.percent = 0;
    this.apis.forEach(api => (api.status = "active") && (api.percent = 0));
  }
  ngAfterViewInit() {


  }
  ngAfterContentInit() {

  }
  updateState(api: Api) {
    let exitapi = this.apis.find(pi => pi.id == api.id);
    if (exitapi) exitapi = api;
    this.countStatus();
    console.log(api);

  }
  exportData() {

  }

  countStatus() {
    this.status = this.apis.some(api => api.status == "exception") ? "active" : (this.apis.every(api => api.status == "success") ? "success" : "active");
    this.percent = this.apis.filter(api => api.status == "success").length / this.apis.length * 100;
  }





}
