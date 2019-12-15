import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MusicService} from '../../../service/music.service';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Song} from '../../../song';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';

// import {url} from 'inspector';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  selectFileAvatar: File = null;
  selectFileMp3: File = null;
  databaseList: AngularFireList<any>;
  addMusicForm = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    singer: ['', [Validators.required]],
    avatar: ['', [Validators.required]],
    file_mp3: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder,
              private angularFireStorage: AngularFireStorage,
              private musicService: MusicService,
              private angularFireDatabase: AngularFireDatabase,
              private route: Router,
              private song: Song) {
  }

  ngOnInit() {
  }

  onSelectFileAvatar(event) {
    this.selectFileAvatar = event.target.files[0] as File;
  }

  onSelectFileMp3(event) {
    this.selectFileMp3 = event.target.files[0] as File;
  }

  onUpLoad() {
    this.song.id = this.addMusicForm.value.id;
    this.song.name = this.addMusicForm.value.name;
    this.song.singer = this.addMusicForm.value.singer;
    this.song.description = this.addMusicForm.value.description;
    const firePathAvatar = `music/${this.selectFileAvatar.name}`;
    const firePathMp3 = `music/${this.selectFileMp3.name}`;
    const fireRefAvatar = this.angularFireStorage.ref(firePathAvatar);
    const fireRefMp3 = this.angularFireStorage.ref(firePathMp3);
    this.musicService.uploadAvatar(firePathAvatar, this.selectFileAvatar).snapshotChanges().pipe(finalize(() => {
      fireRefAvatar.getDownloadURL().subscribe((url) => {
        this.song.avatar = url;
      });
    })).subscribe();
    this.musicService.uploadMp3(firePathMp3, this.selectFileMp3).snapshotChanges().pipe(finalize(() => {
      fireRefMp3.getDownloadURL().subscribe((url) => {
        this.song.musicUrl = url;
        this.databaseList.push(this.song);
        this.route.navigate(['/home']).then(() => {
          alert('You Created A Song Success !');
        });
      });
    })).subscribe();
  }

  get id() {
    return this.addMusicForm.get('id');
  }

  get name() {
    return this.addMusicForm.get('name');
  }

  get description() {
    return this.addMusicForm.get('description');
  }

  get singer() {
    return this.addMusicForm.get('singer');
  }

  get avatar() {
    return this.addMusicForm.get('avatar');
  }

  get file_mp3() {
    return this.addMusicForm.get('file_mp3');
  }
}
