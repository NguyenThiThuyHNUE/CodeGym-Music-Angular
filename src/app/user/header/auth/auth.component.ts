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
    return this.user.getUserCredential()
      .subscribe((response: any) => {
        this.handleResponse(response);
      }, (error) => this.handleResponseError());
  }

  logout() {
    this.user.getUserCredential()
      .subscribe((data: any) => {
        this.Notify.success(`Logout Success, Goodbye ${data.name}`, 'Congratulations', {timeout: 3000});
      });
    this.user.logout();
  }

  handleResponse(response) {
    this.Notify.success(`Login Success, Welcome ${response.name}`, 'Congratulations', {timeout: 3000});
    this.saveDataToLocalStorage(response);
    this.name = response.name;
  }

  handleResponseError() {
    localStorage.removeItem('token');
  }

  saveDataToLocalStorage(response: any) {
    localStorage.setItem('id', response.id);
    localStorage.setItem('name', response.name);
    localStorage.setItem('email', response.email);
    localStorage.setItem('image', response.image);
  }
}
