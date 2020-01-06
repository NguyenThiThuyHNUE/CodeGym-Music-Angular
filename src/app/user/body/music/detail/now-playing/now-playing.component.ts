import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {IMusic} from '../../../../../interface/i-music';
import {MusicService} from '../../../../../service/music.service';
import {ActivatedRoute, Event, NavigationEnd, Router} from '@angular/router';
import {AudioService} from '../../../../../service/audio.service';
import {timer} from 'rxjs';
import {AuthGuard} from '../../../../../gurad/auth.guard';
import {canActivate} from '@angular/fire/auth-guard';
import {UserService} from '../../../../../service/user.service';

const DEFAULT_VOLUME = 0.5;

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit, OnChanges {
  @Input() nowPlaying: IMusic;
  musicSrc: string;
  showVolume = false;
  startTime: any;
  remainTime: any;
  seekBarInner: any;
  isRepeat = false;
  isPlay = true;
  pageLoad = 0;
  song: IMusic;
  songs: IMusic[];
  idSong: number = +this.activatedRoute.snapshot.paramMap.get('id');

  constructor(private musicService: MusicService,
              private audio: AudioService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.musicService.getMusics().subscribe(songs => {
      this.songs = songs.data;
      this.song = songs.data.find(song => song.id === this.idSong);
    });
    this.getCurrentUrl();
  }

  getCurrentUrl() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.idSong = +this.activatedRoute.snapshot.paramMap.get('id');
        this.getMusics();
      }
    });
  }

  getMusics() {
    this.musicService.getMusics().subscribe(songs => {
      this.song = songs.data.find(song => song.id === this.idSong);
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.getCurrentSong();
    this.audio.audio.volume = DEFAULT_VOLUME;
    this.setStartTime();
    this.setRemainTime();
    this.audio.audio.muted = false;
    this.audio.audio.autoplay = false;
    this.changeIconToPlay();
  }

  getCurrentSong() {
    if (this.nowPlaying.musicUrl) {
      this.isPlay = false;
      this.musicSrc = this.nowPlaying.musicUrl;
      this.setAudio(this.musicSrc);
    }
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
    this.audio.audio.preload = 'none';
    this.audio.playAudio();
    return this.isPlay = false;
  }

  changeIconToPlay() {
    const timer$ = timer(2000, 5000);
    timer$.subscribe(() => {
      if (!(this.convertToSecond(this.remainTime) > 0)) {
        console.log(this.seekBarInner);
        this.isPlay = true;
      }
    });
  }

  onClick(idSong) {
    if (this.userService.isLoggedIn()) {
      if (confirm('Delete ! Are You Sure ?') === true) {
        return this.musicService.deleteMusic(idSong).subscribe(response => {
          this.router.navigate([`/home/music/detail/${this.idSong}`]).then(() => alert(response.message));
        });
      } else {
        this.router.navigate([`/home/music/detail/${this.idSong}`]).then();
      }
    } else {
      this.router.navigate([`/home/music/detail/${this.idSong}`]).then(() => {
        return alert('Please! You need to login to use this feature.');
      });
    }
  }

  onClickEdit() {
    if (this.userService.isLoggedIn()) {
      return this.musicService.editMusic;
    } else {
      this.router.navigate([`/home/music/detail/${this.idSong}`]).then(() => {
        return alert('Please ! You need to login to use this feature !');
      });
    }
  }
}
