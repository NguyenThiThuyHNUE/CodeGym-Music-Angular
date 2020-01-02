import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUserResponse} from '../interface/i-user-response';
import {Url} from '../../../url-project';
import {IMessage} from '../interface/i-message';
import {SongResponse} from '../interface/song-response';
import {SongData} from '../interface/song-data';
import {UserService} from './user.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NewComponent} from '../user/body/info/playlist/new/new.component';
import {MatDialogRef} from '@angular/material';
import {PlaylistComponent} from '../user/body/info/playlist/playlist.component';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private data: SongData;

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private dialogRefPlaylist: MatDialogRef<PlaylistComponent>
  ) {
  }

  getPlaylists(userId) {
    return this.http.get(Url + `/api/playlists/${userId}`);
  }

  createPlaylist(info) {
    return this.http.post<IMessage>(Url + '/api/playlist/create', info);
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
    this.data.userId = UserService.getUserId();
    this.data.playlistId = playlistId;
    this.data.songId = songId;
  }

  showFormCreatePlaylist() {
    this.dialogRefPlaylist.close();
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(NewComponent, dialogConfig);
  }
  resetForm() {
    return this.dialogRefPlaylist.close();
  }
}
