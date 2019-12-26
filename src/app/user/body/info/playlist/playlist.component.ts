import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {PlaylistService} from '../../../../service/playlist.service';
import {IMessage} from '../../../../interface/i-message';
import {SnotifyService} from 'ng-snotify';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NewComponent} from './new/new.component';
import {Playlist} from '../../../../interface/playlist';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PlaylistComponent implements OnInit {
  createForm = this.fb.group({
    user_id: localStorage.getItem('id'),
    namePlaylist: ['', Validators.required],
  });

  userId: number = +localStorage.getItem('id');
  playlists: Playlist[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public songId: any,
    private fb: FormBuilder,
    private Notify: SnotifyService,
    public dialog: MatDialog,
    private dialogRefPlaylist: MatDialogRef<PlaylistComponent>,
    private playListService: PlaylistService
  ) {
  }

  ngOnInit() {
    this.getPlaylists();
  }

  selectPlaylist(id: number) {
    const order = {
      playlistId: id,
      songId: this.songId
    };
    this.playListService.putSongToPlaylist(order)
      .subscribe((response) => {
        this.handleAddSongToPlaylistResponse(response);
      });
  }

  getPlaylists() {
    return this.playListService.getPlaylists(this.userId)
      .subscribe((response) => {
        this.handleGetPlaylist(response);
      });
  }

  createPlaylist() {
    return this.playListService.createPlaylist(this.createForm.value)
      .subscribe((response) => {
        this.handleResponse(response);
      });
  }

  get namePlaylist() {
    return this.createForm.get('namePlaylist');
  }

  handleAddSongToPlaylistResponse(response) {
    this.Notify.success(response.message, 'Add Song To Playlist', {timeout: 3000});

  }

  private handleResponse(response: IMessage) {
    this.Notify.success(`${response.message}`, 'Congratulations', {timeout: 5000});
    this.resetForm();
  }

  private resetForm() {
    return this.dialogRefPlaylist.close();
  }

  newPlaylist() {
    this.dialogRefPlaylist.close();
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(NewComponent, dialogConfig);
  }

  private handleGetPlaylist(response) {
    return this.playlists = response.data;
  }


}
