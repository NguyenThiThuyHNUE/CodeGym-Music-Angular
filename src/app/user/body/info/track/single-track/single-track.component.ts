import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMusic} from '../../../../../interface/i-music';
import {SharedService} from '../../../../../service/shared.service';

@Component({
  selector: 'app-single-track',
  templateUrl: './single-track.component.html',
  styleUrls: ['./single-track.component.scss']
})
export class SingleTrackComponent implements OnInit {
  @Output() action = new EventEmitter<{ action: string, data: IMusic }>();
  @Input() songsUserHasLiked: number[];
  clickLikeOrDisLike = false;
  @Input() song: IMusic;
  @Input() getSongOf: { who: string; id: number };
  hidePlaylist = false;

  constructor(private shareService: SharedService) {
  }

  ngOnInit() {
  }

  listenMiniList(event) {
    if (event.action === 'close') {
      this.hidePlaylist = false;
    }
  }

  editSong(song: IMusic) {
    this.action.emit({action: 'edit', data: song});
  }

  deleteSong(song: IMusic) {
    this.action.emit({action: 'delete', data: song});
  }

  addPlaylist(song) {
    this.hidePlaylist = true;
  }

  likeOrDisLikeSong(song) {
    this.action.emit({action: 'likeOrDislike', data: song});
  }

  listenSong(song: IMusic) {
    this.action.emit({action: 'listen', data: song});
  }
}
