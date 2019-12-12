import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Song} from '../song';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private angularFireDatabase: AngularFireDatabase,
              private angularFireStorage: AngularFireStorage,
              private song: Song) {
    this.list();
  }

  upLoad(selectFileAvatar, selectFileMp3, databaseList, addMusicForm) {

    this.song.description = addMusicForm.description;
    this.song.id = addMusicForm.id;
    this.song.singer = addMusicForm.singer;
    this.song.name = addMusicForm.name;

    databaseList = this.angularFireDatabase.list('/list');
    const firePathAvatar = `music/${selectFileAvatar.name}`;
    const firePathMp3 = `music/${selectFileMp3.name}`;
    const fireRefMp3 = this.angularFireStorage.ref(firePathMp3);
    const fireRefAvatar = this.angularFireStorage.ref(firePathAvatar);
    this.angularFireStorage.upload(firePathAvatar, selectFileAvatar).snapshotChanges().pipe(
      finalize(() => {
        fireRefAvatar.getDownloadURL().subscribe((url) => {
          this.song.avatar = url;
        });
      })
    ).subscribe();
    this.angularFireStorage.upload(firePathMp3, selectFileMp3).snapshotChanges().pipe(
      finalize(() => {
        fireRefMp3.getDownloadURL().subscribe((url) => {
          this.song.musicUrl = url;
          databaseList.push(this.song);
          console.log('in get music Url');
          console.log(this.song);
        });
      })
    ).subscribe();
  }

  list() {
    return this.angularFireDatabase.list('/list').snapshotChanges();
  }
}
