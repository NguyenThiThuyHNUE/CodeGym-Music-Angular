import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../../../service/user.service';
import {MatDialogRef} from '@angular/material';
import {SnotifyService} from 'ng-snotify';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Song} from '../../../../song';
import {SongService} from '../../../../service/song.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'], encapsulation: ViewEncapsulation.None

})
export class ProfileComponent implements OnInit {
  name = localStorage.getItem('name');  // Name to fill up form update
  email = localStorage.getItem('email'); // Name to fill up form update
  selectFileImg: File = null; // Catch event select Image
  uploadPercent: any; // Show Percent While Upload
  updateForm = this.fb.group({ // Form update
    id: localStorage.getItem('id'),
    newName: ['', [Validators.required]],
    newImage: ['', [Validators.required]],
    newEmail: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });
  private firePathImg: string;
  private fireRefImg: AngularFireStorageReference;
  private taskUploadImg: AngularFireUploadTask;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<ProfileComponent>,
              private angularFireStorage: AngularFireStorage,
              private Notify: SnotifyService,
              private userService: UserService,
              private songService: SongService,
  ) {
  }

  ngOnInit() {
  }

  userUpdate() {
    this.setUpDataToUpdate();
    this.getPercentWhileUploading(this.taskUploadImg);
    this.getCallBackFromFireBase(this.taskUploadImg, this.fireRefImg);
  }

  onSelectFileImg(event) {
    this.selectFileImg = event.target.files[0] as File;
  }

  handleUpdateResponse(res) {
    this.notifyForUserThatIsUpdateInfoSuccess(res);
    this.resetUpdateForm();
    location.reload();
  }

  resetUpdateForm() {
    this.dialogRef.close();
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

  private handleGetUserCredentialResponse(response: any) {
    this.NotifyForUserThatLoginSuccess(response);
    localStorage.setItem('id', response.id);

    this.name = response.name;
    this.email = response.email;
  }

  private NotifyForUserThatLoginSuccess(response: any) {
    this.Notify.success(`Login Success, Welcome ${response.name}`, 'Congratulations', {timeout: 3000});
  }

  private setUpPathToImgInFireBase() {
    return `music/${this.selectFileImg.name}`;
  }

  private setUpFileRefInFireBase(firePathImg) {
    return this.angularFireStorage.ref(firePathImg);
  }

  private startUploadImageToFireBase(firePathImg) {
    return this.songService.uploadImg(firePathImg, this.selectFileImg);
  }

  private getPercentWhileUploading(taskUploadImg: AngularFireUploadTask) {
    taskUploadImg.percentageChanges().subscribe(percent => {
      this.uploadPercent = percent;
    });
  }

  private getCallBackFromFireBase(taskUploadImg: AngularFireUploadTask, fireRefImg: AngularFireStorageReference) {
    taskUploadImg.snapshotChanges().pipe(
      finalize(() => {
        this.getImgDownloadUrl(fireRefImg);
      })).subscribe();
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
    this.Notify.success(res.message, 'Congratulations', {timeout: 3000});
  }

  private setUpDataToUpdate() {
    this.firePathImg = this.setUpPathToImgInFireBase();
    this.fireRefImg = this.setUpFileRefInFireBase(this.firePathImg);
    this.taskUploadImg = this.startUploadImageToFireBase(this.firePathImg);
  }
}
