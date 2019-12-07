import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMusic} from '../interface/iMusic';
import {IMessage} from '../interface/iMessage';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireDatabase} from '@angular/fire/database';


const webBackEndUrl = 'localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  musicUrl = `http://${webBackEndUrl}/api/songs`;
  createSongUrl = `http://${webBackEndUrl}/api/song/create/`;

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
