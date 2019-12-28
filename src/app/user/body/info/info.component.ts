import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ProfileComponent} from './profile/profile.component';
import {UserService} from '../../../service/user.service';
import {PlaylistComponent} from './playlist/playlist.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  name: string;
  email: string;
  image: string;
  password: string;
  constructor(public dialog: MatDialog,
              public user: UserService) { }

  ngOnInit() {
    return this.user.getUserCredential(localStorage.getItem('token'))
      .subscribe((data: any) => {
        localStorage.setItem('id', data.id);
        this.name = data.name;
        this.email = data.email;
        this.image = data.image;
        this.password = data.password;
      });
  }

  showFormUpdate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    this.dialog.open(ProfileComponent, dialogConfig);
  }

  showPlaylistCreateForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '30%';
    this.dialog.open(PlaylistComponent, dialogConfig);
  }
}
