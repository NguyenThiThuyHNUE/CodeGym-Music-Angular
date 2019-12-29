import {Component, Input, OnInit} from '@angular/core';
import {SongService} from '../../../service/song.service';
import {SnotifyService} from 'ng-snotify';
import {IMusic} from '../../../interface/i-music';

@Component({
  selector: 'app-heart',
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.scss']
})
export class HeartComponent implements OnInit {
  @Input() songId: number;
  isLike: boolean;
  userId = +localStorage.getItem('id');

  constructor(private songService: SongService,
              private Notify: SnotifyService) {
  }

  ngOnInit() {
  }

  clickOnIcon() {
    this.changeColorInInterface();
    console.log(this.isLike);
    // this.changeDataInServer();
  }

  private checkIconIsLikeOrUnlike() {
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
    }
    this.changeDataInToDisLike();
  }

  private handleResponse(response) {
    this.notifyForUserThatLikeASongIsSuccess();
  }

  private notifyForUserThatLikeASongIsSuccess() {
    this.Notify.success('Like a Song', {timeout: 3000});
  }

  private handleError(error: any) {
    this.notifyForUserThatIsSomeThingWrongHappen();
  }

  private notifyForUserThatIsSomeThingWrongHappen() {
    this.Notify.error('Some Thing Wrong Was Happened, Please Try Again Later', {timeout: 3000});
  }

  private changeDataInToLike() {
    this.songService.likeSong(this.userId, this.songId).subscribe((response) => {
        this.handleResponse(response);
      },
      (error) => {
        this.handleError(error);
      });
  }

  private changeDataInToDisLike() {
    this.songService.dislikeSong(this.userId, this.songId).subscribe((response) => {
        this.handleDisLikeResponse();
      },
      (error) => {
        this.handleError(error);
      });
  }

  private handleDisLikeResponse() {
    this.notifyForUserThatDisLikeASongIsSuccess();
  }

  private notifyForUserThatDisLikeASongIsSuccess() {
    this.Notify.success('DisLike a Song', {timeout: 3000});

  }
}
