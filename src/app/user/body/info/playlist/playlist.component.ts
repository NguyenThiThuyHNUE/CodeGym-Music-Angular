import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {PlaylistService} from '../../../../service/playlist.service';
import {IMessage} from '../../../../interface/i-message';
import {SnotifyService} from 'ng-snotify';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Playlist} from '../../../../interface/playlist';
import {UserService} from '../../../../service/user.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PlaylistComponent implements OnInit {
  createForm = this.fb.group({
    user_id: UserService.getUserId(),
    namePlaylist: ['', Validators.required],
  });

  userId: number;
  playlists: Playlist[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public songId: any,
    private fb: FormBuilder,
    private Notify: SnotifyService,
    private playListService: PlaylistService) {
  }

  ngOnInit() {
    this.setUserId();
    this.getPlaylists();
  }

  putSongToPlaylist(playlistId: number) {
    this.playListService.setUpDataSongToPutToPlaylist(playlistId, this.songId);
    this.playListService.putSongToPlaylist()
      .subscribe((response) => {
        this.handleAddSongToPlaylistResponse(response);
      });
  }

  getPlaylists() {
    this.playListService.getPlaylists(this.userId)
      .subscribe((response) => {
        this.handleGetPlaylistResponse(response);
      });

  }

  createPlaylist() {
    this.playListService.createPlaylist(this.createForm.value)
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
    this.playListService.resetForm();
  }

  newPlaylist() {
   this.playListService.showFormCreatePlaylist();
  }

  private handleGetPlaylistResponse(response) {
    return this.playlists = response.data;
  }

  private setUserId() {
    this.userId = UserService.getUserId();
  }
}
