import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PlaylistComponent} from '../../info/playlist/playlist.component';
import {MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Inject} from '@angular/core';
import {MainService} from '../../../../service/main.service';
import {IMusic} from '../../../../interface/i-music';
import {CommentService} from '../../../../service/comment.service';
import {UserService} from '../../../../service/user.service';
import {SnotifyService} from 'ng-snotify';
import {PlaylistService} from '../../../../service/playlist.service';
import {Playlist} from '../../../../interface/playlist';
import {InfoService} from '../../../../service/info.service';
import {NewComponent} from '../../info/playlist/new/new.component';
import {SharedService} from '../../../../service/shared.service';
import {FormBuilder} from '@angular/forms';
import {UploadService} from '../../../../service/upload.service';
import {finalize} from 'rxjs/operators';
import {SongService} from '../../../../service/song.service';

@Component({
  selector: 'app-etc',
  templateUrl: './etc.component.html',
  styleUrls: ['./etc.component.scss'], encapsulation: ViewEncapsulation.None
})
export class EtcComponent implements OnInit {
  @ViewChild('commentTextArea', {static: false}) el: ElementRef;
  isClick: boolean;
  comments: any[];
  isPage = 'comments';
  playlists: Playlist[];
  imgDisplayInInterfaceSrc = '../../../../../assets/img/bg-img/bg-7.jpg';
  updateForm: any;
  selectFileImg: File = null;
  oldSongImage: string;
  singers: string;
  singerUserHasChose: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public song: IMusic,
    public dialog: MatDialog,
    private playListService: PlaylistService,
    private sharedService: SharedService,
    private infoService: InfoService,
    private Notify: SnotifyService,
    private uploadService: UploadService,
    private fb: FormBuilder,
    private mainService: MainService,
    private commentService: CommentService,
    private songService: SongService,
    private dialogRef: MatDialogRef<EtcComponent>
  ) {
  }

  ngOnInit() {
    this.getSongComments();
    this.getUserPlaylists();
    this.setIsClickFalse();
    this.declareData();
  }

  deleteSong() {
    this.songService.delete(this.song.id).subscribe((response) => {
      this.handleDeleteSongResponse(response);
    });
  }

  handleDeleteSongResponse(response) {
    this.Notify.success(response.message, {timeout: 1000});
    this.sharedService.songDeleteChange(this.song);
    this.dialogRef.close();
  }

  showDeleteField() {
    this.isPage = 'delete';
  }

  singersValue() {
    this.singers = '';
  }

  clickOption(value: string) {
    if (this.isSingersExist()) {
      return this.handleNewSingerIsChose(value);
    }
    return this.handleNewSingerIsAssigned(value);
  }

  handleNewSingerIsAssigned(value) {
    this.singerUserHasChose.push(value);
    this.singers += value;
    return this.updateForm.value.newSinger = this.singers;
  }

  handleNewSingerIsChose(value) {
    if (!this.doesUserChooseSingerAgain(value)) {
      this.handleSingerIsNotDuplicate(value);
    }
    return;
  }

  handleSingerIsNotDuplicate(value) {
    this.singerUserHasChose.push(value);
    this.singers += `, ${value}`;
    return this.updateForm.value.newSinger = this.singers;
  }

  doesUserChooseSingerAgain(value) {
    return !!this.singerUserHasChose.includes(value);
  }

  isSingersExist() {
    return !!this.singers;
  }

  songUpdate() {
    if (this.isUpdateImage()) {
      this.setUpFileImageInUploadService();
      this.startUpload();
      return this.getCallBack();
    }
    return this.startUpdateSong();
  }

  startUpdateSong() {
    this.songService.edit(this.song.id, this.updateForm.value)
      .subscribe((response) => {
        this.handleUpdateResponse(response);
      });
  }

  handleUpdateResponse(response) {
    this.Notify.success(response.message, {timeout: 1000});
  }

  getCallBack() {
    this.uploadService.taskUploadImg.snapshotChanges().pipe(
      finalize(() => {
        this.getImgDownloadUrl(this.uploadService.fireRefImg);
      })).subscribe();
  }

  getImgDownloadUrl(fireRefImg) {
    fireRefImg.getDownloadURL().subscribe((url) => {
      this.setUrlImgInUpdateForm(url);
      this.startUpdateSong();
    });
  }

  setUrlImgInUpdateForm(url) {
    this.oldSongImage = url;
  }

  startUpload() {
    this.uploadService.startUpload(true);
  }

  setUpFileImageInUploadService() {
    this.uploadService.setSelectFileImg(this.selectFileImg);
  }

  isUpdateImage() {
    return this.selectFileImg !== null;
  }

  onSelectFileImg(event) {
    this.selectFileImg = event.target.files[0] as File;
  }

  declareData() {
    this.updateForm = this.fb.group({ // Form update
      songId: this.song.id,
      newName: [''],
      newSinger: [''],
      newImage: [''],
    });
    this.singerUserHasChose = [];
    this.singersValue();
  }

  showEditField() {
    return this.isPage = 'edit';
  }

  showSongsInPlaylist(playlistId) {
    this.infoService.showSongsInPlaylist(playlistId, this.playlists);
  }

  listenCreateDialogWhenClosed() {
    this.sharedService.playlistNameEmitted.subscribe((playlistData) => {
      this.createPlaylistInServer(playlistData);
      this.sharedService.resetEmitted();
    });
  }

  createPlaylistInServer(playlistData) {
    return this.playListService.createPlaylist(playlistData)
      .subscribe((response) => {
        this.handleCreatePlaylistResponse(response);
      });
  }

  handleCreatePlaylistResponse(response) {
    this.notifyForUser(response);
    this.pushDataToInterface(response);
  }

  pushDataToInterface(response) {
    this.playlists.push(response.data);
  }

  notifyForUser(response) {
    this.Notify.success(`${response.message}`, {timeout: 1000});
  }

  showFormCreatePlaylist() {
    this.infoService.showPlaylistCreateForm();
    this.listenCreateDialogWhenClosed();
  }

  getUserPlaylists() {
    this.playListService.getPlaylists(UserService.getUserId()).subscribe((response) => {
      this.handleGetPlaylistsResponse(response);
    });
  }

  handleGetPlaylistsResponse(response) {
    this.playlists = response.data;
  }

  addSongToPlaylist(playlistId) {
    this.playListService.setUpDataSongToPutToPlaylist(playlistId, this.song.id);
    this.playListService.putSongToPlaylist()
      .subscribe((response) => {
        this.handleAddSongToPlaylistResponse(response);
      });
  }

  handleAddSongToPlaylistResponse(response) {
    this.Notify.success(response.message, {timeout: 1000});
  }

  getSongComments() {
    this.commentService.getAllCommentOfSong(this.song.id).subscribe((response) => {
      this.handleGetCommentsResponse(response);
    });
  }

  handleGetCommentsResponse(response) {
    this.comments = response.data;
  }

  setIsClickFalse() {
    return this.isClick = false;
  }

  setIsClickTrue() {
    return this.isClick = true;
  }

  getValueFromCommentTextArea(content) {
    if (!this.isContentNull(content)) {
      return;
    }
    return this.startSendDataToServer(content);
  }

  startSendDataToServer(content) {
    this.commentService.create(this.setUpData(content)).subscribe((response) => {
      this.handleResponseCreateComment(response);
    }, error => {
      this.handleErrorCreateComment(error);
    });
    this.pushNewCommentToInterface(this.setUpDataToPushInterface(content));
    return this.setIsClickTrue();
  }

  handleErrorCreateComment(error) {
    console.log(error);
  }

  handleResponseCreateComment(response) {
    this.Notify.success(response.message, {timeout: 1000});
    this.resetValueInTextArea();
    this.setIsClickFalse();
  }

  pushNewCommentToInterface(data) {
    return this.comments.push(data);
  }

  setUpDataToPushInterface(content) {
    return {
      comment: content,
      user: {name: UserService.getUserName()}
    };
  }

  resetValueInTextArea() {
    this.el.nativeElement.value = '';
  }

  setUpData(content) {
    return {
      userId: UserService.getUserId(),
      songId: this.song.id,
      contentComment: content
    };
  }

  isContentNull(content) {
    return !!content;
  }

  showCommentsField() {
    return this.isPage = 'comments';
  }

  showPlaylistField() {
    return this.isPage = 'playlists';
  }
}
