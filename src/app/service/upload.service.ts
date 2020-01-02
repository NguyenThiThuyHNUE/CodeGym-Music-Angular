import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {SongService} from './song.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  firePathImg: string;
  fireRefImg: AngularFireStorageReference;
  taskUploadImg: AngularFireUploadTask;
  selectFileImg: { name: string };

  constructor(private angularFireStorage: AngularFireStorage, private songService: SongService) {
  }

  setUpDataToUpdate() {
    this.firePathImg = this.setUpPathToImgInFireBase();
    this.fireRefImg = this.setUpFileRefInFireBase(this.firePathImg);
    this.taskUploadImg = this.startUploadImageToFireBase(this.firePathImg);
  }

  setUpPathToImgInFireBase() {
    return `music/${this.selectFileImg.name}`;
  }

  setUpFileRefInFireBase(firePathImg) {
    return this.angularFireStorage.ref(firePathImg);
  }

  startUploadImageToFireBase(firePathImg) {
    return this.songService.uploadImg(firePathImg, this.selectFileImg);
  }

  setSelectFileImg(selectFileImg) {
    this.selectFileImg = selectFileImg;
  }

  startUpload() {
    this.setUpDataToUpdate();
   }
}
