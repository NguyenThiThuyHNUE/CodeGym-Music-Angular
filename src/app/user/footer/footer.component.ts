import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../service/shared.service';
import {IMusic} from '../../interface/i-music';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isPlay = false;
  currentSong: IMusic;

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
    this.isAnySongPlayed();
  }

  isAnySongPlayed() {
    this.sharedService.changeEmitted$.subscribe((song) => {
      if (song) {
        this.currentSong = song;
        this.isPlay = true;
      }
    });
  }
}
