import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {IMusic} from '../../../../../interface/i-music';
import {MusicService} from '../../../../../service/music.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AudioService} from '../../../../../service/audio.service';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit, OnChanges {
  @Input() nowPlaying: IMusic;
  // tslint:disable-next-line:max-line-length
  musicSrc = 'https://firebasestorage.googleapis.com/v0/b/codegym-music-d1055.appspot.com/o/music%2FReal%20Friends%20-%20Camila%20Cabello%20(NhacPro.net).mp3?alt=media&token=b01da520-9303-4290-b551-e58dff7e0741';
  showVolume = false;
  startTime: any;
  remainTime: any;
  seekBarInner: any;
  isRepeat = false;
  songs: IMusic[];
  isPlay = true;

  constructor(private musicService: MusicService,
              private audio: AudioService,
              private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    console.log(this.nowPlaying.name);
    console.log(this.musicSrc);
    this.getCurrentSong();
    this.setAudio(this.musicSrc);
    this.audio.audio.volume = 0.5;
    this.setStartTime();
    this.setRemainTime();
    this.getSongs();
    this.playMusic();
  }

  getCurrentSong() {
    if (this.nowPlaying) {
      this.musicSrc = this.nowPlaying.musicUrl;
    }
  }

  getSongs() {
    return this.musicService.getMusics().subscribe(musics => {
      this.songs = musics.data;
    });
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

  convertToSecond(time) {
    const validateTime = time.split(':');

    return (+validateTime[0]) * 60 + (+validateTime[1]);
  }

  setAudio(musicSrc) {
    return this.audio.setAudio(musicSrc);
  }

  repeatSong(): boolean {
    if (!this.isRepeat) {
      return this.isRepeat = true;
    }
    return this.isRepeat = false;
  }

  scrollVolume(event) {
    this.audio.audio.volume = event.value / 10;
  }

  volumeShow() {
    return this.showVolume = true;
  }

  volumeHide() {
    return this.showVolume = false;
  }

  scrollTime(event) {
    this.audio.seekAudio(event.value);
  }

  playMusic() {
    if (!this.isPlay) {
      this.audio.pauseAudio();
      return this.isPlay = true;
    }
    this.audio.playAudio();
    return this.isPlay = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getCurrentSong();
    this.ngOnInit();
  }
}
