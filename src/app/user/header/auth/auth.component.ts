import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {SnotifyService} from 'ng-snotify';
import {AuthService} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';
import {ProfileService} from '../../../service/profile.service';
import {SharedService} from '../../../service/shared.service';

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
              private sharedService: SharedService,
              private profileService: ProfileService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.getUserCredential();
    this.isNewUserNameUpdate();
  }

  isNewUserNameUpdate() {
    this.sharedService.newUserNameEmitted.subscribe((data) => {
      this.name = data.data.name;
    });
  }

  showProfile() {
    this.profileService.showProfile('info');
  }

  showTracks() {
    this.profileService.showProfile('tracks');
  }

  logout() {
    this.Notify.success(`Logout Success, Goodbye ${this.name}`, 'Congratulations', {timeout: 1000});
    UserService.logout();
  }

  handleResponse(response) {
    this.Notify.success(`Login Success, Welcome ${response.name}`, 'Congratulations', {timeout: 1000});
    this.saveDataToLocalStorage(response);
    this.setUserName();
  }

  handleResponseError() {
    this.Notify.error('You have been Logout', {timeout: 3000});
    UserService.logout();
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
    this.checkTokenOutDate();
    return this.setUserName();
  }

  checkTokenOutDate() {
    this.user.getUserCredential().subscribe((response: any) => {
      this.handleResponse(response);
    }, (error) => this.handleResponseError());
  }

  private checkTokenOrUserIdExist() {
    return !this.user.isLoggedIn() || !UserService.getUserId();
  }

  private setUserName() {
    this.name = UserService.getUserName();
  }
}
