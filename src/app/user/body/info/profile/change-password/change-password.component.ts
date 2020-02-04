import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../../../../service/user.service';
import {SnotifyService} from 'ng-snotify';
import {ProfileService} from '../../../../../service/profile.service';
import {MatDialogRef} from '@angular/material';
import {InfoComponent} from '../../info.component';
import {ProfileComponent} from '../profile.component';
import {SharedService} from '../../../../../service/shared.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: any;
  userId: number;

  constructor(private fb: FormBuilder,
              private Notify: SnotifyService,
              public dialogRefChangePassword: MatDialogRef<ChangePasswordComponent>,
              private shareService: SharedService,
              private profileService: ProfileService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.setUserId();
    this.setUpForm();
  }

  setUserId() {
    return this.userId = UserService.getUserId();
  }

  changePassword() {
    this.userService.changePassword(this.changePasswordForm.value).subscribe((response) => {
      this.handleChangePasswordResponse(response);
    });
  }

  handleChangePasswordResponse(response) {
    this.Notify.success(response.message, {timeout: 3000});
    this.closeChangePasswordDialog();
  }

  closeChangePasswordDialog() {
    UserService.logout();
    this.dialogRefChangePassword.close();
    this.shareService.isPasswordChange(true);

  }

  setUpForm() {
    return this.changePasswordForm = this.fb.group({
      userId: this.userId,
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  get password() {
    return this.changePasswordForm.get('password');
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }

}
