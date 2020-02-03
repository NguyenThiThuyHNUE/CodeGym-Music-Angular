import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Url} from '../../../url-project';
import {Response} from '../interface/response';
import {UserService} from './user.service';
import {IMusic} from '../interface/i-music';


@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private angularFireDatabase: AngularFireDatabase,
              private angularFireStorage: AngularFireStorage,
              private http: HttpClient) {
  }
  music: AngularFireList<any>;

  static getSongImage(song: IMusic) {
    if (!song.avatar) {
      // tslint:disable-next-line:max-line-length
      return 'https://firebasestorage.googleapis.com/v0/b/codegym-music-d1055.appspot.com/o/music%2Fbg-7.jpg?alt=media&token=fde1a560-92b5-4bf8-977b-33c26332496d';
    }
    return song.avatar;
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

  getSingerSongs(singerId) {
    return this.http.get<Response>(Url + `/api/singer/songs/${singerId}`);
  }

  getUsSongs() {
    return this.http.get<Response>(Url + `/api/song-US`);
  }

  getTopViewsSongs() {
    return this.http.get<Response>(Url + `/api/top-views/songs`);
  }

  getFavoriteSongs() {
    return this.http.get<Response>(Url + `/api/favorite/songs`);
  }

  getVnSongs() {
    return this.http.get<Response>(Url + `/api/song-VN`);
  }

  getTheSameSongs(category) {
    return this.http.get<Response>(Url + `/api/song-${category}`);
  }

  likeSong(userId, songId) {
    return this.http.get<Response>(Url + `/api/song/${userId}/like/${songId}?token=${localStorage.getItem('token')}`);
  }

  dislikeSong(userId, songId) {
    return this.http.get<Response>(Url + `/api/song/${userId}/disLike/${songId}?token=${localStorage.getItem('token')}`);
  }

  getSongsUserHasLiked() {
    return this.http.get<Response>(Url + `/api/song/user/has/liked?token=${localStorage.getItem('token')}`);
  }

  edit(musicInfo): Observable<Response> {
    return this.http.put<Response>(Url + `/api/music/edit`, musicInfo);
  }

  delete(songId): Observable<Response> {
    return this.http.delete<Response>(Url + `/api/music/delete/${songId}`);
  }
}
