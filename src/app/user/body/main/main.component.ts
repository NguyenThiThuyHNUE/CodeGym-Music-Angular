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
  topViewsSongs: IMusic[];
  favoriteSongs: IMusic[];
  songsUserHasLiked: number[];
  indexOfSong: number = null;

  constructor(
    private songService: SongService,
    private shareService: SharedService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.getAllSongs();
    this.getDataWhenEtcClosed();
    this.getSongsUserHasLiked();
    this.isLoginChange();
  }

  isLoginChange() {
    this.shareService.isLoginEmitted.subscribe((isLogin) => {
      this.getSongsUserHasLiked();
    });
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
    this.doUserDeleteSong();
    this.doUserEditSong();
  }

  doUserEditSong() {
    this.shareService.songUpdateEmitted.subscribe((data: { oldSong: IMusic, newSong: IMusic }) => {
      this.getAllSongs();
    });
  }

  getAllSongs() {
    this.getSongs();
    this.getNewSongs();
    this.getTopViewsSong();
    this.getVnSongs();
    this.getUsSongs();
    this.getFavoriteSongs();
  }

  doUserDeleteSong() {
    this.shareService.songDeleteEmitted.subscribe((data) => {
      this.getAllSongs();
    });
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
      this.newSongs = musics.data.data;
    });
  }

  getTopViewsSong() {
    return this.songService.getTopViewsSongs().subscribe(musics => {
      this.topViewsSongs = musics.data.data;
    });
  }

  getFavoriteSongs() {
    return this.songService.getFavoriteSongs().subscribe(musics => {
      this.favoriteSongs = musics.data;
    });
  }

  handleGetVnSongs(songs) {
    this.vnSongs = songs.data.data;
  }

  handleGetUsSongs(songs) {
    this.usSongs = songs.data.data;
  }
}
