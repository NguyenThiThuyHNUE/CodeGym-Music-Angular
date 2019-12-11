import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog,
              public user: UserService) {
  }

  ngOnInit() {
  }
  showForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    this.dialog.open(RegisterComponent, dialogConfig);
  }

  showFormLogin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    this.dialog.open(LoginComponent, dialogConfig);
  }

  logout() {
    this.user.logout();
  }
}
