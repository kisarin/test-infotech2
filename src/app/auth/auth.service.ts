import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { environment } from "../../environments/environment";
import {Observable} from "rxjs";

(window as any).global = window;

@Injectable()
export class AuthService {
  userProfile: any;
  refreshSubscription: any;
  profileUserSub: string;

  private auth0 = new auth0.WebAuth({
    clientID: environment.auth.clientId,
    domain: environment.auth.clientDomain,
    responseType: 'token id_token',
    redirectUri: environment.auth.callbackURL,
    scope: environment.auth.scope
  });

  constructor(private router: Router) {}

  public login(): void {
    // Auth0 authorize request
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        //window.location.hash = '';
        // Store access token
        //this.accessToken = authResult.accessToken;
        this.setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
        //console.error(`Error authenticating: ${err.error}`);
      }
    });

  }

  public getProfile(cb) {
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
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());

    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);

    this.scheduleRenewal();

    // Redirect to desired route
    //this.router.navigateByUrl(localStorage.getItem('auth_redirect'));
  }


  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('auth_redirect');
    //this.userProfile = undefined;
    this.unscheduleRenewal();

    // Return to homepage
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return Date.now() < expiresAt;
  }

  public renewToken() {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
      } else {
        alert(`Successfully renewed auth!`);
        this.setSession(result);
      }
    });
  }

  public scheduleRenewal() {
    if(!this.isAuthenticated()) return;
    this.unscheduleRenewal();

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

    const source = Observable.of(expiresAt).flatMap(
      expiresAt => {

        const now = Date.now();

        // Use the delay in a timer to
        // run the refresh at the proper time
        return Observable.timer(Math.max(1, expiresAt - now));
      });

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = source.subscribe(() => {
      this.renewToken();
      this.scheduleRenewal();
    });
  }

  public unscheduleRenewal() {
    if(!this.refreshSubscription) return;
    this.refreshSubscription.unsubscribe();
  }

  getUserIdFromProfile() {
    if (this.userProfile) {
      console.log('getUserIdFromProfile userProfile 1');
      return this.userProfile.sub;
    } else {
      this.getProfile((err, profile) => {
        this.userProfile = profile;
        console.log('getUserIdFromProfile userProfile 2');
        console.log(profile);
        return this.userProfile.sub;
      });
    }
  }


}