import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ProfileComponent} from '../user/body/info/profile/profile.component';
import {EtcComponent} from '../user/body/main/etc/etc.component';
import {PlaylistComponent} from '../user/body/info/playlist/playlist.component';
import {CommentComponent} from '../user/body/music/detail/comment/comment.component';
import {SongData} from '../interface/song-data';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  musicId: number;
  data: SongData;
  constructor(public dialog: MatDialog) {
  }

  static createConfigDialog(config) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = config;
    return dialogConfig;
  }

  getMusicId(songId) {
    // console.log(dialogConfig.data.id);
    // this.musicId = dialogConfig.data.id;
    // console.log(this.musicId);
    // return this.musicId;
    // console.log(this.data.songId);
    // return this.data.songId;
  }

  showEtc(song) {
    const dialogConfig = MainService.createConfigDialog(song);
    this.dialog.open(EtcComponent, dialogConfig);
  }

  showPlaylists(config) {
    const dialogConfig = MainService.createConfigDialog(config);
    this.dialog.open(PlaylistComponent, dialogConfig);
  }

  showComments(config) {
    const dialogConfig = MainService.createConfigDialog(config);
    this.dialog.open(CommentComponent, dialogConfig);
  }

}
