import {Component, OnInit} from '@angular/core';
import {SongService} from '../../../../service/song.service';
import {IMusic} from '../../../../interface/i-music';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  newSongs: IMusic[];

  constructor(private songService: SongService) {
  }

  ngOnInit() {
    this.getNewSongs();
  }

  getNewSongs() {
    return this.songService.getUserSongs().subscribe(musics => {
      console.log(musics);
      this.newSongs = musics.data;
    });
  }
}
