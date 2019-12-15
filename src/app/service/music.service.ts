import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Song} from '../song';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private angularFireDatabase: AngularFireDatabase,
              private angularFireStorage: AngularFireStorage,
              private router: Router) {
    this.list();
  }

  // upLoad(selectFileAvatar, selectFileMp3, firePathAvatar, firePathMp3, fireRefMp3, fireRefAvatar,
  //        databaseList, song) {
  //   this.angularFireStorage.upload(firePathAvatar, selectFileAvatar).snapshotChanges().pipe(
  //     finalize(() => {
  //       fireRefAvatar.getDownloadURL().subscribe((url) => {
  //         song.avatar = url;
  //       });
  //     })
  //   ).subscribe();
  //   this.angularFireStorage.upload(firePathMp3, selectFileMp3).snapshotChanges().pipe(
  //     finalize(() => {
  //       fireRefMp3.getDownloadURL().subscribe((url) => {
  //         song.musicUrl = url;
  //         databaseList.push(song);
  //         this.router.navigate(['/home']).then(() => {
  //           alert('Add Success ! ^^');
  //         });
  //       });
  //     })
  //   ).subscribe();
  // }

  uploadAvatar(firePathAvatar, selectFileAvatar) {
    return this.angularFireStorage.upload(firePathAvatar, selectFileAvatar);
  }

  uploadMp3(firePathMp3, selectFileMp3) {
    return this.angularFireStorage.upload(firePathMp3, selectFileMp3);
  }

  list() {
    return this.angularFireDatabase.list('/list').snapshotChanges();
  }
}
