import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMessage} from '../interface/i-message';
import {Response} from '../interface/response';

const webBackEndUrl = 'localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  getSingerUrl = `http://${webBackEndUrl}/api/singers/`;
  createSingerUrl = `http://${webBackEndUrl}/api/singer/create/`;
  // editMusicUrl = `http://${webBackEndUrl}/api/music/edit/`;
  // deleteMusicUrl = `http://${webBackEndUrl}/api/music/delete/`;
  singer: AngularFireList<any>;

  constructor(private angularFireDatabase: AngularFireDatabase,
              private angularFireStorage: AngularFireStorage,
              private http: HttpClient) {

  }

  uploadAvatar(firePathAvatar, selectFileAvatar) {
    return this.angularFireStorage.upload(firePathAvatar, selectFileAvatar);
  }

  getSingers() {
    return this.http.get(this.getSingerUrl);
  }

  upLoadDataMusic(music): Observable<IMessage> {
    return this.http.post<IMessage>(this.createSingerUrl, music);
  }

  getMusics() {
    return this.http.get<{ data }>(this.getSingerUrl);
  }

  create(data) {
    return this.http.post<Response>(this.createSingerUrl, data);
  }

  // editMusic(idMusic, music): Observable<IMessage> {
  //   return this.http.put<IMessage>(this.editMusicUrl + idMusic, music);
  // }
  //
  // deleteMusic(idMusic): Observable<IMessage> {
  //   return this.http.delete<IMessage>(this.deleteMusicUrl + idMusic);
  // }
}
