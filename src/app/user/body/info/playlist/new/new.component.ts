import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {PlaylistService} from '../../../../../service/playlist.service';
import {UserService} from '../../../../../service/user.service';
import {SnotifyService} from 'ng-snotify';
import {Response} from '../../../../../interface/response';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewComponent implements OnInit {
  createForm = this.fb.group({
    user_id: UserService.getUserId(),
    namePlaylist: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewComponent>,
    private playListService: PlaylistService,
    private Notify: SnotifyService,
  ) {
  }

  createPlaylist() {
    return this.playListService.createPlaylist(this.createForm.value)
      .subscribe((response) => {
        this.handleResponse(response);
      });
  }

  get namePlaylist() {
    return this.createForm.get('namePlaylist');
  }

  private handleResponse(response: Response) {
    this.Notify.success(`${response.message}`, {timeout: 1000});
    this.resetForm();
  }

  private resetForm() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
