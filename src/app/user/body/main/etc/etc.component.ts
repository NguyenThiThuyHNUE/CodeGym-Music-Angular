import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PlaylistComponent} from '../../info/playlist/playlist.component';
import {MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Inject} from '@angular/core';

@Component({
  selector: 'app-etc',
  templateUrl: './etc.component.html',
  styleUrls: ['./etc.component.scss'], encapsulation: ViewEncapsulation.None
})
export class EtcComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<PlaylistComponent>,
  ) {
  }

  ngOnInit() {
  }

  closeEtc() {
    return this.dialogRef.close();
  }

  showListPlaylist() {
    this.closeEtc();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.data;
    this.dialog.open(PlaylistComponent, dialogConfig);
  }
}
