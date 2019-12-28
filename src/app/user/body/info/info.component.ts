import {Component, NgZone, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {ProfileComponent} from './profile/profile.component';
import {NewComponent} from './playlist/new/new.component';
import {PlaylistService} from '../../../service/playlist.service';
import {Playlist} from '../../../interface/playlist';
import {SongsComponent} from '../music/songs/songs.component';
import {PlaylistComponent} from './playlist/playlist.component';
import {UserService} from '../../../service/user.service';
import {User} from '../../../interface/user';
import {Observable, timer} from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  playlists: Playlist[];
  userId = localStorage.getItem('id');
  user: User;
  playlist: any;
  name: string;
  email: string;
  image: string;
  password: string;
  constructor(public dialog: MatDialog,
              private zone: NgZone,
              public userService: UserService,
              public dialogRef: MatDialogRef<SongsComponent>,
              private playlistService: PlaylistService
  ) {
    if (!this.user) {
      this.user = {};
    }
  }

  ngOnInit() {
    this.getPlaylists();
    const timer$ = timer(2000, 5000);
    timer$.subscribe(() => this.getPlaylists());
    return this.userService.getUserCredential(localStorage.getItem('token'))
      .subscribe((data: any) => {
        localStorage.setItem('id', data.id);
        this.user = data;
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
      this.zone.run(() => {
        this.handleGetPlaylistsResponse(response);
      });
    });
  }

  private handleGetPlaylistsResponse(response) {
    return this.playlists = response.data;
  }

  showSongsInPlaylist(playlistId) {
    // tslint:disable-next-line:no-shadowed-variable
    const playlist = this.playlists.find(playlist => playlist.id === playlistId);
    const playlistName = playlist.namePlaylist;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.height = '70%';
    dialogConfig.data = {playlistId, playlistName};
    this.dialog.open(SongsComponent, dialogConfig);

}
