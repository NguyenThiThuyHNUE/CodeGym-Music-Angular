import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../service/music.service';
import {Router} from '@angular/router';
import {IMusic} from '../../interface/iMusic';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  musicList: IMusic[] = [];

  constructor(private musicService: MusicService) {
  }

  ngOnInit() {
    this.musicService.getSong().subscribe(data => {
        this.musicList = data;
        console.log(this.musicList);
      },
      error => {
        console.log(error);
      });
  }

}
