import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import {User} from "../model/user";
import {UserService} from "../users/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  profile: any;
  user: User;
  auth0UserId: string;

  constructor(public auth: AuthService, private userService: UserService) { }

  ngOnInit() {
    console.log('1 profile component loaded');
    let sub = '';

    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      console.log('2 get profile from auth ' + this.profile.sub);
      console.log(this.profile);
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        console.log('3 getProfile '  + this.profile.sub);
        console.log(this.profile);
        this.auth0UserId = this.profile.sub;
        console.log('4 sub ' + this.auth0UserId);
        this.user = this.userService.getUserByToken(this.auth0UserId);
      });
    }
  }

}
