import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../../../service/music.service';
import {IMusic} from '../../../../interface/i-music';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Song} from '../../../../song';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {UserService} from '../../../../service/user.service';
import {SongService} from '../../../../service/song.service';
import {UploadService} from '../../../../service/upload.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  oldSong: IMusic;
  songId: number;
  editFormMusic: any;
  selectFileAvatar: File = null;
  selectFileMp3: File = null;

  constructor(private songService: SongService,
              private uploadService: UploadService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private angularFireStorage: AngularFireStorage,
              private song: Song) {
  }

  ngOnInit() {
    this.setMusicId();
    this.setForm();
    this.getSongToFillUpInterface();
  }

  setMusicId() {
    this.songId = +this.activatedRoute.snapshot.paramMap.get('id');
  }

  getSongToFillUpInterface() {
    this.songService.getSong(this.songId).subscribe(response => {
      this.oldSong = response.data;
    });
  }

  onSelectFileAvatar(event) {
    this.selectFileAvatar = event.target.files[0] as File;
  }

  onSelectFileMp3(event) {
    this.selectFileMp3 = event.target.files[0] as File;
  }

  // noinspection DuplicatedCode
  onEdit() {
    this.setUpFileAndImageService();
    this.startUpload();
    this.getCallBackImage();
  }

  getCallBackImage() {
    this.uploadService.taskUploadImg.snapshotChanges().pipe(
      finalize(() => {
        this.getImgDownloadUrl(this.uploadService.fireRefImg);
      })).subscribe();
  }

  getImgDownloadUrl(fireRefImg) {
    fireRefImg.getDownloadURL().subscribe((url) => {
      this.editFormMusic.value.avatar = url;
      this.startUpdateSongToServer();
    });
  }

  startUpdateSongToServer() {
    this.songService.edit(this.editFormMusic.value).subscribe(response => {
      this.router.navigate(['/home']).then(() => {
        alert(response.message);
      });
    });
  }

  startUpload() {
    this.uploadService.startUpload(true, false);
  }

  setUpFileAndImageService() {
    this.uploadService.setSelectFileImg(this.selectFileAvatar);
  }

  get id() {
    return this.editFormMusic.get('id');
  }

  get name() {
    return this.editFormMusic.get('name');
  }

  get singer() {
    return this.editFormMusic.get('singer');
  }

  get description() {
    return this.editFormMusic.get('description');
  }

  get avatar() {
    return this.editFormMusic.get('avatar');
  }

  get file_mp3() {
    return this.editFormMusic.get('file_mp3');
  }

  setForm() {
    this.editFormMusic = this.fb.group(
      {
        name: ['', [Validators.required]],
        singer: ['', [Validators.required]],
        description: ['', [Validators.required]],
        avatar: ['', [Validators.required]],
      });
  }

}
