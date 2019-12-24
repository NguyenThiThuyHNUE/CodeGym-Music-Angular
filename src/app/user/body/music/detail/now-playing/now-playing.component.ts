import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {IMusic} from '../../../../../interface/i-music';
import {MusicService} from '../../../../../service/music.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit, OnChanges {
  @Input() nowPlaying: IMusic;

  constructor(private musicService: MusicService,
              private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.nowPlaying);
  }


}
