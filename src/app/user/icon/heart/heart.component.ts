import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SongService} from '../../../service/song.service';
import {SnotifyService} from 'ng-snotify';
import {UserService} from '../../../service/user.service';
import {SharedService} from '../../../service/shared.service';
import {PlaylistService} from '../../../service/playlist.service';

@Component({
  selector: 'app-heart',
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.scss']
})
export class HeartComponent implements OnInit, OnChanges {
  @Input() action: { type: string };
  @Input() page: string;
  @Input() songId: number;
  @Input() playlistId: number;
  @Input() songsUserHasLiked: number[];
  playlistUserHasLiked: number[];
  isLike: boolean;
  userId = UserService.getUserId();

  constructor(private songService: SongService, private playlistService: PlaylistService,
              private shareService: SharedService,
              private Notify: SnotifyService) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    if (this.action.type === 'playlist') {
      this.getPlaylistUserHasLiked();
    }
  }

  getPlaylistUserHasLiked() {
    this.playlistService.getPlaylistLiked().subscribe((response) => {
      this.handleGetPlaylistLikedResponse(response);
    });
  }

  handleGetPlaylistLikedResponse(response) {
    this.playlistUserHasLiked = response.data;
    this.distinguishActionInput();
  }

  distinguishActionInput() {
    if (this.action.type === 'playlist') {
      this.changePlaylistColorInInterfaceWhenReceiveData();
    }
    return this.changeSongColorInInterfaceWhenReceiveData();
  }

  changePlaylistColorInInterfaceWhenReceiveData() {
    if (this.isThisIdExistInData()) {
      return this.isLike = this.likeSong();
    }
    return this.isLike = this.disLikeSong();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeSongColorInInterfaceWhenReceiveData();
  }

  changeSongColorInInterfaceWhenReceiveData() {
    if (this.isThisIdExistInData()) {
      return this.isLike = this.likeSong();
    }
    return this.isLike = this.disLikeSong();
  }

  isThisIdExistInData() {
    if (this.action.type === 'playlist') {
      return this.playlistUserHasLiked.includes(this.playlistId);
    }
    return this.songsUserHasLiked.includes(this.songId);
  }

  clickOnIcon() {
    this.changeColorInInterface();
    this.changeDataInServer();
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
      this.changeDataInToLike(this.action.type);
    } else {
      this.changeDataInToDisLike(this.action.type);
    }
  }

  private handleResponse(response) {
    if (this.action.type === 'playlist') {
      return this.handlePlaylistResponse();
    }
    return this.handleSongResponse();
  }

  handleSongResponse() {
    this.songsUserHasLiked.push(this.songId);
    this.notifyForUserThatLikeASongIsSuccess('song');
  }

  handlePlaylistResponse() {
    this.notifyForUserThatLikeASongIsSuccess('playlist');
    this.playlistUserHasLiked.push(this.songId);
  }

  private notifyForUserThatLikeASongIsSuccess(type) {
    this.Notify.success(`Like a ${type}`, {timeout: 1000});
  }

  private handleDisLikeError(error: any) {
    this.notifyForUserThatDisLikeIsSomeThingWrongHappen();
  }

  private handleLikeError(error: any) {
    this.notifyForUserThatLikeIsSomeThingWrongHappen();
  }

  private notifyForUserThatLikeIsSomeThingWrongHappen() {
    this.Notify.error(`Some Thing Wrong Was Happened`, {timeout: 3000});
  }

  private notifyForUserThatDisLikeIsSomeThingWrongHappen() {
    this.Notify.error(`Some Thing Wrong Was Happened`, {timeout: 3000});
  }

  private changeDataInToLike(type) {
    if (type === 'playlist') {
      return this.changePlaylistToLike();
    }
    return this.changeSongInToLike();
  }

  changePlaylistToLike() {
    this.playlistService.likePlaylist(this.playlistId).subscribe((response) => {
        this.handleResponse(response);
      },
      (error) => {
        this.handleLikeError(error);
      });
  }

  changePlaylistToDisLike() {
    this.playlistService.DislikePlaylist(this.playlistId).subscribe((response) => {
        this.handleDisLikeResponse(response);
      },
      (error) => {
        this.handleLikeError(error);
      });
  }

  changeSongInToLike() {
    this.songService.likeSong(this.userId, this.songId).subscribe((response) => {
        this.handleResponse(response);
      },
      (error) => {
        this.handleLikeError(error);
      });
  }

  changeSongInToDisLike() {
    this.songService.dislikeSong(this.userId, this.songId).subscribe((response) => {
        this.handleDisLikeResponse(response);
      },
      (error) => {
        this.handleDisLikeError(error);
      });
  }

  private changeDataInToDisLike(type) {
    if (type === 'playlist') {
      return this.changePlaylistToDisLike();
    }
    return this.changeSongInToDisLike();
  }

  private handleDisLikeResponse(response) {
    this.notifyForUserThatDisLikeASongIsSuccess();
  }

  private notifyForUserThatDisLikeASongIsSuccess() {
    this.songsUserHasLiked.splice(this.songsUserHasLiked.indexOf(this.songId), 1);
    this.Notify.success('DisLike a Song', {timeout: 1000});

  }


}
