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

  showEtc(song) {
    const dialogConfig = MainService.createConfigDialog(song);
    dialogConfig.height = '70%';
    dialogConfig.width = '70%';
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
