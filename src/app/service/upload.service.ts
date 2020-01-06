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
  firePathFile: string;
  fireRefFile: AngularFireStorageReference;
  taskUploadFile: AngularFireUploadTask;
  selectFile: { name: string };

  constructor(private angularFireStorage: AngularFireStorage, private songService: SongService) {
  }

  setUpDataToUpdate(image?, file?) {
    if (image) {
      this.firePathImg = this.setUpPathToImgInFireBase();
      this.fireRefImg = this.setUpFileRefInFireBase(this.firePathImg);
      this.taskUploadImg = this.startUploadImageToFireBase(this.firePathImg);
      console.log('update image');
    }
    if (file) {
      console.log('update file');
      this.firePathFile = this.setUpPathToFileInFireBase();
      this.fireRefFile = this.setUpFileRefInFireBase(this.firePathFile);
      this.taskUploadFile = this.startUploadImageToFireBase(this.firePathFile);
    }
  }

  setUpPathToImgInFireBase() {
    return `music/${this.selectFileImg.name}`;
  }

  setUpPathToFileInFireBase() {
    return `music/${this.selectFile.name}`;
  }

  setUpFileRefInFireBase(firePath) {
    return this.angularFireStorage.ref(firePath);
  }

  startUploadImageToFireBase(firePathImg) {
    return this.songService.uploadImg(firePathImg, this.selectFileImg);
  }

  setSelectFileImg(selectFileImg) {
    this.selectFileImg = selectFileImg;
  }

  setSelectFile(selectFile) {
    this.selectFileImg = selectFile;
  }

  startUpload(image?, file?) {
    if (image && file) {
      return this.setUpDataToUpdate(image, file);
    } else if (image) {
      return this.setUpDataToUpdate(image);
    } else {
      return this.setUpDataToUpdate(false, file);
    }

  }
}
