import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMusic} from '../../../../interface/i-music';
import {SharedService} from '../../../../service/shared.service';
import {MainService} from '../../../../service/main.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  @Input() song: IMusic;
  icon: boolean;
  isPlay: boolean;

  constructor(private sharedService: SharedService, private mainService: MainService) {
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

  showEtc() {
    this.mainService.showEtc(this.song);
  }

  hidePlayIcon() {
    if (!this.isPlay) {
      return this.icon = false;
    }
  }

  showPlayIcon() {
    return this.icon = true;
  }

  onClick(song: IMusic) {

    this.sharedService.emitChange(song);
  }
}
