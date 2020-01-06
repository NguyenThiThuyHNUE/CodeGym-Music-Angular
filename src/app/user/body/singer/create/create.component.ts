import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {MusicService} from '../../../../service/music.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {ActivatedRoute, Router} from '@angular/router';
import {Song} from '../../../../song';
import {finalize} from 'rxjs/operators';
import {SingerService} from '../../../../service/singer.service';
import {UploadService} from '../../../../service/upload.service';
import {SongService} from '../../../../service/song.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  selectFileAvatar: File = null;
  addSingerForm: any;
  selectFileMp3: File = null;

  constructor(private fb: FormBuilder,
              private router: Router,
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
    // console.log(this.selectFileAvatar);

  }

  onSelectFileMp3(event) {
    this.selectFileMp3 = event.target.files[0] as File;
  }

  onUpLoad() {
    this.setUpFileAndImageService();
    this.startUpload();
    this.getCallBackImage();
    // this.song.name = this.addSingerForm.value.name;
    // this.song.singer = this.addSingerForm.value.singer;
    // this.song.description = this.addSingerForm.value.description;
    // const firePathAvatar = `music/${this.selectFileAvatar.name}`;
    // const fireRefAvatar = this.angularFireStorage.ref(firePathAvatar);
    // // this.databaseList = this.angularFireDatabase.list('/list');
    // const taskUploadAvatar = this.singerService.uploadAvatar(firePathAvatar, this.selectFileAvatar);
    // taskUploadAvatar.percentageChanges().subscribe(percent => {
    //   this.uploadPercent = percent;
    // });
    // taskUploadAvatar.snapshotChanges().pipe(
    //   finalize(() => {
    //     fireRefAvatar.getDownloadURL().subscribe((url) => {
    //       this.song.avatar = url;
    //     });
    //   })).subscribe();
  }

  get name() {
    return this.addSingerForm.get('name');
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
      this.router.navigate(['/home']).then(() => {
        alert(response.message);
      });
    });
  }

  getImgDownloadUrl(fireRefImg) {
    fireRefImg.getDownloadURL().subscribe((url) => {
      this.addSingerForm.value.avatar = url;
      this.startUpdateSongToServer();
    });
  }

  setForm() {
    this.addSingerForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        avatar: ['', [Validators.required]],
      });
  }

}
