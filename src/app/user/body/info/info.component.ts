import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ProfileComponent} from './profile/profile.component';
import {PlaylistComponent} from './playlist/playlist.component';
import {NewComponent} from './playlist/new/new.component';
import {IMusic} from '../../../interface/i-music';
import {MusicService} from '../../../service/music.service';
import {PlaylistService} from '../../../service/playlist.service';
import {Playlist} from '../../../interface/playlist';
import {SongsComponent} from '../music/songs/songs.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  playlists: Playlist[];
  userId = localStorage.getItem('id');

  constructor(public dialog: MatDialog, private playlistService: PlaylistService) {
  }

  ngOnInit() {
    this.getPlaylists();
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
