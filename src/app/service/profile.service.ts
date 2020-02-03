import {Injectable} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {ProfileComponent} from '../user/body/info/profile/profile.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EtcComponent} from '../user/body/main/etc/etc.component';
import {ChangePasswordComponent} from '../user/body/info/profile/change-password/change-password.component';
import {InfoComponent} from '../user/body/info/info.component';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(public dialog: MatDialog,
              public dialogRefChangePassword: MatDialogRef<ChangePasswordComponent>,
              private dialogRef: MatDialogRef<ProfileComponent>) {
  }

  static createChangePasswordConfigDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.height = '60%';
    return dialogConfig;
  }

  static showProfileConfigDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '70%';
    dialogConfig.height = '70%';
    return dialogConfig;
  }

  showProfile() {
    const dialogConfig = ProfileService.showProfileConfigDialog();
    this.dialog.open(InfoComponent, dialogConfig);
  }

  showFormChangePassword() {
    const dialogConfig = ProfileService.createChangePasswordConfigDialog();
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }

  resetUpdateForm() {
    this.dialogRef.close();
  }

  closeChangePasswordDialog() {
    return this.dialogRefChangePassword.close();
  }
}
