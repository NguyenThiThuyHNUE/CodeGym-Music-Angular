import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../../service/music.service';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.scss']
})
export class MusicDetailComponent implements OnInit {

  musicList: any[];

  constructor(private musicService: MusicService) {
  }

  ngOnInit() {
    this.musicService.list().subscribe(
      list => {
        this.musicList = list.map(item => {
          return item.payload.val();
        });
      },
    );
    console.log(this.musicList);
  }
}
