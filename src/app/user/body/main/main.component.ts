import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../../service/music.service';
import {IMusic} from '../../../interface/i-music';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  musicList: IMusic[];

  constructor(private musicService: MusicService) {
  }

  // ngOnInit() {
  //   this.musicService.list().subscribe(
  //     list => {
  //       this.musicList = list.map(item => {
  //         return item.payload.val();
  //       });
  //       console.log(list);
  //     },
  //   );
  //   console.log(this.musicList);
  // }

  ngOnInit() {
    this.musicService.getMusic().subscribe(music => {
      this.musicList = music;
    });
  }
}
