import {Injectable, Input} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Song} from '../song';
import {Router} from '@angular/router';
import {IMusic} from '../interface/i-music';
import {Observable} from 'rxjs';
import {IMessage} from '../interface/i-message';
import {HttpClient} from '@angular/common/http';
import {MainService} from './main.service';

const webBackEndUrl = 'localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  getMusicUrl = `http://${webBackEndUrl}/api/musics/`;
  createMusicUrl = `http://${webBackEndUrl}/api/music/create/`;
  editMusicUrl = `http://${webBackEndUrl}/api/music/edit/`;
  deleteMusicUrl = `http://${webBackEndUrl}/api/music/delete/`;
  music: AngularFireList<any>;
  constructor(private angularFireDatabase: AngularFireDatabase,
              private angularFireStorage: AngularFireStorage,
              private http: HttpClient,
             ) {
    this.list();
  }

  uploadAvatar(firePathAvatar, selectFileAvatar) {
    return this.angularFireStorage.upload(firePathAvatar, selectFileAvatar);
  }

  uploadMp3(firePathMp3, selectFileMp3) {
    return this.angularFireStorage.upload(firePathMp3, selectFileMp3);
  }

  list() {
    return this.angularFireDatabase.list('/list').snapshotChanges();
  }

  upLoadDataMusic(music): Observable<IMessage> {
    return this.http.post<IMessage>(this.createMusicUrl, music);
  }

  getMusics() {
    // console.log(this.http.get<{ data }>(this.getMusicUrl));
    return this.http.get<{ data }>(this.getMusicUrl);
  }

  editMusic(idMusic, music): Observable<IMessage> {
    return this.http.put<IMessage>(this.editMusicUrl + idMusic, music);
  }

  deleteMusic(idMusic): Observable<IMessage> {
    return this.http.delete<IMessage>(this.deleteMusicUrl + idMusic);
  }
  saveDataToLocalStorage(response: any) {
    localStorage.setItem('id', response.id);
  }


}
