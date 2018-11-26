import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RequestsComponent} from "./requests.component";
import {RequestsRoutingModule} from "./requests-routing.module";
import {RequestListComponent} from "./request-list/request-list.component";
import {RequestService} from "./request.service";
import {RequestEditComponent} from "./request-edit/request-edit.component";


@NgModule({
  declarations: [
    RequestsComponent,
    RequestListComponent,
    RequestEditComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RequestsRoutingModule
  ],
  providers: []
})

export class RequestsModule {}