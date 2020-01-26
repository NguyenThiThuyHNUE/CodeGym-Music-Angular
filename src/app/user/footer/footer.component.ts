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
  listSongs: IMusic[];
  oldSongs: IMusic[];
  indexSong = 0;

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
    this.isAnySongPlayed();
  }

  isSongEnded(yes: boolean) {
    if (yes) {
      this.nextSong();
    }
  }

  nextSong() {
    this.putCurrentSongToOldListOldSongs(this.currentSong);
    this.currentSong = this.listSongs[this.indexSong];
    this.indexSong++;
  }

  putCurrentSongToOldListOldSongs(song) {
    this.oldSongs.push(song);
  }

  getTheSameSongs() {
    this.sharedService.listTheSameSongsEmitted.subscribe((list) => {
      this.listSongs = list;
      this.indexSong = 0;
      this.oldSongs = [];
    });
  }

  isAnySongPlayed() {
    this.sharedService.currentSongEmitted.subscribe((song) => {
      if (song) {
        this.currentSong = song;
        this.isPlay = true;
        this.getTheSameSongs();
      }
    });
  }
}
