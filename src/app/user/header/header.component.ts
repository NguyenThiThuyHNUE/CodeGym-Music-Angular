import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public dialog: MatDialog) {
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
}
