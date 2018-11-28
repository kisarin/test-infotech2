import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Headers, Response} from "@angular/http";
import * as auth0 from 'auth0-js';
import {environment} from "../../environments/environment";
import {Subscription} from "rxjs";

(window as any).global = window;

@Injectable()
export class AuthService {

  private auth0 = new auth0.WebAuth({
    clientID: environment.auth.clientId,
    domain: environment.auth.clientDomain,
    responseType: 'token id_token',
    redirectUri: environment.auth.callbackURL,
    scope: environment.auth.scope
  });

  accessToken: string;
  userProfile: any;
  // Track authentication status
  loggedIn: boolean;
  loading: boolean;
  // Track Firebase authentication status
  //loggedInFirebase: boolean;
  // Subscribe to the Firebase token stream
  //firebaseSub: Subscription;
  // Subscribe to Firebase renewal timer stream
  //refreshFirebaseSub: Subscription;
  currentStatus = '';

  constructor(public router: Router, //private afAuth: AngularFireAuth,
              private http: Http) {}

  public login(redirect?: string): void {
    // Set redirect after login
    const _redirect = redirect ? redirect : this.router.url;
    localStorage.setItem('auth_redirect', _redirect);
    // Auth0 authorize request
    this.auth0.authorize();
    this.currentStatus = 'login';
  }

  public handleAuthentication(): void {
    this.currentStatus = 'handleAuthentication start';

    this.loading = true;
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((err, authResult) => {

      //check authResult in log
      if (authResult) {
        // console.log(err);
        // console.log(authResult);
        // console.log('authResult.accessToken is ' + authResult.accessToken);
        // console.log('authResult.idToken is ' + authResult.idToken);
      }

      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        // Store access token
        this.accessToken = authResult.accessToken;
        this.currentStatus = 'setSession';
        this.setSession(authResult);

      } else if (err) {
        this.router.navigate(['/']);
        this.loading = false;
        console.error(`Error authenticating: ${err.error}`);
      }
    });

  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  private setSession(authResult) {
    //console.log("setSession");
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    //this.userProfile = profile;
    // Session set; set loggedIn and loading
    this.loggedIn = true;
    this.loading = false;
    // Get Firebase token
    //this.getFirebaseToken();
    // Redirect to desired route
    this.router.navigateByUrl(localStorage.getItem('auth_redirect'));


  }


  public logout(): void {
    // Ensure all auth items removed
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('auth_redirect');
    this.accessToken = undefined;
    this.userProfile = undefined;
    this.loggedIn = false;
    // Sign out of Firebase
    //this.loggedInFirebase = false;
    //this.afAuth.auth.signOut();
    // Return to homepage
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  getUserIdFromProfile() {
    var sub = JSON.stringify(this.userProfile.sub);
    return sub;
  }


}