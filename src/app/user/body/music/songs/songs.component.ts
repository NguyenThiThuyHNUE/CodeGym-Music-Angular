import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {IMusic} from '../../../../interface/i-music';
import {PlaylistService} from '../../../../service/playlist.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import {SongResponse} from '../../../../interface/song-response';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ChangeNamePLComponent} from './change-name-pl/change-name-pl.component';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SongsComponent implements OnInit {
  songs: IMusic[];
  private playlistName: string;

  constructor(@Inject(MAT_DIALOG_DATA) public playlist: any,
              public dialog: MatDialog,
              private playlistService: PlaylistService) {
  }

  ngOnInit() {
    this.playlistName = this.playlist.playlistName;
    this.getSongsInPlaylist();
  }

  getSongsInPlaylist() {
    this.playlistService.getSongsInPlaylist(this.playlist.playlistId)
      .subscribe((response) => {
        this.handleGetSongsInPlaylistResponse(response);
      });
  }

  private handleGetSongsInPlaylistResponse(response: SongResponse) {
    this.songs = response.data;
  }

  changeName() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.playlist.playlistId;
    this.dialog.open(ChangeNamePLComponent, dialogConfig);
  }
}
