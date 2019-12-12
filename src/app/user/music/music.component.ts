import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../service/music.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
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

