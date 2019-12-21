import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../../service/music.service';
import {IMusic} from '../../../interface/i-music';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Song} from '../../../song';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  musicEdit: IMusic;
  idMusic: number = +this.activatedRoute.snapshot.paramMap.get('id');
  editFormMusic = this.fb.group(
    {
      id: [this.idMusic, [Validators.required]],
      name: ['', [Validators.required]],
      singer: ['', [Validators.required]],
      description: ['', [Validators.required]],
      avatar: ['', [Validators.required]],
      file_mp3: ['', [Validators.required]],
    });
  selectFileAvatar: File = null;
  selectFileMp3: File = null;

  constructor(private musicService: MusicService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private angularFireStorage: AngularFireStorage,
              private song: Song) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.musicService.getMusics().subscribe(musics => {
      this.musicEdit = musics.find(music => music.id === this.idMusic);
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
    this.song.id = this.editFormMusic.value.id;
    this.song.name = this.editFormMusic.value.name;
    this.song.singer = this.editFormMusic.value.singer;
    this.song.description = this.editFormMusic.value.description;
    const firePathAvatar = `music/${this.selectFileAvatar.name}`;
    const firePathMp3 = `music/${this.selectFileMp3.name}`;
    const fireRefAvatar = this.angularFireStorage.ref(firePathAvatar);
    const fireRefMp3 = this.angularFireStorage.ref(firePathMp3);
    // this.databaseList = this.angularFireDatabase.list('/list');
    this.musicService.uploadAvatar(firePathAvatar, this.selectFileAvatar).snapshotChanges().pipe(
      finalize(() => {
        fireRefAvatar.getDownloadURL().subscribe((url) => {
          this.song.avatar = url;
        });
      })).subscribe();
    this.musicService.uploadMp3(firePathMp3, this.selectFileMp3).snapshotChanges().pipe(
      finalize(() => {
        fireRefMp3.getDownloadURL().subscribe((url) => {
          this.song.musicUrl = url;
          this.musicService.editMusic(this.idMusic, this.song).subscribe();
          this.router.navigate(['/home']).then(() => {
            alert('You Edited A Song Success !');
          });
        });
      })).subscribe();
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

}
