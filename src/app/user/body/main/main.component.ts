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

  constructor(
    private songService: SongService,
    private mainService: MainService,
  ) {
  }

  ngOnInit() {
    this.getSongs();
  }

  getSongs() {
    return this.songService.getAll().subscribe(musics => {
      this.songs = musics.data;
    });
  }

  showEtc(songId) {
    this.mainService.showEtc(songId);
  }

  hidePlayIcon() {
    return this.playIcon = false;
  }

  showPlayIcon() {
    return this.playIcon = true;
  }
}
