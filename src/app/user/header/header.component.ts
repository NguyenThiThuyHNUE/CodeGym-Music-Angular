import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {LoginComponent} from './login/login.component';
import {UserService} from '../../service/user.service';
import {SingerService} from '../../service/singer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog,
              private singerService: SingerService,
              public user: UserService) {
  }

  ngOnInit() {
  }

  showDialogCreateSinger() {
    this.singerService.showCreateSingerFormDialog();
  }

  showFormLogin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    this.dialog.open(LoginComponent, dialogConfig);
  }

  logout() {
    UserService.logout();
  }
}
