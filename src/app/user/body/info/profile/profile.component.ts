import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../../../service/user.service';
import {MatDialogRef} from '@angular/material';
import {SnotifyService} from 'ng-snotify';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {SongService} from '../../../../service/song.service';
import {UploadService} from '../../../../service/upload.service';
import {ProfileService} from '../../../../service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'], encapsulation: ViewEncapsulation.None

})
export class ProfileComponent implements OnInit {
  oldName = localStorage.getItem('name');  // Name to fill up form update
  oldEmail = localStorage.getItem('email'); // Name to fill up form update
  selectFileImg: File = null; // Catch event select Image
  updateForm: any;
  oldImage = UserService.getUserAvatar();

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<ProfileComponent>,
              private angularFireStorage: AngularFireStorage,
              private Notify: SnotifyService,
              private userService: UserService,
              private songService: SongService,
              private profileService: ProfileService,
              private uploadService: UploadService
  ) {
  }

  ngOnInit() {
    this.setUpFormUpdate();
  }

  setUpFormUpdate() {
    this.updateForm = this.fb.group({ // Form update
      id: UserService.getUserId(),
      newName: [''],
      newImage: [''],
    });
  }

  showFormChangePassword() {
    this.profileService.showFormChangePassword();
  }

  userUpdate() {
    if (this.isUpdateImage()) {
      this.setUpFileImageInUploadService();
      this.startUpload();
      return this.getCallBack();
    }
    return this.startUpdateUserInfo();
  }

  onSelectFileImg(event) {
    this.selectFileImg = event.target.files[0] as File;
  }

  handleUpdateResponse(response) {
    this.resetUpdateForm();
    this.notifyForUserThatIsUpdateInfoSuccess(response);
    this.setDataCurrently(response);
    this.saveDataToLocalStorage(response);
  }

  handleResponse(response) {
    this.notifyForUserThatIsUpdateInfoSuccess(response);
    this.setDataCurrently(response);
    this.saveDataToLocalStorage(response);
  }

  setDataCurrently(response) {
    this.oldImage = response.data.image;
  }

  saveDataToLocalStorage(response: any) {
    this.userService.saveDataToLocalStorage(response.data);
  }

  handleResponseError() {
    this.userService.logout();
  }

  resetUpdateForm() {
    this.dialogRef.close();
  }

  private getImgDownloadUrl(fireRefImg) {
    fireRefImg.getDownloadURL().subscribe((url) => {
      this.setUrlImgInUpdateForm(url);
      this.startUpdateUserInfo();
    });
  }

  private setUrlImgInUpdateForm(url) {
    this.updateForm.value.newImage = url;
  }

  private startUpdateUserInfo() {
    this.userService.updateUser(this.updateForm.value)
      .subscribe((response) => {
        this.handleUpdateResponse(response);
      });
  }

  private notifyForUserThatIsUpdateInfoSuccess(res) {
    this.Notify.success(`Update Success`, {timeout: 3000});
  }

  get newName() {
    return this.updateForm.get('newName');
  }

  get newImage() {
    return this.updateForm.get('newImage');
  }

  get newPassword() {
    return this.updateForm.get('newPassword');
  }

  get confirmPassword() {
    return this.updateForm.get('confirmPassword');
  }

  get newEmail() {
    return this.updateForm.get('newEmail');
  }

  private setUpFileImageInUploadService() {
    this.uploadService.setSelectFileImg(this.selectFileImg);
  }

  private startUpload() {
    this.uploadService.startUpload(true);
  }

  private getCallBack() {
    this.uploadService.taskUploadImg.snapshotChanges().pipe(
      finalize(() => {
        this.getImgDownloadUrl(this.uploadService.fireRefImg);
      })).subscribe();
  }

  private isUpdateImage() {
    return this.selectFileImg !== null;
  }
}
