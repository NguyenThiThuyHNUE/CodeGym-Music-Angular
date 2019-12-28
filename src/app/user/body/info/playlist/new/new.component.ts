import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SnotifyService} from 'ng-snotify';
import {MatDialogRef} from '@angular/material';
import {PlaylistService} from '../../../../../service/playlist.service';
import {IMessage} from '../../../../../interface/i-message';
import {PlaylistComponent} from '../playlist.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewComponent implements OnInit {
  createForm = this.fb.group({
    user_id: localStorage.getItem('id'),
    namePlaylist: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private Notify: SnotifyService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<NewComponent>,
    private dialogRefPlaylist: MatDialogRef<PlaylistComponent>,
    private playListService: PlaylistService
  ) {
  }

  ngOnInit() {
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

  private handleResponse(response: IMessage) {
    this.Notify.success(`${response.message}`, 'Congratulations', {timeout: 5000});
    this.resetForm();
  }

  private resetForm() {
    this.dialogRef.close();
    this.dialogRefPlaylist.close();
    this.dialog.open(PlaylistComponent);
  }
}
