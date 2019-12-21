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
  @ViewChild('seekBarOuter', {static: false}) element: ElementRef;

  musicList: IMusic[];
  isPlay: number = 1;
  showVolume: boolean = false;
  musicSrc = 'https://firebasestorage.googleapis.com/v0/b/codegym-music.appspot.com/o/NguoiEmKhongYeu-QuangVinh-2430593.mp3?alt=media&token=903c5d4c-6b07-4481-8fcb-2c49944370de';
  startTime: any;
  remainTime: any;
  seekBarInner: any;

  constructor(private musicService: MusicService,
              private audio: AudioService,
              private elRef: ElementRef) {
  }

  ngOnInit() {
    this.setAudio(this.musicSrc);
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
    if (this.isPlay === 0) {
      this.audio.pauseAudio();
      return this.isPlay = 1;
    }
    this.audio.playAudio();
    return this.isPlay = 0;
  }

  volumeShow() {
    return this.showVolume = true
  }

  volumeHide() {
    return this.showVolume = false
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
  }

  getOffsetLeft(event) {
    console.log({
      offsetLeft: this.element.nativeElement.offsetLeft,
      offsetWidth: this.element.nativeElement.offsetWidth,
      pageX: event.pageX,
      position: event.pageX - this.element.nativeElement.offsetLeft,
    });
  }
}
