import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Url} from '../../../url-project';
import {Response} from '../interface/response';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) {
  }

  likeSong(userId, songId) {
    return this.http.get<Response>(Url + `api/song/${userId}/like/${songId}?token=${localStorage.getItem('token')}`);
  }

  dislikeSong(userId, songId) {
    return this.http.get<Response>(Url + `api/song/${userId}/dislike/${songId}?token=${localStorage.getItem('token')}`);
  }
}
