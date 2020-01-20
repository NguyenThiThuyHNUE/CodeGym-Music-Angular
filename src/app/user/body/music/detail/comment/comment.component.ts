import {Component, Inject, OnInit} from '@angular/core';
import {CommentService} from '../../../../../service/comment.service';
import {IComment} from '../../../../../interface/i-comment';
import {UserService} from '../../../../../service/user.service';
import {MusicService} from '../../../../../service/music.service';
import {IMusic} from '../../../../../interface/i-music';
import {SharedService} from '../../../../../service/shared.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  userId: number;
  currentSong: IMusic;
  comments: IComment [];
  isPlay = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IMusic,
              private commentService: CommentService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.setUserId();
  }

  newComment() {
    this.commentService.showFormCreateComment(this.data);
  }

  private setUserId() {
    this.userId = UserService.getUserId();
  }


  // private setMusicId() {
  //   this.userId = MusicService.getMusicId();
  //   // console.log(this.musicId);
  // }
}
