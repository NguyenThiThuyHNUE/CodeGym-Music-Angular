import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {IMusic} from '../interface/i-music';

@Injectable()
export class SharedService {
  // Observable string sources
  playlistName = new Subject<any>();
  songDelete = new Subject<any>();
  private emitChangeSource = new Subject<IMusic>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  playlistNameEmitted = this.playlistName.asObservable();
  songDeleteEmitted = this.songDelete.asObservable();

  // Service message commands
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
