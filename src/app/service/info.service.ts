import {Injectable} from '@angular/core';
import {ProfileComponent} from '../user/body/info/profile/profile.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NewComponent} from '../user/body/info/playlist/new/new.component';
import {SongsComponent} from '../user/body/music/songs/songs.component';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(public dialog: MatDialog) {
  }

  static createSongConfigDialog(playlistId, playlistName) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.height = '70%';
    dialogConfig.data = {playlistId, playlistName};
    return dialogConfig;
  }

  static createProfileConfigDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    return dialogConfig;
  }

  static createNewConfigDialog() {
    return new MatDialogConfig();
  }

  showFormUpdate() {
    const dialogConfig = InfoService.createProfileConfigDialog();
    this.dialog.open(ProfileComponent, dialogConfig);
  }

  showPlaylistCreateForm() {
    const dialogConfig = InfoService.createNewConfigDialog();
    this.dialog.open(NewComponent, dialogConfig);
  }

  showSongsInPlaylist(playlistId, playlistsInServer) {
    const playlist = this.getPlaylistPassToChildComponent(playlistId, playlistsInServer);
    const playlistName = this.getNamePlaylist(playlist);
    const dialogConfig = InfoService.createSongConfigDialog(playlistId, playlistName);
    this.openSongDiaLog(dialogConfig);
  }

  private getPlaylistPassToChildComponent(playlistId: any, playlistsInServer) {
    return playlistsInServer.find(playlist => playlist.id === playlistId);
  }

  public getNamePlaylist(playlist) {
    return playlist.namePlaylist;
  }

  private openSongDiaLog(dialogConfig) {
    this.dialog.open(SongsComponent, dialogConfig);
  }
}
