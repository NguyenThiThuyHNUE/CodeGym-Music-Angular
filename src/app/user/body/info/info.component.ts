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
  userId: number;
  user: User;
  playlist: Playlist;

  constructor(public dialog: MatDialog,
              private zone: NgZone,
              public userService: UserService,
              private playlistService: PlaylistService
  ) {
    if (!this.user) {
      this.user = {};
    }
  }

  ngOnInit() {
    this.getUserId();
    this.getPlaylists();
    this.updatePlaylistAfterFiveSecond();
    this.getUserCredentialForUpdate();
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

  handleGetPlaylistsResponse(response) {
    return this.playlists = response.data;
  }

  showSongsInPlaylist(playlistId) {
    const playlist = this.getPlaylistPassToChildrenComponent(playlistId);
    const playlistName = this.getNamePlaylist(playlist);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.height = '70%';
    dialogConfig.data = {playlistId, playlistName};
    this.openSongDiaLog(dialogConfig);
  }

  private updatePlaylistAfterFiveSecond() {
    const timer$ = timer(2000, 5000);
    timer$.subscribe(() => this.getPlaylists());
  }

  private getUserCredentialForUpdate() {
    this.userService.getUserCredential()
      .subscribe((data: any) => {
        localStorage.setItem('id', data.id);
        this.user = data;
      });
  }

  private getPlaylistPassToChildrenComponent(playlistId: any) {
    return this.playlists.find(playlist => playlist.id === playlistId);
  }

  public getNamePlaylist(playlist) {
    return playlist.namePlaylist;
  }

  private openSongDiaLog(dialogConfig) {
    this.dialog.open(SongsComponent, dialogConfig);
  }

  private getUserId() {
    this.userId = +localStorage.getItem('id');
  }
}
