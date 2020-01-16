import {Component, NgZone, OnInit} from '@angular/core';

import {InfoService} from '../../../../service/info.service';
import {PlaylistService} from '../../../../service/playlist.service';
import {UserService} from '../../../../service/user.service';
import {Playlist} from '../../../../interface/playlist';

@Component({
  selector: 'app-ct-playlist',
  templateUrl: './ct-playlist.component.html',
  styleUrls: ['./ct-playlist.component.scss']
})
export class CtPlaylistComponent implements OnInit {
  userId: number;
  playlists: Playlist[];
  imageSrc = '../../../../../assets/img/bg-img/bg-7.jpg';
  p = 1;

  constructor(private infoService: InfoService, private zone: NgZone,
              private playlistService: PlaylistService) {
  }

  ngOnInit() {
    this.setUserId();
    this.getPlaylists();
  }

  setUserId() {
    return this.userId = UserService.getUserId();
  }

  getPlaylists() {
    this.playlistService.getPlaylists(this.userId).subscribe((response) => {
      this.zone.run(() => {
        this.handleGetPlaylistsResponse(response);
      });
    });
  }

  handleGetPlaylistsResponse(response) {
    return this.playlists = response.data;
  }

  isOdd(inputNumber) {
    return inputNumber % 2;
  }

  createPlaylist() {
    this.infoService.showPlaylistCreateForm();
  }
}
