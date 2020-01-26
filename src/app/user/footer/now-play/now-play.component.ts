import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
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
  @Output() isStop = new EventEmitter<boolean>();
  isPlay: boolean;
  song: IMusic;
  seekBarInner: any;
  startTime: any;
  remainTime: any;
  showVolume = false;
  isRepeat = false;
  musicSrc: string;
  nextSong = false;

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
    console.log('now play');
    this.resetCurrentSong();
    this.musicSrc = this.currentSong.file;
    this.setAudio(this.musicSrc);
    this.setStartTime();
    this.setRemainTime();
    this.playMusic();
  }

  resetCurrentSong() {
    this.pauseMusic();
    this.audio.setAudio(null);
    this.audio.audio.load();
  }

  isSongEnded() {
    return this.audio.audio.ended;
  }

  showListOption() {
    return this.mainService.showEtc(this.currentSong);
  }

  setAudio(musicSrc) {
    return this.audio.setAudio(musicSrc);
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
        if (this.checkConditionToNextSong(data)) {
          this.isStop.emit(true);
          this.nextSong = true;
        }
      }
    );
  }

  checkConditionToNextSong(data) {
    return this.convertToSecond(data) === 0 && this.convertToSecond(this.startTime) > 0 && !this.nextSong;
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
    const isPlaying = !this.makeSureSongIsNotPlayed;
    if (!isPlaying) {
      this.showIconPlay();
      this.setFlatValue();
      return this.audio.playAudio();
    }
  }

  makeSureSongIsNotPlayed() {
    return this.convertToSecond(this.remainTime) > 0 && !this.audio.audio.paused && !this.audio.audio.ended;
  }

  setFlatValue() {
    this.nextSong = false;
  }

  showIconPlay() {
    this.isPlay = true;
  }

  pauseMusic() {
    this.hideIconPlay();
    return this.audio.pauseAudio();
  }

  hideIconPlay() {
    this.isPlay = false;
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
