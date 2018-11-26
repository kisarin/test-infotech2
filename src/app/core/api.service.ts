
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AuthService} from "../auth/auth.service";
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  constructor(
    private http: Http,
    private auth: AuthService) { }




}