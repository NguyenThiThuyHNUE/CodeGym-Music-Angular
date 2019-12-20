import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AudioService} from '../../../service/audio.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('seekBarOuter', {static: false}) element: ElementRef;

  isPlay = true;
  showVolume = false;
  // tslint:disable-next-line:max-line-length
  musicSrc = 'https://firebasestorage.googleapis.com/v0/b/codegym-music.appspot.com/o/NguoiEmKhongYeu-QuangVinh-2430593.mp3?alt=media&token=903c5d4c-6b07-4481-8fcb-2c49944370de';
  startTime: any;
  remainTime: any;
  seekBarInner: any;

  constructor(private audio: AudioService, private elRef: ElementRef) {
  }

  ngOnInit() {
    this.setAudio(this.musicSrc);
    this.setStartTime();
    this.setRemainTime();

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

  getOffsetLeft(event) {
    const offsetWidth = this.element.nativeElement.offsetWidth;
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

}
