import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MusicService} from '../../../../service/music.service';
import {IMusic} from '../../../../interface/i-music';
import {SharedService} from '../../../../service/shared.service';
import {SingerService} from '../../../../service/singer.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnChanges {
  @Input() queryValue: string;
  songs: IMusic[];
  songResult = [];
  singers: any;
  singerResult = [];

  constructor(private songService: MusicService, private singerService: SingerService,
              private shareService: SharedService) {
  }

  ngOnInit() {
    this.resetSongResult();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resetSongResult();
    this.getSongsFromServerAndPutToArray();
    this.getSingersFromServerAndPutToArray();
  }

  listenSong(song) {
    this.shareService.currentSongChange(song);
  }

  getSongsFromServerAndPutToArray() {
    this.songService.getMusics().subscribe((response) => {
      this.handleResponse(response);
    });
  }

  getSingersFromServerAndPutToArray() {
    this.singerService.getSingers().subscribe((response) => {
      this.handleGetSingerResponse(response);
    });
  }

  handleResponse(response) {
    this.songs = response.data;
    this.getSongsInArray();
  }

  handleGetSingerResponse(response) {
    this.singers = response.data;
    this.getSingersInArray();
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

  getSingersInArray() {
    this.singers.forEach((singer) => {
      const reg = new RegExp(this.queryValue, 'gi');
      if (this.isTheNameMatchWithQueryValue(singer, reg)) {
        if (!this.isSingerExistInArray(singer)) {
          this.pushSingerToArrayToPresentOnInterface(singer);
        }
      }
    });
  }

  isSongExistInArray(song) {
    return !!this.songResult.find((songItem) => songItem.id === song.id);
  }
  isSingerExistInArray(singer) {
    return !!this.singerResult.find((singerItem) => singerItem.id === singer.id);
  }

  isTheNameMatchWithQueryValue(value, reg): boolean {
    return !!value.name.match(reg);
  }

  private pushSongToArrayToPresentOnInterface(song) {
    this.songResult.push(song);
  }

  private pushSingerToArrayToPresentOnInterface(singer) {
    this.singerResult.push(singer);
  }

  private findNameSongInSongResult(song: IMusic) {
    return this.songResult.find((songItem) => songItem.name === song.name);
  }

  resetSongResult() {
    this.songResult = [];
  }

  showSingerInfo(singer) {
    this.singerService.showSingerInfo(singer);
  }
}
