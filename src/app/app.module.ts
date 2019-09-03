import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpService } from './core/services/http.service';
import { AuthService } from './core/services/auth.service';
// import { AuthComponent } from './auth/auth.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

// import * as types from 'types/node';

declare var require: any;
export function GetHttps() {
  const https = require('https');
  console.log(https);
  return https;
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    HttpModule,
    HttpService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
