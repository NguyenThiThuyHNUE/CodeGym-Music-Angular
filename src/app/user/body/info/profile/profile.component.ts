import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../../../service/user.service';
import {MatDialogRef} from '@angular/material';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  updateForm = this.fb.group({
    id: localStorage.getItem('id'),
    newEmail: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<ProfileComponent>,
              private Notify: SnotifyService,
              private userService: UserService) {
  }

  ngOnInit() {
  }

  userUpdate() {
    return this.userService.updateUser(localStorage.getItem('token'), this.updateForm.value)
      .subscribe((response) => {
        this.handleUpdateResponse(response);
      });
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
    this.Notify.success(res.message, 'Congratulations', {timeout: 7000});
    this.resetUpdateForm();
  }

  resetUpdateForm() {
    this.dialogRef.close();
  }

}
