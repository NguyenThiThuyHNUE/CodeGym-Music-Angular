import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {IMusic} from '../interface/i-music';

@Injectable()
export class SharedService {
  // Observable string sources
  playlistName = new Subject<any>();
  newUserName = new Subject<any>();
  songDelete = new Subject<any>();
  songUpdate = new Subject<any>();
  songsUserHasLiked = new Subject<any>();
  listTheSameSongs = new Subject<any>();
  currentSong = new Subject<any>();
  isLogin = new Subject<any>();

  // Observable string streams
  playlistNameEmitted = this.playlistName.asObservable();
  songDeleteEmitted = this.songDelete.asObservable();
  songUpdateEmitted = this.songUpdate.asObservable();
  newUserNameEmitted = this.newUserName.asObservable();
  songsUserHasLikedEmitted = this.songsUserHasLiked.asObservable();
  listTheSameSongsEmitted = this.listTheSameSongs.asObservable();
  currentSongEmitted = this.currentSong.asObservable();
  isLoginEmitted = this.isLogin.asObservable();

  // Service message commands
  listTheSameSongsChange(change) {
    this.listTheSameSongs.next(change);
  }

  newUserNameChange(change) {
    this.newUserName.next(change);
  }

  isLoginChange(change) {
    this.isLogin.next(change);
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

  songUpdateChange(change) {
    this.songUpdate.next(change);
  }

  newPlaylist(change) {
    this.playlistName.next(change);
  }

  resetEmitted() {
    this.playlistName = new Subject<any>();
    this.songUpdate = new Subject<any>();
    this.playlistNameEmitted = this.playlistName.asObservable();
    this.songUpdateEmitted = this.playlistName.asObservable();
  }
}
