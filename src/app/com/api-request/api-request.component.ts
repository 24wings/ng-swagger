import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiStatus, Api, Res } from '../../types';


@Component({
  selector: 'app-api-request',
  templateUrl: './api-request.component.html',
  styleUrls: ['./api-request.component.css']
})
export class ApiRequestComponent implements OnInit {
  @Input() api: Api;
  @Input() isOpen: boolean = false;
  @Output() apiChange = new EventEmitter<Api>();
  bodyJSON: string = "";
  queryString: string = "";
  header = {};

  constructor(public http: HttpClient, public router: Router) { }

  ngOnInit() {
    let str = "?"
    Object.keys(this.api.query).filter(key =>
      this.api.query[key]).forEach(key => str += key + "=" + this.api.query[key] + "&&");
    if (str.endsWith("&&")) str = str.substr(0, str.length - 2);
    this.queryString = str;
    this.bodyJSON = JSON.stringify(this.api.body);

  }
  start() {
    this.sendRequest();
  }
  async  sendRequest() {
    console.log(this);
    this.api.percent = 0;
    await this.sleep(200)
    const request = new HttpRequest(
      this.api.method, this.api.url + this.queryString, JSON.parse(this.bodyJSON),
      { reportProgress: true, });
    this.http.request(request).subscribe(event => {
      if (event.type === HttpEventType.DownloadProgress) {
        console.log("Download progress event", event);
        this.api.percent = event.loaded / event.total * 100
      }
      if (event.type === HttpEventType.UploadProgress) {
        console.log("Upload progress event", event);
      }
      if (event.type === HttpEventType.Response) {
        console.log("response received...", event.body);
        this.api.res = event.body as any;
        this.api.status = "success";
        this.apiChange.emit(this.api);
      }
      if (event.type == HttpEventType.ResponseHeader) {
        console.log(`header`, event)
        if (event.status != 200) {
          this.header = event;
          this.api.status = "exception";
          this.apiChange.emit(this.api);
        }
      }
    });

  }
  async sleep(time: number) {
    return new Promise(resolve => setTimeout(() => {
      resolve(time);
    }, time))
  }
}
