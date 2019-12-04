import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMusic} from '../interface/iMusic';
import {IMessage} from '../interface/iMessage';

const webBackEndUrl = 'localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  musicUrl = `http://${webBackEndUrl}/api/auth/songs`;
  createSongUrl = `http://${webBackEndUrl}/api/auth/song/create/`;

  constructor(private http: HttpClient) {
  }

  getSong(): Observable<IMusic[]> {
    return this.http.get<IMusic[]>(this.musicUrl);
  }

  createSong(song): Observable<IMessage> {
    return this.http.post<IMessage>(this.createSongUrl, song);
  }

  editSong() {
  }
}
