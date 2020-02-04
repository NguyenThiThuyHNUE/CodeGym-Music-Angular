import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMusic} from '../../../../../interface/i-music';
import {SongService} from '../../../../../service/song.service';

@Component({
  selector: 'app-list-tracks',
  templateUrl: './list-tracks.component.html',
  styleUrls: ['./list-tracks.component.scss']
})
export class ListTracksComponent implements OnInit {
  list: IMusic[];
  @Input() getSongOf: { who: string; id: number };
  @Output() action = new EventEmitter<{ action: string, data: IMusic }>();
  song: IMusic;
  page = 'list';
  songsUserHasLiked: number[];

  constructor(private songService: SongService) {
  }

  ngOnInit() {
    this.getSongs();
    this.getSongsUserHasLiked();
  }

  getSongsUserHasLiked() {
    this.songService.getSongsUserHasLiked().subscribe((response) => {
      this.handleGetSongsUserHasLikedResponse(response);
    });
  }

  handleGetSongsUserHasLikedResponse(response) {
    this.songsUserHasLiked = response.data;
  }

  getSongs() {
    if (this.getSongOf.who === 'singer') {
      return this.getSingerSongs();
    }
    return this.getUserSongs();
  }

  getSingerSongs() {
    this.songService.getSingerSongs(this.getSongOf.id).subscribe((response) => {
      this.list = response.data;
    });
  }

  getUserSongs() {
    this.songService.getUserSongs().subscribe((response) => {
      this.list = response.data.songs;
    });
  }

  listenSong(song: IMusic) {
    this.action.emit({action: 'listen', data: song});
  }

  editSong(song: IMusic) {
    this.action.emit({action: 'edit', data: song});
  }

  deleteSong(song: IMusic) {
    this.action.emit({action: 'delete', data: song});
  }
}
