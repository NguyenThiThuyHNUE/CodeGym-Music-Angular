import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {SnotifyService} from 'ng-snotify';
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
    this.getUserCredential();
  }

  logout() {
    // this.user.getUserCredential()
    //   .subscribe((data: any) => {
    //     this.Notify.success(`Logout Success, Goodbye ${data.name}`, 'Congratulations', {timeout: 3000});
    //   });
    this.Notify.success(`Logout Success, Goodbye ${this.name}`, 'Congratulations', {timeout: 3000});
    this.user.logout();
  }

  handleResponse(response) {
    this.Notify.success(`Login Success, Welcome ${response.name}`, 'Congratulations', {timeout: 3000});
    this.saveDataToLocalStorage(response);
    this.setUserName();
  }

  handleResponseError() {
    this.user.logout();
  }

  saveDataToLocalStorage(response: any) {
    this.user.saveDataToLocalStorage(response);
  }

  private getUserCredential() {
    if (this.checkTokenOrUserIdExist()) {
      return this.user.getUserCredential()
        .subscribe((response: any) => {
          this.handleResponse(response);
        }, (error) => this.handleResponseError());
    }
    return this.setUserName();
  }

  private checkTokenOrUserIdExist() {
    return !this.user.isLoggedIn() || !UserService.getUserId();
  }

  private setUserName() {
    this.name = UserService.getUserName();
  }
}
