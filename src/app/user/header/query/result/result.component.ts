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
  songResult: [];

  constructor(private songService: MusicService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getSongsInServer();
  }

  getSongsInServer() {
    this.songService.getMusics().subscribe((response) => {
      this.handleResponse(response);
    });
  }

  handleResponse(response) {
    this.songs = response.data;
    this.getSongsInArray();  }

  getSongsInArray() {
    this.songs.forEach((song) => {
      const reg = new RegExp(this.queryValue, 'gi');
      console.log(song.name.match(reg));
    });
  }
}
