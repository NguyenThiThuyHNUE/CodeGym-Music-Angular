import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UploadService} from '../../../service/upload.service';
import {finalize} from 'rxjs/operators';
import {SongService} from '../../../service/song.service';
import {SnotifyService} from 'ng-snotify';
import {UserService} from '../../../service/user.service';
import {SingerService} from '../../../service/singer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  image: string | ArrayBuffer = '../../../../assets/img/music-02.jpeg';
  fileMp3: any;
  fileImage: any;
  optionSelected: any;
  uploadForm: any;
  innerProgress: any;
  userId: number;
  singersInInterface: string;
  listSinger: any[];
  singerUserHasChose: string[];

  constructor(private uploadService: UploadService,
              private router: Router,
              private songService: SongService,
              private singerService: SingerService,
              private Notify: SnotifyService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getSingers();
    this.getUserId();
    this.setForm();
  }

  getSingers() {
    this.singerService.getSingers().subscribe((response) => {
      this.listSinger = response.data;
    });
  }

  chooseSinger(singer) {
    if (this.isSingersExist()) {
      return this.handleNewSingerIsChose(singer);
    }
    return this.handleNewSingerIsAssigned(singer);
  }

  handleNewSingerIsAssigned(value) {
    this.singerUserHasChose = [];
    this.singersInInterface = '';
    this.singerUserHasChose.push(value.id);
    this.singersInInterface += value.name;
  }

  handleSingerIsNotDuplicate(value) {
    this.singerUserHasChose.push(value.id);
    this.singersInInterface += `, ${value.name}`;
  }

  handleNewSingerIsChose(value) {
    if (!this.doesUserChooseSingerAgain(value)) {
      this.handleSingerIsNotDuplicate(value);
    }
    return;
  }

  doesUserChooseSingerAgain(value) {
    return !!this.singerUserHasChose.includes(value.id);
  }

  isSingersExist() {
    return !!this.singersInInterface;
  }

  getUserId() {
    return this.userId = UserService.getUserId();
  }

  onSelectFileMp3(event) {
    this.fileMp3 = event.target.files[0];
  }

  setDataToFillInterface(event) {
    if (event.target.files[0]) {
      const reader: FileReader = new FileReader();

      reader.onload = (progressEvent) => { // called once readAsDataURL is completed
        this.image = reader.result;
      };

      reader.readAsDataURL(event.target.files[0]); // read file as data url
    }
  }

  clickOption(value) {
    this.uploadForm.value.category = value;
    return this.optionSelected = value;
  }

  onSelectImage(event) {
    this.fileImage = event.target.files[0];
    this.setDataToFillInterface(event);
  }

  uploadCancel() {
    return this.fileMp3 = null;
  }

  uploadFile() {
    this.setUpFileAndImageService();
    this.startUpload();
    this.getCallBack();
  }

  getCallBack() {
    this.uploadService.taskUploadImg.snapshotChanges().pipe(
      finalize(() => {
        this.getImageDownloadUrl(this.uploadService.fireRefImg);
      })).subscribe();
    this.uploadService.taskUploadFile.snapshotChanges().pipe(
      finalize(() => {
        this.getFileDownloadUrl(this.uploadService.fireRefFile);
      })).subscribe();
    this.uploadService.taskUploadFile.percentageChanges().subscribe((percent) => {
      this.innerProgress = percent + '%';
    });
  }

  getFileDownloadUrl(fireRefMp3) {
    fireRefMp3.getDownloadURL().subscribe((fileUrl) => {
      this.uploadForm.value.file = fileUrl;
      if (fileUrl) {
        this.uploadToServer();
      }
    });
  }

  getImageDownloadUrl(fireRefImg) {
    fireRefImg.getDownloadURL().subscribe((imgUrl) => {
      this.uploadForm.value.avatar = imgUrl;
    });
  }

  uploadToServer() {
    this.setUpPreData();
    this.songService.create(this.uploadForm.value).subscribe((response) => {
      this.Notify.success(response.message, {timeout: 1000});
      this.router.navigate(['/home']).then();
    });
  }

  setUpPreData() {
    this.uploadForm.value.singers = this.singerUserHasChose;
  }

  startUpload() {
    this.uploadService.startUpload(true, true);
  }

  setUpFileAndImageService() {
    if (this.fileImage) {
      this.uploadService.setSelectFileImg(this.fileImage);
    }
    this.uploadService.setSelectFile(this.fileMp3);
  }

  setForm() {
    this.uploadForm = this.fb.group(
      {
        userId: this.userId,
        name: ['', [Validators.required]],
        singers: ['', [Validators.required]],
        file: ['', [Validators.required]],
        avatar: ['', [Validators.required]],
        category: ['', [Validators.required]],
      });
    this.uploadForm.value.avatar = this.image;
  }

  get singers() {
    return this.uploadForm.get('singers');
  }

  get file() {
    return this.uploadForm.get('file');
  }

  get name() {
    return this.uploadForm.get('name');
  }

  get category() {
    return this.uploadForm.get('category');
  }

}
