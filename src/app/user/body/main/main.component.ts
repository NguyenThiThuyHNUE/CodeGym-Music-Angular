import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IMusic} from '../../../interface/i-music';
import {MatDialog} from '@angular/material/dialog';
import {SongService} from '../../../service/song.service';
import {SharedService} from '../../../service/shared.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  songs: IMusic[];
  newSongs: IMusic[];
  vnSongs: IMusic[];
  usSongs: IMusic[];
  songsUserHasLiked: number[];

  constructor(
    private songService: SongService,
    private shareService: SharedService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.getSongs();
    this.getNewSongs();
    this.getVnSongs();
    this.getUsSongs();
    this.getDataWhenEtcClosed();
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

  getDataWhenEtcClosed() {
    this.shareService.songDelete.subscribe((data) => {
      this.removeSongInInterface(data);
    });
  }

  removeSongInInterface(data) {
    if (this.isUsType(data.category)) {
      this.removeSongInUsArray(data);
    }
    return this.vnSongs.splice(this.vnSongs.indexOf(data), 1);
  }

  removeSongInUsArray(data) {
    return this.usSongs.splice(this.usSongs.indexOf(data), 1);
  }

  isUsType(data) {
    return data === 'US';
  }

  getVnSongs() {
    return this.songService.getVnSongs().subscribe((songs) => {
      this.handleGetVnSongs(songs);
    });
  }

  getUsSongs() {
    return this.songService.getUsSongs().subscribe((songs) => {
      this.handleGetUsSongs(songs);
    });
  }

  getSongs() {
    return this.songService.getAll().subscribe(musics => {
      this.songs = musics.data;
    });
  }

  getNewSongs() {
    return this.songService.getNewSongs().subscribe(musics => {
      this.newSongs = musics.data;
    });
  }

  handleGetVnSongs(songs) {
    this.vnSongs = songs.data.data;
  }

  handleGetUsSongs(songs) {
    this.usSongs = songs.data.data;
  }
}
