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

  musicDetail: IMusic;
  musicList: IMusic[];
  idMusic: number = +this.activatedRoute.snapshot.paramMap.get('id');

  constructor(private musicService: MusicService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnInit() {
    this.musicService.getMusics().subscribe(musics => {
      this.musicList = musics.data;
      this.musicDetail = musics.data.find(music => music.id === this.idMusic);
    });
    // this.musicService.getMusics().subscribe(musics => {
    //   this.musicList = musics.data;
    // });
    this.getCurrentUrl();
  }

  getCurrentUrl() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.idMusic = +this.activatedRoute.snapshot.paramMap.get('id');
        console.log(this.idMusic);
        this.getMusics();
      }
    });
  }

  getMusics() {
    this.musicService.getMusics().subscribe(musics => {
      this.musicDetail = musics.data.find(music => music.id === this.idMusic);
    });
  }
}
