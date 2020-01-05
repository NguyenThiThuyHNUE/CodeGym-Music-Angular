import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ProfileComponent} from '../user/body/info/profile/profile.component';
import {EtcComponent} from '../user/body/main/etc/etc.component';
import {PlaylistComponent} from '../user/body/info/playlist/playlist.component';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(public dialog: MatDialog) {
  }

  static createConfigDialog(config) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = config;
    return dialogConfig;
  }

  showEtc(songId) {
    const dialogConfig = MainService.createConfigDialog(songId);
    this.dialog.open(EtcComponent, dialogConfig);
  }

  showPlaylists(config) {
    const dialogConfig = MainService.createConfigDialog(config);
    this.dialog.open(PlaylistComponent, dialogConfig);
  }
}
