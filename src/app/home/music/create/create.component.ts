import {Component, OnInit} from '@angular/core';
import {IMusic} from '../../../interface/iMusic';
import {MusicService} from '../../../service/music.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  addMusic: IMusic;
  addMusicForm = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    avatar: ['', [Validators.required]],
  });

  constructor(private musicService: MusicService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.musicService.createSong(this.addMusicForm.value).subscribe(res => {
      this.router.navigate(['/home/music']).then(() => {
        alert(res.message);
      });
    }, error => {
      console.log(error);
    });
  }

}
