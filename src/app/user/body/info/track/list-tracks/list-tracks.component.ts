import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {IMusic} from '../../../../../interface/i-music';
import {SongService} from '../../../../../service/song.service';
import {SharedService} from '../../../../../service/shared.service';
import {PlaylistService} from '../../../../../service/playlist.service';
import {UserService} from '../../../../../service/user.service';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-list-tracks',
  templateUrl: './list-tracks.component.html',
  styleUrls: ['./list-tracks.component.scss']
})
export class ListTracksComponent implements OnInit, OnChanges {
  @ViewChild('addPlaylistBtn', {static: false}) addPlaylistBtn: ElementRef;
  playlists: any[];
  hidePlaylist = false;
  list: IMusic[];
  @Input() getSongOf: { who: string; id: number };
  @Input() positionHeight: number;
  @Output() action = new EventEmitter<{ action: string, data: IMusic }>();
  song: IMusic;
  page = 'list';
  songsUserHasLiked: number[];

  // tslint:disable-next-line:max-line-length

  constructor(private songService: SongService,
              private Notify: SnotifyService,
              private playListService: PlaylistService, private shareService: SharedService) {
  }

  ngOnInit() {
    this.getSongs();
    this.getSongsUserHasLiked();
    this.getPlaylists();
  }

  getAction(event) {
    switch (event.action) {
      case 'delete':
        this.deleteSong(event.data);
        break;
      case 'edit':
        this.editSong(event.data);
        break;
      case 'listen':
        this.listenSong(event.data);
        break;
    }
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

  ngOnChanges(changes: SimpleChanges): void {
  }

  addPlaylist(song) {
    this.hidePlaylist = true;
  }

  getSongsUserHasLiked() {
    this.songService.getSongsUserHasLiked().subscribe((response) => {
      this.handleGetSongsUserHasLikedResponse(response);
    });
  }

  handleGetSongsUserHasLikedResponse(response) {
    this.songsUserHasLiked = response.data;
  }

  getSongs() {
    if (this.getSongOf.who === 'singer') {
      return this.getSingerSongs();
    }
    return this.getUserSongs();
  }

  getSingerSongs() {
    this.songService.getSingerSongs(this.getSongOf.id).subscribe((response) => {
      this.list = response.data;
    });
  }

  getUserSongs() {
    this.songService.getUserSongs().subscribe((response) => {
      this.list = response.data.songs;
    });
  }

  listenSong(song: IMusic) {
    this.action.emit({action: 'listen', data: song});
  }

  editSong(song: IMusic) {
    this.action.emit({action: 'edit', data: song});
  }

  deleteSong(song: IMusic) {
    this.action.emit({action: 'delete', data: song});
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

}
