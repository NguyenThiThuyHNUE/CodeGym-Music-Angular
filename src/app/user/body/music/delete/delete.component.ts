import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../../../service/music.service';
import {IMusic} from '../../../../interface/i-music';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  song: IMusic;
  idSong: number = +this.activatedRoute.snapshot.paramMap.get('id');

  constructor(private musicService: MusicService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.musicService.getMusics().subscribe(songs => {
      this.idSong = songs.data.find(song => song.id === this.idSong);
    });
  }

  onDeleteSong() {
    this.musicService.deleteMusic(this.idSong);
  }
}
