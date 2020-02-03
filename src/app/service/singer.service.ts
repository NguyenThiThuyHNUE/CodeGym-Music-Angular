import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMessage} from '../interface/i-message';
import {Response} from '../interface/response';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CreateComponent as SingerCreateComponent} from '../user/body/singer/create/create.component';
import {SingerInfoComponent} from '../user/body/singer/singer-info/singer-info.component';
import {UserService} from './user.service';

const webBackEndUrl = 'localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  getSingerUrl = `http://${webBackEndUrl}/api/singers/`;
  createSingerUrl = `http://${webBackEndUrl}/api/singer/create?token=${UserService.getUserToken()}`;
  // editMusicUrl = `http://${webBackEndUrl}/api/music/edit/`;
  // deleteMusicUrl = `http://${webBackEndUrl}/api/music/delete/`;
  singer: AngularFireList<any>;

  constructor(private angularFireDatabase: AngularFireDatabase,
              private angularFireStorage: AngularFireStorage, public dialog: MatDialog,
              private http: HttpClient) {

  }

  static createConfigDialog(config) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = config;
    return dialogConfig;
  }

  showCreateSingerFormDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '70%';
    dialogConfig.width = '70%';
    this.dialog.open(SingerCreateComponent, dialogConfig);
  }

  showSingerInfo(singer) {
    const dialogConfig = SingerService.createConfigDialog(singer);
    dialogConfig.height = '70%';
    dialogConfig.width = '70%';
    this.dialog.open(SingerInfoComponent, dialogConfig);
  }

  uploadAvatar(firePathAvatar, selectFileAvatar) {
    return this.angularFireStorage.upload(firePathAvatar, selectFileAvatar);
  }

  getSingers() {
    return this.http.get<Response>(this.getSingerUrl);
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
