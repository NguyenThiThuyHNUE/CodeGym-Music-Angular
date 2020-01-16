import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../../../service/music.service';
import {ActivatedRoute, Event, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {IMusic} from '../../../../interface/i-music';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  song: IMusic;
  songs: IMusic[];
  idSong: number = +this.activatedRoute.snapshot.paramMap.get('id');


  constructor(private musicService: MusicService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.musicService.getMusics().subscribe(songs => {
      this.songs = songs.data;
      this.song = songs.data.find(song => song.id === this.idSong);
      // this.idSong = this.song.id;
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
}
