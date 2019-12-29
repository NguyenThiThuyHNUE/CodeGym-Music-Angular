import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
/* tslint:disable */
import {MusicService} from '../../../service/music.service';
import {IMusic} from '../../../interface/i-music';
import {AudioService} from '../../../service/audio.service';
import {Observable} from 'rxjs';
import {MatSliderChange} from '@angular/material';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PlaylistComponent} from '../info/playlist/playlist.component';
import {EtcComponent} from './etc/etc.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  songs: IMusic[];
  private inputSongId: any;

  constructor(private musicService: MusicService,
              public dialog: MatDialog,
              private audio: AudioService,
              private elRef: ElementRef) {
  }

  ngOnInit() {
    this.getSongs();
  }

  getSongs() {
    return this.musicService.getMusics().subscribe(musics => {
      this.songs = musics.data;
      console.log(this.songs);
    });
  }

  showEtc(songId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = songId;
    this.dialog.open(EtcComponent, dialogConfig);
  }
}
