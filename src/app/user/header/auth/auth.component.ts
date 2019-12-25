import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {SnotifyService} from "ng-snotify";
import {AuthService} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  name: string;
  private users: SocialUser;
  private loggedIn: boolean;

  constructor(public user: UserService,
              public Notify: SnotifyService,
              private authService: AuthService) {
  }

  ngOnInit() {
    return this.user.getUserCredential(localStorage.getItem('token'))
      .subscribe((data: any) => {
        this.Notify.success(`Login Success, Welcome ${data.name}`, 'Congratulations', {timeout: 3000});
        this.name = data.name;
      });
  }

  logout() {
    this.user.getUserCredential(localStorage.getItem('token'))
      .subscribe((data: any) => {
        this.Notify.success(`Logout Success, Goodbye ${data.name}`, 'Congratulations', {timeout: 3000});
      });
    this.user.logout();
  }


}
