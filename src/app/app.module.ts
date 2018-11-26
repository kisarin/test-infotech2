import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app.routing.module";
import { CoreModule } from "./core/core.module";
import { AuthService } from "./auth/auth.service";
import {RequestService} from "./request/request.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [ AuthService, RequestService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
