import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ProfileComponent} from './profile/profile.component';
import {NewComponent} from './playlist/new/new.component';
import {PlaylistService} from '../../../service/playlist.service';
import {Playlist} from '../../../interface/playlist';
import {SongsComponent} from '../music/songs/songs.component';
import {UserService} from '../../../service/user.service';
import {User} from '../../../interface/user';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  playlists: Playlist[];
  userId = localStorage.getItem('id');
  user: User;

  constructor(public dialog: MatDialog,
              public userService: UserService,
              private playlistService: PlaylistService
  ) {
  }

  ngOnInit() {

    this.getPlaylists();
    return this.userService.getUserCredential(localStorage.getItem('token'))
      .subscribe((data: any) => {
        localStorage.setItem('id', data.id);
        this.user.name = data.name;
        this.user.email = data.email;
        this.user.image = data.image;
        this.user.password = data.password;
      });
  }

  showFormUpdate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    this.dialog.open(ProfileComponent, dialogConfig);
  }

  showPlaylistCreateForm() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(NewComponent, dialogConfig);
  }

  getPlaylists() {
    this.playlistService.getPlaylists(this.userId).subscribe((response) => {
      this.handleGetMusicsResponse(response);
    });
  }

  private handleGetMusicsResponse(response) {
    return this.playlists = response.data;
  }

  showSongsInPlaylist(playlistId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    this.dialog.open(SongsComponent, dialogConfig);
  }
}
