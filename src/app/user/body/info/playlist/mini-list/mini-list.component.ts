import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../../../../service/user.service';
import {PlaylistService} from '../../../../../service/playlist.service';
import {SnotifyService} from 'ng-snotify';
import {IMusic} from '../../../../../interface/i-music';

@Component({
  selector: 'app-mini-list',
  templateUrl: './mini-list.component.html',
  styleUrls: ['./mini-list.component.scss']
})
export class MiniListComponent implements OnInit {
  @Output() action = new EventEmitter<{ action: string, data: any }>();
  @Input() song: IMusic;
  playlists: any[];

  constructor(private playListService: PlaylistService, private Notify: SnotifyService) {
  }

  ngOnInit() {
    this.getPlaylists();
  }

  closeMiniPlaylist() {
    this.action.emit({action: 'close', data: null});
  }

  putSongToPlaylist(playlistId, songId) {
    this.playListService.setUpDataSongToPutOrRemoveInPlaylist(playlistId, songId);
    this.playListService.putSongToPlaylist()
      .subscribe((response) => {
        this.handleAddSongToPlaylistResponse(response);
      });
  }

  handleAddSongToPlaylistResponse(response) {
    this.Notify.success(response.message, {timeout: 1000});
  }

  getPlaylists() {
    this.playListService.getPlaylists(UserService.getUserId())
      .subscribe((response) => {
        this.handleGetPlaylistResponse(response);
      });
  }

  private handleGetPlaylistResponse(response) {
    this.playlists = response.data;
  }
}
