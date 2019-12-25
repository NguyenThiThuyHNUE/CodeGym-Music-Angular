import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUserResponse} from '../interface/i-user-response';
import {Url} from '../../../url-project';
import {IMessage} from '../interface/i-message';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor(private http: HttpClient) {
  }

  createPlaylist(info) {
    return this.http.post<IMessage>(Url + '/api/playlist/create', info);
  }
}
