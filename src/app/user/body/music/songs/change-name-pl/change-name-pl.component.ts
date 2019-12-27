import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, Validators} from '@angular/forms';
import {PlaylistService} from '../../../../../service/playlist.service';
import {SnotifyService} from 'ng-snotify';
import {SongsComponent} from '../songs.component';

@Component({
  selector: 'app-change-name-pl',
  templateUrl: './change-name-pl.component.html',
  styleUrls: ['./change-name-pl.component.scss']
})
export class ChangeNamePLComponent implements OnInit {
  updateForm = this.fb.group({
    newNamePlaylist: ['', Validators.required],
  });

  constructor(private dialogRef: MatDialogRef<ChangeNamePLComponent>,
              private dialogRefSongs: MatDialogRef<SongsComponent>,
              @Inject(MAT_DIALOG_DATA) public playlistId: any,
              private fb: FormBuilder,
              private Notify: SnotifyService,
              private playlistService: PlaylistService
  ) {
  }

  ngOnInit() {
    this.changeDialogPosition();
  }

  changeDialogPosition() {
    this.dialogRef.updatePosition({top: '10rem', right: '22rem'});
  }

  updatePlaylist() {
    this.playlistService.updatePlaylist(this.playlistId, this.updateForm.value)
      .subscribe((response) => this.handleUpdateResponse(response));
  }

  handleUpdateResponse(response) {
    localStorage.setItem('newNamePlaylist', this.updateForm.value.newNamePlaylist);
    this.Notify.success('Rename Success', {timeout: 3000});
    this.dialogRef.close();
  }

  get newNamePlaylist() {
    return this.updateForm.get('newNamePlaylist');
  }
}
