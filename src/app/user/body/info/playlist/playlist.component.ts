import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {PlaylistService} from '../../../../service/playlist.service';
import {SnotifyService} from 'ng-snotify';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Playlist} from '../../../../interface/playlist';
import {UserService} from '../../../../service/user.service';
import {InfoService} from '../../../../service/info.service';
import {timer} from 'rxjs';
import {SharedService} from '../../../../service/shared.service';
import {SongResponse} from '../../../../interface/song-response';
import {IMusic} from '../../../../interface/i-music';

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
  imgDisplayInInterfaceSrc = '../../../../../assets/img/bg-img/bg-7.jpg';
  userId: number;
  playlists: Playlist[];
  isPlayPlaylist: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public songId: any,
    private fb: FormBuilder,
    private Notify: SnotifyService,
    private shareService: SharedService,
    private infoService: InfoService,
    private playListService: PlaylistService) {
  }

  ngOnInit() {
    this.setUserId();
    this.getPlaylists();
  }

  playPlaylist(playlistId) {
    if (this.isPlayPlaylist) {
      this.Notify.info('Playlist is Playing', {timeout: 1500});
    } else {
      this.getSongsInPlaylist(playlistId);
    }
  }

  private handleGetSongsInPlaylistResponse(response: SongResponse) {
    if (response.data) {
      return this.Notify.error('You haven\'t any song in playlist', {timeout: 1500});
    }
    const songsInPlaylist = response.data;
    this.shareService.currentSongChange(songsInPlaylist[0]);
    this.shareService.listTheSameSongsChange(this.removeCurrentSongInArray(songsInPlaylist[0], songsInPlaylist));
    this.isPlayPlaylist = true;
  }

  removeCurrentSongInArray(song, listSong) {
    const listSongs = listSong;
    listSongs.splice(listSongs.indexOf(song), 1);
    return listSongs;
  }

  getSongsInPlaylist(playlistId) {
    this.playListService.getSongsInPlaylist(playlistId)
      .subscribe((response) => {
        this.handleGetSongsInPlaylistResponse(response);
      });
  }

  showSongsInPlaylist(playlistId) {
    this.infoService.showSongsInPlaylist(playlistId, this.playlists);
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
    this.shareService.playlistNameEmitted.subscribe((name) => {
     this.getPlaylists();
    });
  }

  private handleGetPlaylistResponse(response) {
    this.playlists = response.data;
    console.log(this.playlists);
  }

  private setUserId() {
    this.userId = UserService.getUserId();
  }
}
