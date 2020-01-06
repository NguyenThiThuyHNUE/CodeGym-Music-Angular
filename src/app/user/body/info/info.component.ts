import {Component, NgZone, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PlaylistService} from '../../../service/playlist.service';
import {Playlist} from '../../../interface/playlist';
import {User} from '../../../interface/user';
import {timer} from 'rxjs';
import {InfoService} from '../../../service/info.service';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  playlists: Playlist[];
  user: User;
  playlist: Playlist;

  constructor(public dialog: MatDialog,
              private zone: NgZone,
              private playlistService: PlaylistService,
              private infoService: InfoService,
  ) {
    if (!this.user) {
      this.user = {};
    }
  }

  ngOnInit() {
    this.getUserCredentialToFillUpInterface();
    this.getPlaylists();
    this.updatePlaylistAfterFiveSecond();
  }

  showFormUpdate() {
    this.infoService.showFormUpdate();
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
    this.user.image = UserService.getUserImage();
  }
}
