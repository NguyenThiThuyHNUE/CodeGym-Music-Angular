import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PlaylistComponent} from '../../info/playlist/playlist.component';
import {MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Inject} from '@angular/core';
import {MainService} from '../../../../service/main.service';
import {IMusic} from '../../../../interface/i-music';

@Component({
  selector: 'app-etc',
  templateUrl: './etc.component.html',
  styleUrls: ['./etc.component.scss'], encapsulation: ViewEncapsulation.None
})
export class EtcComponent implements OnInit {
  animal: string;
  name: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public song: IMusic,
    public dialog: MatDialog,
    private mainService: MainService,
    private dialogRef: MatDialogRef<PlaylistComponent>,
  ) {
  }

  ngOnInit() {
  }


  closeEtc() {
    return this.dialogRef.close();
  }

  showPlaylists() {
    this.closeEtc();
    this.mainService.showPlaylists(this.song);
  }

  showComments() {
    this.closeEtc();
    this.mainService.showComments(this.song);
    this.mainService.getMusicId(this.song);
    console.log(this.song);
  }

}
