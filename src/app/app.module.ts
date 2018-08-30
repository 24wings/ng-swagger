import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { CapitalizePipe } from './pipe/capitalize';
import { captilize } from './types/util';
import { KeywordPipe } from './pipe/keyword';
import { ZipService } from './service/zip-service';
import { ApiRequestComponent } from './com/api-request/api-request.component';
import { ApiGroupComponent } from './com/api-group/api-group.component';
import { StorageService } from './pipe/storage.service';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ApiService } from './service/api.service';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    CapitalizePipe,
    KeywordPipe,
    ApiRequestComponent,
    ApiGroupComponent,
    TestPageComponent,
    HomePageComponent
  ],
  imports: [
    RouterModule.forRoot([
      { path: "", component: HomePageComponent },
      { path: "test", component: TestPageComponent }
    ]),
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule
  ],

  providers: [{ provide: NZ_I18N, useValue: zh_CN },
    CapitalizePipe,
    ZipService,
    StorageService,
    ApiService],

  bootstrap: [AppComponent],

})
export class AppModule { }
