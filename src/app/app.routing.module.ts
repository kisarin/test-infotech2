import {NgModule} from "@angular/core";
import {RouterModule, PreloadAllModules, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./not-found.component";
import {HomeComponent} from "./home/home.component";
import { CallbackComponent } from './callback/callback.component';
import {ProfileComponent} from "./profile/profile.component";


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes,
      {preloadingStrategy: PreloadAllModules} )

  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}