import {Injectable} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {ProfileComponent} from '../user/body/info/profile/profile.component';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private dialogRef: MatDialogRef<ProfileComponent>) {
  }

  resetUpdateForm() {
    this.dialogRef.close();
  }
}
