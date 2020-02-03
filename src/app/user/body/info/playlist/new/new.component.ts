import {Component, EventEmitter, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PlaylistService} from '../../../../../service/playlist.service';
import {UserService} from '../../../../../service/user.service';
import {SnotifyService} from 'ng-snotify';
import {Response} from '../../../../../interface/response';
import {IMusic} from '../../../../../interface/i-music';
import {Playlist} from '../../../../../interface/playlist';
import {Subject} from 'rxjs';
import {SharedService} from '../../../../../service/shared.service';

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
    @Inject(MAT_DIALOG_DATA) public playlists: Playlist[],
    private fb: FormBuilder,
    private sharedService: SharedService,
    private dialogRef: MatDialogRef<NewComponent>,
    private playListService: PlaylistService,
    private Notify: SnotifyService,
  ) {
  }

  createPlaylist() {
    this.playListService.createPlaylist(this.createForm.value).subscribe((response) => {
      this.sharedService.newPlaylist(response);
      this.resetForm();
    });
  }

  get namePlaylist() {
    return this.createForm.get('namePlaylist');
  }

  private handleResponse(response: Response) {
    this.Notify.success(`${response.message}`, {timeout: 1000});
  }

  private resetForm() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
