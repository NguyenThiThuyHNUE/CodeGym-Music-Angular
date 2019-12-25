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
  @ViewChild('seekBarVolumeOuter', {static: false}) seekBarVolumeOuter: ElementRef;

  isRepeat = false;
  musicList: {
    data: any
  };
  isPlay = true;
  showVolume = false;
  // tslint:disable-next-line:max-line-length

  musicSrc = 'https://firebasestorage.googleapis.com/v0/b/codegym-music.appspot.com/o/NguoiEmKhongYeu-QuangVinh-2430593.mp3?alt=media&token=903c5d4c-6b07-4481-8fcb-2c49944370de';
  startTime: any;
  remainTime: any;
  seekBarInner: any;
  volumePercent = '50%';

  constructor(private musicService: MusicService,
              public dialog: MatDialog,
              private audio: AudioService,
              private elRef: ElementRef) {
  }

  ngOnInit() {
    this.setAudio(this.musicSrc);
    this.audio.audio.volume = 0.5;
    this.setStartTime();
    this.setRemainTime();
    this.musicService.getMusics().subscribe(music => {
      this.musicList = music.data;
    });
  }

  setAudio(musicSrc) {
    return this.audio.setAudio(musicSrc);
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

  playMusic() {
    if (!this.isPlay) {
      this.audio.pauseAudio();
      return this.isPlay = true;
    }
    this.audio.playAudio();
    return this.isPlay = false;
  }

  volumeShow() {
    return this.showVolume = true;
  }

  volumeHide() {
    return this.showVolume = false;
  }

  convertToSecond(time) {
    const validateTime = time.split(':');

    return (+validateTime[0]) * 60 + (+validateTime[1]);
  }


  repeatSong(): boolean {
    if (!this.isRepeat) {
      return this.isRepeat = true;
    }
    return this.isRepeat = false;
  }

  scrollTime(event) {
    this.audio.seekAudio(event.value);
  }

  scrollVolume(event) {
    this.audio.audio.volume = event.value / 10;
    console.log(this.audio.audio.volume);
  }

  showEtc() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '30%';
      this.dialog.open(EtcComponent, dialogConfig);
  }
}
