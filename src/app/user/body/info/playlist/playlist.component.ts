import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {PlaylistService} from '../../../../service/playlist.service';
import {IMessage} from '../../../../interface/i-message';
import {SnotifyService} from 'ng-snotify';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PlaylistComponent implements OnInit {
  createForm = this.fb.group({
    user_id: localStorage.getItem('id'),
    namePlaylist: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private Notify: SnotifyService,
    private dialogRef: MatDialogRef<PlaylistComponent>,
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
    return this.dialogRef.close();
  }
}
