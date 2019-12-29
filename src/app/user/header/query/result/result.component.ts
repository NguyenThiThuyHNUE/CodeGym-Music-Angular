import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MusicService} from '../../../../service/music.service';
import {IMusic} from '../../../../interface/i-music';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnChanges {
  @Input() queryValue: string;
  songs: IMusic[];
  songResult = [];

  constructor(private songService: MusicService) {
  }

  ngOnInit() {
    this.resetSongResult();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resetSongResult();
    this.getSongsFromServerAndPutToArray();
  }

  getSongsFromServerAndPutToArray() {
    this.songService.getMusics().subscribe((response) => {
      this.handleResponse(response);
    });
  }

  handleResponse(response) {
    this.songs = response.data;
    this.getSongsInArray();
  }

  getSongsInArray() {
    this.songs.forEach((song) => {
      const reg = new RegExp(this.queryValue, 'gi');
      if (this.isTheNameMatchWithQueryValue(song, reg)) {
        if (!this.isSongExistInArray(song)) {
          this.pushSongToArrayToPresentOnInterface(song);
        }
      }
    });
  }

  isSongExistInArray(song) {
    return !!this.songResult.find((songItem) => songItem.id === song.id);
  }

  isTheNameMatchWithQueryValue(song, reg): boolean {
    return !!song.name.match(reg);
  }

  private pushSongToArrayToPresentOnInterface(song) {
    this.songResult.push(song);
  }

  private findNameSongInSongResult(song: IMusic) {
    return this.songResult.find((songItem) => songItem.name === song.name);
  }

  resetSongResult() {
    this.songResult = [];
  }
}
