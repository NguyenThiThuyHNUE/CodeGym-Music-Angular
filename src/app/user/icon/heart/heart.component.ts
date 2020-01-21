import {Component, Input, OnInit} from '@angular/core';
import {SongService} from '../../../service/song.service';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-heart',
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.scss']
})
export class HeartComponent implements OnInit {
  @Input() songId: number;
  @Input() songsUserHasLiked: number[];
  isLike: boolean;
  userId = +localStorage.getItem('id');

  constructor(private songService: SongService,
              private Notify: SnotifyService) {
  }

  ngOnInit() {
    this.changeColorInInterfaceWhenReceiveData();
    console.log(this.songsUserHasLiked);
  }

  changeColorInInterfaceWhenReceiveData() {
    if (this.isThisSongExistInData()) {
      return this.isLike = this.likeSong();
    }
    return this.isLike = this.disLikeSong();
  }

  isThisSongExistInData() {
    return this.songsUserHasLiked.includes(this.songId);
  }

  clickOnIcon() {
    this.changeColorInInterface();
    this.changeDataInServer();
  }

  private checkIconIsLikeOrUnlike() {
    console.log(this.songsUserHasLiked);
    return this.isLike;
  }

  private likeSong() {
    return this.isLike = true;
  }

  private disLikeSong() {
    return this.isLike = false;
  }

  private changeColorInInterface() {
    if (this.checkIconIsLikeOrUnlike()) {
      return this.disLikeSong();
    }
    return this.likeSong();
  }

  private changeDataInServer() {
    if (this.checkIconIsLikeOrUnlike()) {
      this.changeDataInToLike();
    } else {
      this.changeDataInToDisLike();
    }
  }

  private handleResponse(response) {
    this.songsUserHasLiked.push(this.songId);
    this.notifyForUserThatLikeASongIsSuccess();
  }

  private notifyForUserThatLikeASongIsSuccess() {
    this.Notify.success('Like a Song', {timeout: 3000});
  }

  private handleDisLikeError(error: any) {
    this.notifyForUserThatDisLikeIsSomeThingWrongHappen();
  }

  private handleLikeError(error: any) {
    this.notifyForUserThatLikeIsSomeThingWrongHappen();
  }

  private notifyForUserThatLikeIsSomeThingWrongHappen() {
    this.Notify.error(`Song id ${this.songId} Some Thing Wrong Was Happened When you like a song`, {timeout: 3000});
  }

  private notifyForUserThatDisLikeIsSomeThingWrongHappen() {
    this.Notify.error(`Song id ${this.songId} Some Thing Wrong Was Happened When you dislike a song`, {timeout: 3000});
  }

  private changeDataInToLike() {
    this.songService.likeSong(this.userId, this.songId).subscribe((response) => {
        this.handleResponse(response);
      },
      (error) => {
        this.handleLikeError(error);
      });
  }

  private changeDataInToDisLike() {
    this.songService.dislikeSong(this.userId, this.songId).subscribe((response) => {
        this.handleDisLikeResponse();
      },
      (error) => {
        this.handleDisLikeError(error);
      });
  }

  private handleDisLikeResponse() {
    this.notifyForUserThatDisLikeASongIsSuccess();
  }

  private notifyForUserThatDisLikeASongIsSuccess() {
    this.songsUserHasLiked.splice(this.songsUserHasLiked.indexOf(this.songId), 1);
    this.Notify.success('DisLike a Song', {timeout: 3000});

  }
}
