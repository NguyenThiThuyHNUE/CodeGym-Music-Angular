import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMusic} from '../../../../interface/i-music';
import {SharedService} from '../../../../service/shared.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  @Input() song: IMusic;
  playIcon: boolean;
  isPlay: boolean;

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
    this.sharedService.changeEmitted$.subscribe((song) => {
      if (song.id === this.song.id) {
        return this.isPlay = true;
      }
      this.isPlay = false;
      return this.hidePlayIcon();

    });
  }

  hidePlayIcon() {
    if (!this.isPlay) {
      return this.playIcon = false;
    }
  }

  showPlayIcon() {
    return this.playIcon = true;
  }

  onClick(song: IMusic) {

    this.sharedService.emitChange(song);
  }
}
