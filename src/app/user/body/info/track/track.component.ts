import {Component, OnInit} from '@angular/core';
import {SongService} from '../../../../service/song.service';
import {IMusic} from '../../../../interface/i-music';
import {SharedService} from '../../../../service/shared.service';
import {SingerService} from '../../../../service/singer.service';
import {FormBuilder} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {UploadService} from '../../../../service/upload.service';
import {SnotifyService} from 'ng-snotify';
import {MatDialogRef} from '@angular/material';
import {ProfileComponent} from '../profile/profile.component';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  userSongs: IMusic[];
  song: IMusic;
  singerName: string;
  page = 'list';
  selectFileImg: File = null;
  imgDisplayInInterfaceSrc: string | ArrayBuffer;
  updateForm: any;
  listSinger: IMusic[];
  singersInInterface: string;
  singerUserHasChose: any;

  constructor(private songService: SongService, private singerService: SingerService,
              private shareService: SharedService, private fb: FormBuilder,
              private uploadService: UploadService, private Notify: SnotifyService,
              private dialogRef: MatDialogRef<ProfileComponent>,
  ) {
  }

  ngOnInit() {
    this.getSingers();
    this.getUserSongs();
  }

  clickDeleteSong() {
    this.songService.delete(this.song.id).subscribe((response) => {
      this.handleDeleteSongResponse(response);
    });
  }

  handleDeleteSongResponse(response) {
    this.Notify.success(response.message, {timeout: 1000});
    this.shareService.songDeleteChange(this.song);
    this.dialogRef.close();
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

  isSingersExist() {
    return !!this.singersInInterface;
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

  handleNewSingerIsAssigned(value) {
    this.singerUserHasChose = [];
    this.singersInInterface = '';
    this.singerUserHasChose.push(value.id);
    this.singersInInterface += value.name;
  }

  songUpdate() {
    if (this.isUpdateImage()) {
      this.setUpFileImageInUploadService();
      this.startUpload();
      return this.getCallBack();
    }
    return this.startUpdateSong();
  }

  isUpdateImage() {
    return this.selectFileImg !== null;
  }

  setUpFileImageInUploadService() {
    this.uploadService.setSelectFileImg(this.selectFileImg);
  }

  startUpload() {
    this.uploadService.startUpload(true);
  }

  getCallBack() {
    this.uploadService.taskUploadImg.snapshotChanges().pipe(
      finalize(() => {
        this.getImgDownloadUrl(this.uploadService.fireRefImg);
      })).subscribe();
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

  closeEtcDialog() {
    this.dialogRef.close();
  }

  setUpDataInInterface(data) {
    this.shareService.songUpdateChange(data);
  }

  setUpPreData() {
    this.updateForm.value.newSingers = this.singerUserHasChose;
  }

  setUrlImgInUpdateForm(url) {
    this.updateForm.value.newImage = url;
  }

  getImgDownloadUrl(fireRefImg) {
    fireRefImg.getDownloadURL().subscribe((url) => {
      this.setUrlImgInUpdateForm(url);
      this.startUpdateSong();
    });
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

  deleteSong(song) {
    this.song = song;
    this.declareData();
    this.page = 'delete';
    console.log(this.page);
  }

  editSong(song) {
    this.song = song;
    this.declareData();
    this.page = 'edit';
    console.log(this.page);
  }

  listenSong(song) {
    this.shareService.currentSongChange(song);
  }

  getUserSongs() {
    this.songService.getUserSongs().subscribe((response) => {
      this.singerName = response.data.name;
      this.userSongs = response.data.songs;
    });
  }

  declareData() {
    this.updateForm = this.fb.group({
      songId: this.song.id,
      newName: [''],
      newSingers: [''],
      newImage: [''],
    });
    this.singerUserHasChose = [];
    this.imgDisplayInInterfaceSrc = SongService.getSongImage(this.song);
  }
}
