import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../../../service/user.service';
import {MatDialogRef} from '@angular/material';
import {SnotifyService} from 'ng-snotify';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {MusicService} from '../../../../service/music.service';
import {finalize} from 'rxjs/operators';
import {Song} from '../../../../song';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'], encapsulation: ViewEncapsulation.None

})
export class ProfileComponent implements OnInit {
  name: string;
  email: string;
  selectFileImg: File = null;
  uploadPercent: any;
  updateForm = this.fb.group({
    id: localStorage.getItem('id'),
    newName: ['', [Validators.required]],
    newImage: ['', [Validators.required]],
    newEmail: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<ProfileComponent>,
              private angularFireStorage: AngularFireStorage,
              private Notify: SnotifyService,
              private userService: UserService,
              private songService: MusicService,
              private song: Song) {
  }


  ngOnInit() {
    this.getUserCredentialToFillUpFormUpdate();
  }

  userUpdate() {
    const firePathImg = this.setUpPathToImgInFireBase();
    const fireRefImg = this.setUpFileRefInFireBase(firePathImg);
    const taskUploadImg = this.startUploadImageToFireBase(firePathImg);
    this.getPercentWhileUploading(taskUploadImg);
    taskUploadImg.snapshotChanges().pipe(
      finalize(() => {
        fireRefImg.getDownloadURL().subscribe((url) => {
          this.updateForm.value.newImage = url;
          this.userService.updateUser(localStorage.getItem('token'), this.updateForm.value)
            .subscribe((response) => {
              this.handleUpdateResponse(response);
            });
        });
      })).subscribe();

  }

  onSelectFileImg(event) {
    this.selectFileImg = event.target.files[0] as File;
  }

  handleUpdateResponse(res) {
    this.Notify.success(res.message, 'Congratulations', {timeout: 3000});
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

  private getUserCredentialToFillUpFormUpdate() {
    this.userService.getUserCredential()
      .subscribe((response: any) => {
        this.handleGetUserCredentialResponse(response);
      });
  }

  private setUpPathToImgInFireBase() {
    return `music/${this.selectFileImg.name}`;
  }

  private setUpFileRefInFireBase(firePathImg) {
    return this.angularFireStorage.ref(firePathImg);
  }

  private startUploadImageToFireBase(firePathImg) {
    return this.songService.uploadAvatar(firePathImg, this.selectFileImg);
  }

  private getPercentWhileUploading(taskUploadImg: AngularFireUploadTask) {
    taskUploadImg.percentageChanges().subscribe(percent => {
      this.uploadPercent = percent;
    });
  }
}
