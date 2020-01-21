import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {IMusic} from '../interface/i-music';

@Injectable()
export class SharedService {
  // Observable string sources
  playlistName = new Subject<any>();
  songDelete = new Subject<any>();
  emitChangeSource = new Subject<IMusic>();
  songsUserHasLiked = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  playlistNameEmitted = this.playlistName.asObservable();
  songDeleteEmitted = this.songDelete.asObservable();
  songsUserHasLikedEmitted = this.songsUserHasLiked.asObservable();

  // Service message commands
  songsUserHasLikedChange(change) {
    this.songsUserHasLiked.next(change);
  }

  emitChange(change: any) {
    this.emitChangeSource.next(change);
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
