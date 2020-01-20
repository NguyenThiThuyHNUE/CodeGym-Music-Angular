import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {PlaylistService} from '../../../../service/playlist.service';
import {SnotifyService} from 'ng-snotify';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Playlist} from '../../../../interface/playlist';
import {UserService} from '../../../../service/user.service';
import {timer} from 'rxjs';

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
    console.log(songId);
  }

  ngOnInit() {
    this.setUserId();
    this.updatePlaylistFromTwoToFiveSeconds();
    this.getPlaylists();
  }

  putSongToPlaylist(playlistId) {
    this.playListService.setUpDataSongToPutOrRemoveInPlaylist(playlistId, this.songId);
    this.playListService.putSongToPlaylist()
      .subscribe((response) => {
        this.handleAddSongToPlaylistResponse(response);
      });
  }

  getPlaylists() {
    this.playListService.getPlaylists(this.userId)
      .subscribe((response) => {
        console.log(this.handleGetPlaylistResponse(response));
        this.handleGetPlaylistResponse(response);
      });

  }

  get namePlaylist() {
    return this.createForm.get('namePlaylist');
  }

  handleAddSongToPlaylistResponse(response) {
    this.Notify.success(`${response.message}`, {timeout: 1000});
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

  private updatePlaylistFromTwoToFiveSeconds() {
    const time$ = timer(2000, 5000);
    time$.subscribe(() => {
      this.getPlaylists();
    });
  }
}
