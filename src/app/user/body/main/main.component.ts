import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
/* tslint:disable */
import {MusicService} from '../../../service/music.service';
import {IMusic} from '../../../interface/i-music';
import {AudioService} from '../../../service/audio.service';
import {Observable} from 'rxjs';
import {MatSliderChange} from '@angular/material';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PlaylistComponent} from '../info/playlist/playlist.component';
import {EtcComponent} from './etc/etc.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  songs: IMusic[];
  inputSongId: number;
  isRepeat = false;
  musicList: {
    data: any
  };
  isPlay = true;
  showVolume = false;
  // tslint:disable-next-line:max-line-length

  // musicSrc = 'https://firebasestorage.googleapis.com/v0/b/codegym-music-d1055.appspot.com/o/music%2FReal%20Friends%20-%20Camila%20Cabello%20(NhacPro.net).mp3?alt=media&token=b01da520-9303-4290-b551-e58dff7e0741';
  startTime: any;
  remainTime: any;
  seekBarInner: any;

  constructor(private musicService: MusicService,
              public dialog: MatDialog,
              private audio: AudioService,
              private elRef: ElementRef) {
  }

  ngOnInit() {
    this.audio.audio.volume = 0.5;
    this.setStartTime();
    this.setRemainTime();
    this.getSongs();
  }

  getSongs() {
    return this.musicService.getMusics().subscribe(musics => {
      this.songs = musics.data;
    });
  }

  setStartTime() {
    this.audio.getTimeElapsed().subscribe(
      data => {
        this.startTime = data;
        this.seekBarInner = this.convertToSecond(data);
      }
    );
  }

  setRemainTime() {
    this.audio.getTimeRemaining().subscribe(
      data => {
        this.audio.audio.loop = this.isRepeat;
        this.remainTime = data;
      }
    );
  }

  convertToSecond(time) {
    const validateTime = time.split(':');

    return (+validateTime[0]) * 60 + (+validateTime[1]);
  }

  showEtc(songId) {
    this.inputSongId = songId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = songId;
    this.dialog.open(EtcComponent, dialogConfig);
  }
}
