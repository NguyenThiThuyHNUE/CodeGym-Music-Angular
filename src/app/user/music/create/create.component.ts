import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../../service/music.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  addMusicForm = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    avatar: ['', [Validators.required]],
    file_mp3: ['', [Validators.required]],
  });

  constructor(private musicService: MusicService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
  }

  submit() {
    this.musicService.createSong(this.addMusicForm.value).subscribe(res => {
      this.router.navigate(['/home/music']).then(() => {
        alert(res.message);
      });
    }, error => {
      console.log(error);
    });
  }

  fileChange(event): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];

      const formData = new FormData();
      formData.append('file', file, file.name);

      const headers = new Headers();
      // It is very important to leave the Content-Type empty
      // do not use headers.append('Content-Type', 'multipart/form-data');
      headers.append('Authorization', 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9....');
      // const options = new RequestOptions({headers: headers});
    }
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

  get avatar() {
    return this.addMusicForm.get('avatar');
  }

  get file_mp3() {
    return this.addMusicForm.get('file_mp3');
  }
}
