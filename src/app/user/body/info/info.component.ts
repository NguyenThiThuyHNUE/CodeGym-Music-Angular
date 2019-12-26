import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ProfileComponent} from './profile/profile.component';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  constructor(public dialog: MatDialog,
              public user: UserService) { }

  ngOnInit() {
    return this.user.getUserCredential(localStorage.getItem('token'))
      .subscribe((data: any) => {
        localStorage.setItem('id', data.id);
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
      });
  }

  showFormUpdate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    this.dialog.open(ProfileComponent, dialogConfig);
  }
}
