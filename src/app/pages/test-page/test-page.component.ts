import { Component, OnInit } from '@angular/core';
import { Api } from '../../types';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {
  commonTestApis: Api[] = [this.apiService.swaggerDemoFail, this.apiService.swaggerDemoPostFail]
  constructor(public apiService: ApiService) { }

  ngOnInit() {
  }

}
