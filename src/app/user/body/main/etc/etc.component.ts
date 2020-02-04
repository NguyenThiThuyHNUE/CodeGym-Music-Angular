import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
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
import {SharedService} from '../../../../service/shared.service';
import {FormBuilder} from '@angular/forms';
import {UploadService} from '../../../../service/upload.service';
import {finalize} from 'rxjs/operators';
import {SongService} from '../../../../service/song.service';
import {SingerService} from '../../../../service/singer.service';

@Component({
  selector: 'app-etc',
  templateUrl: './etc.component.html',
  styleUrls: ['./etc.component.scss'], encapsulation: ViewEncapsulation.None
})
export class EtcComponent implements OnInit {
  @ViewChild('commentTextArea', {static: false}) el: ElementRef;
  isClick: boolean;
  // tslint:disable-next-line:max-line-length
  playlistsImage = 'https://firebasestorage.googleapis.com/v0/b/codegym-music-d1055.appspot.com/o/music%2Fbg-7.jpg?alt=media&token=fde1a560-92b5-4bf8-977b-33c26332496d';
  singersInInterface: string;
  comments: any[];
  isAnyComments = false;
  isThisSongBelongsToUser = false;
  isPage = 'comments';
  playlists: Playlist[];
  imgDisplayInInterfaceSrc: string | ArrayBuffer;
  updateForm: any;
  selectFileImg: File = null;
  singers: string;
  singerUserHasChose: any;
  listSinger: any;

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
    private singerService: SingerService,
    private dialogRef: MatDialogRef<EtcComponent>
  ) {
  }

  ngOnInit() {
    this.getSingers();
    this.isThisSongBeLongToUser();
    this.getSongComments();
    this.getUserPlaylists();
    this.setIsClickFalse();
    this.setDataInInterface();
    this.declareData();
  }

  setDataInInterface() {
    this.imgDisplayInInterfaceSrc = SongService.getSongImage(this.song);
  }

  getSingers() {
    this.singerService.getSingers().subscribe((response) => {
      this.listSinger = response.data;
    });
  }

  chooseSinger(singer) {
    if (this.isSingersExist()) {
      return this.handleNewSingerIsChose(singer);
    }
    return this.handleNewSingerIsAssigned(singer);
  }

  isThisSongBeLongToUser() {
    this.song.singers.forEach((singer) => {
      if (singer.user_id === UserService.getUserId()) {
        return this.isThisSongBelongsToUser = true;
      }
    });
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

  handleNewSingerIsAssigned(value) {
    this.singerUserHasChose = [];
    this.singersInInterface = '';
    this.singerUserHasChose.push(value.id);
    this.singersInInterface += value.name;
  }

  handleNewSingerIsChose(value) {
    if (!this.doesUserChooseSingerAgain(value)) {
      this.handleSingerIsNotDuplicate(value);
    }
    return;
  }

  handleSingerIsNotDuplicate(value) {
    this.singerUserHasChose.push(value.id);
    this.singersInInterface += `, ${value.name}`;
  }

  doesUserChooseSingerAgain(value) {
    return !!this.singerUserHasChose.includes(value.id);
  }

  isSingersExist() {
    return !!this.singersInInterface;
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
    this.setUpPreData();
    this.songService.edit(this.updateForm.value)
      .subscribe((response) => {
        this.handleUpdateResponse(response);
      });
  }

  handleUpdateResponse(response) {
    this.Notify.success(response.message, {timeout: 1000});
    this.setUpDataInInterface({oldSong: this.song, newSong: response.data});
    this.closeEtcDialog();
  }

  setUpDataInInterface(data) {
    this.sharedService.songUpdateChange(data);
  }

  closeEtcDialog() {
    this.dialogRef.close();
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
    this.updateForm.value.newImage = url;
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
    this.setDataToFillInterface(event);
  }

  setDataToFillInterface(event) {
    if (event.target.files[0]) {
      const reader: FileReader = new FileReader();

      reader.onload = (progressEvent) => { // called once readAsDataURL is completed
        this.imgDisplayInInterfaceSrc = reader.result;
      };

      reader.readAsDataURL(event.target.files[0]); // read file as data url
    }
  }

  declareData() {
    this.updateForm = this.fb.group({
      songId: this.song.id,
      newName: [''],
      newSingers: [''],
      newImage: [''],
    });
    this.singerUserHasChose = [];
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

  setUpPreData() {
    this.updateForm.value.newSingers = this.singerUserHasChose;
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
    this.inspectPlaylistChange();
  }

  inspectPlaylistChange() {
    this.sharedService.playlistNameEmitted.subscribe((data) => {
      this.getUserPlaylists();
    });
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
    this.playListService.setUpDataSongToPutOrRemoveInPlaylist(playlistId, this.song.id);
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
    if (response.data.length > 0) {
      this.isAnyComments = true;
      this.comments = response.data;
    }
    return;
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
    return this.setIsClickTrue();
  }

  handleErrorCreateComment(error) {
    console.log(error);
  }

  handleResponseCreateComment(response) {
    this.Notify.success(response.message, {timeout: 1000});
    this.resetValueInTextArea();
    this.setIsClickFalse();
    this.getSongComments();
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
