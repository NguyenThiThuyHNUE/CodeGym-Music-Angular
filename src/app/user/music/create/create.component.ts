import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MusicService} from '../../../service/music.service';
import {AngularFireList} from '@angular/fire/database';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  selectFileAvatar: FileList = null;
  selectFileMp3: FileList = null;
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
              private musicService: MusicService) {
  }

  ngOnInit() {
  }

  onSelectFileAvatar(event) {
    this.selectFileAvatar = event.target.files[0] as FileList;
    console.log(event.target.files[0]);
  }

  onSelectFileMp3(event) {
    this.selectFileMp3 = event.target.files[0] as FileList;
    console.log(event.target.files[0]);
  }

  upLoad() {
    this.musicService.upLoad(this.selectFileAvatar, this.selectFileMp3, this.databaseList, this.addMusicForm.value);
    // this.musicService.upLoad(this.selectFileMp3, this.databaseList, this.addMusicForm.value);
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
