import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireDatabase} from '@angular/fire/database';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {SingerService} from '../../../../service/singer.service';
import {UploadService} from '../../../../service/upload.service';
import {SnotifyService} from 'ng-snotify';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  selectFileAvatar: File = null;
  addSingerForm: any;
  selectFileMp3: File = null;
  singerImage: string | ArrayBuffer = '../../../../../assets/img/bg-img/bg-7.jpg';
  singers: string;
  singerUserHasChose: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private Notify: SnotifyService,
              private dialogRef: MatDialogRef<CreateComponent>,
              private angularFireStorage: AngularFireStorage,
              private singerService: SingerService,
              private angularFireDatabase: AngularFireDatabase,
              private route: Router,
              private uploadService: UploadService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.setForm();
  }

  onSelectFileAvatar(event) {
    this.selectFileAvatar = event.target.files[0] as File;
    this.setDataToFillInterface(event);
  }

  setDataToFillInterface(event) {
    if (event.target.files[0]) {
      const reader: FileReader = new FileReader();

      reader.onload = (progressEvent) => { // called once readAsDataURL is completed
        this.singerImage = reader.result;
      };

      reader.readAsDataURL(event.target.files[0]); // read file as data url
    }
  }

  onSelectFileMp3(event) {
    this.selectFileMp3 = event.target.files[0] as File;
  }

  clickOption(value: string) {
    this.addSingerForm.value.singerGender = value;
  }

  handleNewSingerIsAssigned(value) {
    this.singerUserHasChose.push(value);
    this.singers += value;
  }

  handleNewSingerIsChose(value) {
    if (!this.doesUserChooseSingerAgain(value)) {
      this.handleSingerIsNotDuplicate(value);
    }
    return;
  }

  handleSingerIsNotDuplicate(value) {
    this.singerUserHasChose.push(value);
    this.singers += `, ${value}`;
  }

  doesUserChooseSingerAgain(value) {
    return !!this.singerUserHasChose.includes(value);
  }

  isSingersExist() {
    return !!this.singers;
  }

  onUpLoad() {
    this.setUpFileAndImageService();
    this.startUpload();
    this.getCallBackImage();
  }

  get name() {
    return this.addSingerForm.get('name');
  }

  get singerGender() {
    return this.addSingerForm.get('singerGender');
  }

  get description() {
    return this.addSingerForm.get('description');
  }

  get avatar() {
    return this.addSingerForm.get('avatar');
  }

  startUpload() {
    this.uploadService.startUpload(true, false);
  }

  setUpFileAndImageService() {
    this.uploadService.setSelectFileImg(this.selectFileAvatar);

  }

  getCallBackImage() {
    this.uploadService.taskUploadImg.snapshotChanges().pipe(
      finalize(() => {
        this.getImgDownloadUrl(this.uploadService.fireRefImg);
      })).subscribe();
  }

  startUpdateSongToServer() {
    this.singerService.create(this.addSingerForm.value).subscribe(response => {
      this.router.navigate(['/singer']).then(() => {
        this.Notify.success(response.message, {timeout: 1000});
        this.dialogRef.close();
      });
    });
  }

  getImgDownloadUrl(fireRefImg) {
    fireRefImg.getDownloadURL().subscribe((url) => {
      this.addSingerForm.value.singerAvatar = url;
      this.startUpdateSongToServer();
    });
  }

  setForm() {
    this.addSingerForm = this.fb.group(
      {
        singerName: ['', [Validators.required]],
        singerDes: [''],
        singerGender: ['', [Validators.required]],
        singerAvatar: ['', [Validators.required]],
        singerNickName: [''],
      });
  }

}
