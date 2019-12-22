/* tslint:disable */
import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {MusicService} from '../../../service/music.service';
import {IMusic} from '../../../interface/i-music';
import {AudioService} from '../../../service/audio.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('seekBarOuter', {static: false}) outerSeekBarEle: ElementRef;
  @ViewChild('seekBarVolumeOuter', {static: false}) seekBarVolumeOuter: ElementRef;

  musicList: IMusic[];
  isPlay: number = 1;
  showVolume: boolean = false;
  musicSrc = 'https://firebasestorage.googleapis.com/v0/b/codegym-music.appspot.com/o/NguoiEmKhongYeu-QuangVinh-2430593.mp3?alt=media&token=903c5d4c-6b07-4481-8fcb-2c49944370de';
  startTime: any;
  remainTime: any;
  seekBarInner: any;
  volumePercent = '50%';

  constructor(private musicService: MusicService,
              private audio: AudioService,
              private elRef: ElementRef) {
  }

  ngOnInit() {
    this.setAudio(this.musicSrc);
    this.audio.audio.volume = 0.5;
    this.setStartTime();
    this.setRemainTime();
    this.musicService.getMusics().subscribe(music => {
      this.musicList = music;
    });
  }

  setAudio(musicSrc) {
    return this.audio.setAudio(musicSrc);
  }

  setStartTime() {
    this.audio.getTimeElapsed().subscribe(
      data => {
        this.startTime = data;
        this.seekBarInner = this.seekBarPercent(data).toFixed(2) + '%';
        this.volumePercent = this.audio.audio.volume * 100 + '%';
      }
    );
  }

  setRemainTime() {
    this.audio.getTimeRemaining().subscribe(
      data => {
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

  private seekBarPercent(data) {
    const currentTime = this.convertToSecond(data);
    return currentTime / this.audio.getDuration() * 100;
  }

  clickSeekBar(event) {
    let offsetLeft = 0;
    let innerWidth = 0;
    let el = event.target;

    while (el) {
      offsetLeft += el.offsetLeft;
      innerWidth = el.offsetWidth;

      el = el.parentElement;
    }

    const seekPosition = offsetLeft - event.pageX;
    console.log({offsetLeft: offsetLeft});
    console.log({seekPosition: seekPosition});
    console.log({innerWidth: innerWidth});
    console.log({pageX: event.pageX});
    console.log({currentTime: seekPosition * this.audio.getDuration() / innerWidth});

    return {offsetLeft: offsetLeft};
    
  getTimeOnClick(event) {
    const offsetWidth = this.outerSeekBarEle.nativeElement.offsetWidth;
    const pageX = event.pageX;
    const position = (pageX - 750) / offsetWidth * 100;
    const timeOnClick = position * this.audio.getDuration() / 100;
    this.audio.seekAudio(timeOnClick);
    console.log({
      offsetWidth,
      pageX,
      position,
      timeOnClick
    });
  }

  getVolumeOnClick(event) {
    const offsetHeight = this.seekBarVolumeOuter.nativeElement.offsetHeight;
    const pageY = event.pageY;
    this.audio.audio.volume = (2830 - pageY) / offsetHeight;
    this.volumePercent = this.audio.audio.volume * 100 + '%';
    console.log({
      volume: this.volumePercent,
      offsetHeight,
      pageY
    });
  }
}
