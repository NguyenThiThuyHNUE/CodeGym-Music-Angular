import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {IMusic} from '../../../../interface/i-music';
import {PlaylistService} from '../../../../service/playlist.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SongResponse} from '../../../../interface/song-response';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ChangeNamePLComponent} from './change-name-pl/change-name-pl.component';
import {timer} from 'rxjs';
import {SnotifyService} from 'ng-snotify';
import {SharedService} from '../../../../service/shared.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SongsComponent implements OnInit {
  songs: IMusic[];
  private playlistName: string;
  isPlayPlaylist: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public playlist: any,
              public dialog: MatDialog,
              private Notify: SnotifyService,
              public  dialogRef: MatDialogRef<SongsComponent>,
              public shareService: SharedService,
              private playlistService: PlaylistService) {
  }

  ngOnInit() {
    this.playlistName = this.playlist.playlistName;
    this.getSongsInPlaylist();
    this.isChangeNamePlaylist();
  }

  playPlaylist() {
    if (this.isPlayPlaylist) {
      this.Notify.info('Playlist is Playing', {timeout: 1500});
    } else {
      this.listenPlaylist();
    }
  }

  listenPlaylist() {
    if (this.songs.length === 0) {
      return this.Notify.error('You haven\'t any song in playlist', {timeout: 1500});
    }
    this.shareService.currentSongChange(this.songs[0]);
    this.shareService.listTheSameSongsChange(this.removeCurrentSongInArray(this.songs[0]));
    this.isPlayPlaylist = true;
    this.getSongsInPlaylist();
  }

  isChangeNamePlaylist() {
    this.shareService.playlistNameEmitted.subscribe((data) => {
      this.playlistName = data.data.namePlaylist;
    });
  }

  listenSong(song) {
    this.shareService.currentSongChange(song);
    this.shareService.listTheSameSongsChange(this.removeCurrentSongInArray(song));
    this.closeDialog();
  }

  removeCurrentSongInArray(song) {
    const listSongs = this.songs;
    listSongs.splice(listSongs.indexOf(song), 1);
    return listSongs;
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

  getNewName() {
    if (localStorage.getItem('newNamePlaylist')) {
      this.playlistName = localStorage.getItem('newNamePlaylist');
    }
    localStorage.removeItem('newNamePlaylist');
  }

  closeDialog() {
    this.dialogRef.close();
  }

  removeFromPlaylist(songId) {
    this.playlistService.setUpDataSongToPutOrRemoveInPlaylist(this.playlist.playlistId, songId);
    this.playlistService.removeSongFromPlaylist()
      .subscribe((response) => {
        this.handleAddSongToPlaylistResponse(response, songId);
      });
  }

  handleAddSongToPlaylistResponse(response, songId) {
    this.Notify.success('remove Song', {timeout: 1000});
    const index = this.songs.findIndex((song) => songId === song.id);
    this.songs.splice(index, 1);
  }
}
