import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
/* tslint:disable */
import {MusicService} from '../../../service/music.service';
import {IMusic} from '../../../interface/i-music';
import {AudioService} from '../../../service/audio.service';
import {Observable} from 'rxjs';
import {MatSliderChange} from '@angular/material';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PlaylistComponent} from '../info/playlist/playlist.component';
import {EtcComponent} from './etc/etc.component';
import {SongService} from '../../../service/song.service';
import {MainService} from '../../../service/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  songs: IMusic[];
  playIcon: boolean;
  newSongs: IMusic[];
  vnSongs: IMusic[];
  usSongs: IMusic[];

  constructor(
    private songService: SongService,
    private mainService: MainService,
  ) {
  }

  ngOnInit() {
    this.getSongs();
    this.getNewSongs();
    this.getVnSongs();
    this.getUsSongs();
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
    console.log(songs);
  }

  handleGetUsSongs(songs) {
    this.usSongs = songs.data.data;
    console.log(songs);
  }
}
