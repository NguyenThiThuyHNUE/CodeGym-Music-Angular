import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {MusicService} from '../../../../service/music.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {Song} from '../../../../song';
import {finalize} from 'rxjs/operators';
import {SingerService} from '../../../../service/singer.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  selectFileAvatar: File = null;
  uploadPercent: any;
  // databaseList: AngularFireList<any>;
  addSingerForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    avatar: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder,
              private angularFireStorage: AngularFireStorage,
              private singerService: SingerService,
              private angularFireDatabase: AngularFireDatabase,
              private route: Router,
              private song: Song) {
  }

  ngOnInit() {
  }

  onSelectFileAvatar(event) {
    this.selectFileAvatar = event.target.files[0] as File;
  }
  // noinspection DuplicatedCode
  onUpLoad() {
    this.song.name = this.addSingerForm.value.name;
    this.song.singer = this.addSingerForm.value.singer;
    this.song.description = this.addSingerForm.value.description;
    const firePathAvatar = `music/${this.selectFileAvatar.name}`;
    const fireRefAvatar = this.angularFireStorage.ref(firePathAvatar);
    // this.databaseList = this.angularFireDatabase.list('/list');
    const taskUploadAvatar = this.singerService.uploadAvatar(firePathAvatar, this.selectFileAvatar);
    taskUploadAvatar.percentageChanges().subscribe(percent => {
      this.uploadPercent = percent;
    });
    taskUploadAvatar.snapshotChanges().pipe(
      finalize(() => {
        fireRefAvatar.getDownloadURL().subscribe((url) => {
          this.song.avatar = url;
        });
      })).subscribe();
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

}
