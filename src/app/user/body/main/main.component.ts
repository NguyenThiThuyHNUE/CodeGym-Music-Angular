import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isPlay: number = 1;
  showVolume: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  playMusic() {
    if (this.isPlay == 0) {
      return this.isPlay = 1;
    }
    return this.isPlay = 0;
  }

  volumeShow() {
    return this.showVolume = true
  }

  volumeHide() {
    return this.showVolume = false
  }
}
