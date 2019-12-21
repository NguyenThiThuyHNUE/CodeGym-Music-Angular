import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../service/music.service';
import {IMusic} from '../../interface/i-music';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  musicList: IMusic[];

  constructor(private musicService: MusicService) {
  }

  ngOnInit() {
  }
}

