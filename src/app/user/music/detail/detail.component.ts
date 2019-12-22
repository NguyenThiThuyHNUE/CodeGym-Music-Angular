import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../../service/music.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IMusic} from '../../../interface/i-music';

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
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.musicService.getMusics().subscribe(musics => {
      this.musicDetail = musics.find(music => music.id === this.idMusic);
    });
    this.musicService.getMusics().subscribe(musics => {
      this.musicList = musics;
    });
  }

}