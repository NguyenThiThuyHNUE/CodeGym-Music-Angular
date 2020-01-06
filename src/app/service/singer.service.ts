import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {AngularFireStorage} from "@angular/fire/storage";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IMessage} from "../interface/i-message";

const webBackEndUrl = 'localhost:8000';
@Injectable({
  providedIn: 'root'
})
export class SingerService {

  getMusicUrl = `http://${webBackEndUrl}/api/musics/`;
  createMusicUrl = `http://${webBackEndUrl}/api/music/create/`;
  editMusicUrl = `http://${webBackEndUrl}/api/music/edit/`;
  deleteMusicUrl = `http://${webBackEndUrl}/api/music/delete/`;
  music: AngularFireList<any>;

  constructor(private angularFireDatabase: AngularFireDatabase,
              private angularFireStorage: AngularFireStorage,
              private http: HttpClient) {
    this.list();
  }

  uploadAvatar(firePathAvatar, selectFileAvatar) {
    return this.angularFireStorage.upload(firePathAvatar, selectFileAvatar);
  }
  list() {
    return this.angularFireDatabase.list('/list').snapshotChanges();
  }

  upLoadDataMusic(music): Observable<IMessage> {
    return this.http.post<IMessage>(this.createMusicUrl, music);
  }

  getMusics() {
    return this.http.get<{ data }>(this.getMusicUrl);
  }

  editMusic(idMusic, music): Observable<IMessage> {
    return this.http.put<IMessage>(this.editMusicUrl + idMusic, music);
  }

  deleteMusic(idMusic): Observable<IMessage> {
    return this.http.delete<IMessage>(this.deleteMusicUrl + idMusic);
  }
}