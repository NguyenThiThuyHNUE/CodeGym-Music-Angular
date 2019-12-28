import {Injectable} from '@angular/core';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUserResponse} from '../interface/i-user-response';
import {Url} from '../../../url-project';
import {IMessage} from '../interface/i-message';
import {SongResponse} from '../interface/song-response';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor(private http: HttpClient) {
  }

  getPlaylists(userId) {
    return this.http.get(Url + `/api/playlists/${userId}`);
  }

  createPlaylist(info) {
    return this.http.post<IMessage>(Url + '/api/playlist/create', info);
  }

  putSongToPlaylist(order) {
    return this.http.post(Url + '/api/playlist/song', order);
  }

  getSongsInPlaylist(playlistId) {
    return this.http.get<SongResponse>(Url + `/api/playlist/songs/${playlistId}`);
  }

}
