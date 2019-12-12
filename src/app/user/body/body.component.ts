import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../service/music.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  musicList: any[];

  constructor(private musicService: MusicService) {
  }

  ngOnInit() {
    this.musicService.list().subscribe(musicList => {
      this.musicList = musicList.map(item => {
        return item.payload.val();
      });
    });
  }

}
