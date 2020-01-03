import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Url} from '../../../url-project';
import {SongResponse} from '../interface/song-response';
import {SongData} from '../interface/song-data';
import {UserService} from './user.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material';
import {NewComponent} from '../user/body/info/playlist/new/new.component';
import {PlaylistComponent} from '../user/body/info/playlist/playlist.component';
import {Response} from '../interface/response';
import {SnotifyService} from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  data: SongData;

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private Notify: SnotifyService,
              private dialogRefPlaylist: MatDialogRef<PlaylistComponent>
  ) {
    if (!this.data) {
      this.data = {};
    }
  }

  getPlaylists(userId) {
    return this.http.get(Url + `/api/playlists/${userId}`);
  }

  createPlaylist(info) {
    return this.http.post<Response>(Url + '/api/playlist/create', info);
  }

  updatePlaylist(playlistId, data) {
    return this.http.post(Url + `/api/playlist/update/${playlistId}`, data);
  }

  putSongToPlaylist() {
    return this.http.post(Url + '/api/playlist/song', this.data);
  }

  getSongsInPlaylist(playlistId) {
    return this.http.get<SongResponse>(Url + `/api/playlist/songs/${playlistId}`);
  }

  setUpDataSongToPutToPlaylist(playlistId, songId) {
    this.data.playlistId = playlistId;
    this.data.userId = UserService.getUserId();
    this.data.songId = songId;
  }

  showFormCreatePlaylist() {
    this.dialogRefPlaylist.close();
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(NewComponent, dialogConfig);
  }

  closePlaylist() {
    this.dialogRefPlaylist.close();
  }

  showPlaylist() {
    this.dialog.open(PlaylistComponent);
  }

  notifySuccess(message) {
    this.Notify.success(`${message}`, 'Congratulations', {timeout: 1000});
  }
}
