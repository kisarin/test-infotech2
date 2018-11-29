import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import {HttpModule} from "@angular/http";
import {HomeComponent} from "../home/home.component";
import {PageNotFoundComponent} from "../not-found.component";


//import { ApiService } from './api.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule, // AuthModule is a sibling and can use this without us exporting it
    FormsModule
  ],
  declarations: [
    HomeComponent,
    PageNotFoundComponent
  ],
  exports: [
    FormsModule // Export FormsModule so CommentsModule can use it

  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        Title,
        DatePipe
        //ApiService
      ]
    };
  }
}