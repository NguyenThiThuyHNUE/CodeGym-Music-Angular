import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {IMusic} from '../interface/i-music';

@Injectable()
export class SharedService {
  // Observable string sources
  playlistName = new Subject<any>();
  songDelete = new Subject<any>();
  songsUserHasLiked = new Subject<any>();
  listTheSameSongs = new Subject<any>();
  currentSong = new Subject<any>();

  // Observable string streams
  playlistNameEmitted = this.playlistName.asObservable();
  songDeleteEmitted = this.songDelete.asObservable();
  songsUserHasLikedEmitted = this.songsUserHasLiked.asObservable();
  listTheSameSongsEmitted = this.listTheSameSongs.asObservable();
  currentSongEmitted = this.currentSong.asObservable();

  // Service message commands
  listTheSameSongsChange(change) {
    this.listTheSameSongs.next(change);
  }

  songsUserHasLikedChange(change) {
    this.songsUserHasLiked.next(change);
  }

  currentSongChange(change: any) {
    this.currentSong.next(change);
  }

  songDeleteChange(change) {
    this.songDelete.next(change);
  }

  newPlaylist(change) {
    this.playlistName.next(change);
  }

  resetEmitted() {
    this.playlistName = new Subject<any>();
    this.playlistNameEmitted = this.playlistName.asObservable();
  }
}
