import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  name: string;

  constructor(public user: UserService,
              public Notify: SnotifyService
  ) {
  }

  ngOnInit() {
    this.user.getUserCredential(localStorage.getItem('token'))
      .subscribe((data: any) => {
        localStorage.setItem('id', data.id);
        this.Notify.success(`Login Success, Welcome ${data.name}`, 'Congratulations', {timeout: 7000});
        this.name = data.name;
      });
  }

  logout() {
    this.user.getUserCredential(localStorage.getItem('token'))
      .subscribe((data: any) => {
        this.Notify.success(`Logout Success, Goodbye ${data.name}`, 'Congratulations', {timeout: 7000});
      });
    this.user.logout();
  }


}
