import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../service/music.service';
import {SongService} from '../../service/song.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
