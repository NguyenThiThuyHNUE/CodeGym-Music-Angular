import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Url} from '../../../url-project';
import {Response} from '../interface/response';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  music: AngularFireList<any>;

  constructor(private angularFireDatabase: AngularFireDatabase,
              private angularFireStorage: AngularFireStorage,
              private http: HttpClient) {
  }

  uploadImg(firePathImg, selectFileImg) {
    return this.angularFireStorage.upload(firePathImg, selectFileImg);
  }

  uploadMp3(firePathMp3, selectFileMp3) {
    return this.angularFireStorage.upload(firePathMp3, selectFileMp3);
  }

  create(musicInfo): Observable<Response> {
    return this.http.post<Response>(Url + '/api/music/create', musicInfo);
  }

  getAll() {
    return this.http.get<Response>(Url + '/api/musics');
  }

  getSong(songId) {
    return this.http.get<Response>(Url + `/api/song/${songId}`);
  }

  getNewSongs() {
    return this.http.get<Response>(Url + `/api/new-song`);
  }

  getUserSongs() {
    return this.http.get<Response>(Url + `/api/user/songs?token=` + UserService.getUserToken());
  }

  getUsSongs() {
    return this.http.get<Response>(Url + `/api/song-Us`);
  }

  getVnSongs() {
    return this.http.get<Response>(Url + `/api/song-Vn`);
  }

  edit(songId, musicInfo): Observable<Response> {
    return this.http.put<Response>(Url + `/api/music/edit/${songId}`, musicInfo);
  }

  delete(songId): Observable<Response> {
    return this.http.delete<Response>(Url + `/api/music/delete/${songId}`);
  }
}
