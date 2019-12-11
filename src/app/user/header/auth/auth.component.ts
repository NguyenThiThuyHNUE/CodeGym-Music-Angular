import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    name: string;

  constructor(public user: UserService) {
  }

  ngOnInit() {
    this.user.getUserCredential(localStorage.getItem('token'))
      .subscribe((data: any) => {
        this.name = data.name;
      });
  }

  logout() {
    this.user.logout();
  }


}
