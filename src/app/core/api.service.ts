
import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {AuthService} from "../auth/auth.service";
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {RequestService} from "../request/request.service";

@Injectable()
export class ApiService {

  constructor(
    private http: Http,
    private auth: AuthService, private reqService: RequestService) { }

  storeRequests() {
    //store requests from RequestService
    const httpDatabase = environment.firebase.databaseURL + '/requests.json';
    console.log('httpDatabase ' + httpDatabase);
    return this.http.put(httpDatabase, this.reqService.getRequests());
  }

  getRequests() {
    return this.http.get('https://udemi-ng-http.firebaseio.com/requests.json')
      .map(
        (response: Response) => {
          const data = response.json();
          for (const request of data) {
            request.description = 'FETCHED_' + request.description;
          }
          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw("Something went wrong");
        }
      );
  }

  getAppName() {
    return this.http.get('https://udemi-ng-http.firebaseio.com/appName.json')
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }




}