import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PlaylistService} from '../../../service/playlist.service';
import {Playlist} from '../../../interface/playlist';
import {User} from '../../../interface/user';
import {timer} from 'rxjs';
import {InfoService} from '../../../service/info.service';
import {UserService} from '../../../service/user.service';
import {SongService} from '../../../service/song.service';
import {IMusic} from '../../../interface/i-music';
import {SharedService} from '../../../service/shared.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  thisPage = 'info';
  playlists: Playlist[];
  user: User;
  playlist: Playlist;
  newSongs: IMusic[];

  constructor(public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public action,
              private zone: NgZone,
              private playlistService: PlaylistService,
              private songService: SongService,
              private infoService: InfoService,
              public dialogRefProfileComponent: MatDialogRef<InfoComponent>,
              private shareService: SharedService
  ) {
    if (!this.user) {
      this.user = {};
    }
  }

  ngOnInit() {
    this.choosePage();
    this.getUserCredentialToFillUpInterface();
    this.isPasswordChange();
  }

  choosePage() {
    this.thisPage = this.action;
  }
  showSinger(){
    this.thisPage = 'singer';
  }
  showInfo() {
    this.thisPage = 'info';
  }

  isPasswordChange() {
    this.shareService.isChangePasswordEmitted.subscribe((data) => {
      this.dialogRefProfileComponent.close();
    });
  }

  showTracks() {
    this.thisPage = 'tracks';
  }

  showPlaylists() {
    this.thisPage = 'playlists';
  }

  showProfile() {
    this.thisPage = 'profile';
  }

  showPlaylistCreateForm() {
    this.infoService.showPlaylistCreateForm();
  }


  showSongsInPlaylist(playlistId) {
    this.infoService.showSongsInPlaylist(playlistId, this.playlists);
  }

  getPlaylists() {
    this.playlistService.getPlaylists(this.user.id).subscribe((response) => {
      this.zone.run(() => {
        this.handleGetPlaylistsResponse(response);
      });
    });
  }

  handleGetPlaylistsResponse(response) {
    return this.playlists = response.data;
  }

  private updatePlaylistAfterFiveSecond() {
    const timer$ = timer(2000, 5000);
    timer$.subscribe(() => {
      this.getUserCredentialToFillUpInterface();
      this.getPlaylists();
    });
  }

  private getUserCredentialToFillUpInterface() {
    this.user.id = UserService.getUserId();
    this.user.email = UserService.getUserEmail();
    this.user.name = UserService.getUserName();
    this.user.image = UserService.getUserAvatar();
  }
}
