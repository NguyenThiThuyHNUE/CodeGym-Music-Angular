import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AudioService} from '../../../service/audio.service';
import {IMusic} from '../../../interface/i-music';
import {timer} from 'rxjs';
import {SharedService} from '../../../service/shared.service';
import {MainService} from '../../../service/main.service';

const DEFAULT_VOLUME = 0.5;

@Component({
  selector: 'app-now-play',
  templateUrl: './now-play.component.html',
  styleUrls: ['./now-play.component.scss']
})
export class NowPlayComponent implements OnInit, OnChanges {
  @Input() currentSong: IMusic;
  isPlay: boolean;
  song: IMusic;
  seekBarInner: any;
  startTime: any;
  remainTime: any;
  showVolume = false;
  isRepeat = false;
  musicSrc: string;

  constructor(private audio: AudioService,
              private sharedService: SharedService,
              private mainService: MainService
  ) {
    if (!this.song) {
      this.song = {};
    }
  }

  ngOnInit() {
    this.audio.audio.volume = DEFAULT_VOLUME;
    this.audio.audio.muted = false;
  }

  ngOnChanges() {
    this.pauseMusic();
    this.musicSrc = this.currentSong.musicUrl;
    this.setAudio(this.musicSrc);
    this.setStartTime();
    this.setRemainTime();
    this.playMusic();
  }
  showListOption() {
    return this.mainService.showEtc(this.currentSong);
  }
  setAudio(musicSrc) {
    return this.audio.setAudio(musicSrc);
  }

  changeIconToPlay() {
    const timer$ = timer(2000, 3000);
    timer$.subscribe(() => {
      this.isPlay = (this.convertToSecond(this.remainTime) > 0);
    });
  }

  convertToSecond(time) {
    const validateTime = time.split(':');

    return (+validateTime[0]) * 60 + (+validateTime[1]);
  }

  setRemainTime() {
    this.audio.getTimeRemaining().subscribe(
      data => {
        this.audio.audio.loop = this.isRepeat;
        this.remainTime = data;
      }
    );
  }

  setStartTime() {
    this.audio.getTimeElapsed().subscribe(
      data => {
        this.startTime = data;
        this.seekBarInner = this.convertToSecond(data);
      }
    );
  }

  repeatSong(): boolean {
    if (!this.isRepeat) {
      return this.isRepeat = true;
    }
    return this.isRepeat = false;
  }

  playOrPause() {
    if (!this.isPlay) {
      return this.playMusic();
    }
    return this.pauseMusic();
  }

  playMusic() {
    this.isPlay = true;
    return this.audio.playAudio();
  }

  pauseMusic() {
    this.isPlay = false;
    return this.audio.pauseAudio();
  }

  scrollVolume(event) {
    this.audio.audio.volume = event.value / 10;
  }

  scrollTime(event) {
    this.audio.seekAudio(event.value);
  }

  volumeShow() {
    return this.showVolume = true;
  }

  volumeHide() {
    return this.showVolume = false;
  }
}
