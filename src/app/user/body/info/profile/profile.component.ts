import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../../../service/user.service';
import {MatDialogRef} from '@angular/material';
import {SnotifyService} from 'ng-snotify';
import {AngularFireStorage} from '@angular/fire/storage';
import {MusicService} from '../../../../service/music.service';
import {finalize} from 'rxjs/operators';
import {Song} from '../../../../song';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: string;
  email: string;
  selectFileAvatar: File = null;
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
              private musicService: MusicService,
              private song: Song) {
  }

  onSelectFileAvatar(event) {
    this.selectFileAvatar = event.target.files[0] as File;
  }

  ngOnInit() {
    return this.userService.getUserCredential(localStorage.getItem('token'))
      .subscribe((data: any) => {
        this.Notify.success(`Login Success, Welcome ${data.name}`, 'Congratulations', {timeout: 3000});
        localStorage.setItem('id', data.id);

        this.name = data.name;
        this.email = data.email;
      });
  }

  userUpdate() {
    const firePathAvatar = `music/${this.selectFileAvatar.name}`;
    const fireRefAvatar = this.angularFireStorage.ref(firePathAvatar);
    const taskUploadAvatar = this.musicService.uploadAvatar(firePathAvatar, this.selectFileAvatar);
    taskUploadAvatar.percentageChanges().subscribe(percent => {
      this.uploadPercent = percent;
    });
    taskUploadAvatar.snapshotChanges().pipe(
      finalize(() => {
        fireRefAvatar.getDownloadURL().subscribe((url) => {
          this.updateForm.value.newImage = url;
          this.userService.updateUser(localStorage.getItem('token'), this.updateForm.value)
            .subscribe((response) => {
              this.handleUpdateResponse(response);
            });
        });
      })).subscribe();

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

  handleUpdateResponse(res) {
    this.Notify.success(res.message, 'Congratulations', {timeout: 3000});
    this.resetUpdateForm();
    location.reload();
  }

  resetUpdateForm() {
    this.dialogRef.close();
  }

}
