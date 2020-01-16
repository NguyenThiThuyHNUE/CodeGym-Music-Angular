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
  leftPlaylists: Playlist[];
  rightPlaylists: Playlist[];
  imageSrc = '../../../../../assets/img/bg-img/bg-7.jpg';

  constructor(private infoService: InfoService, private zone: NgZone,
              private playlistService: PlaylistService) {
    if (this.leftPlaylists) {
      this.leftPlaylists = [];
    }
    if (this.rightPlaylists) {
      this.rightPlaylists = [];
    }
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
    this.separateToTwoArray(response.data);
    return this.playlists = response.data;
  }

  separateToTwoArray(array) {
    for (let i = 0; i < array.length; i++) {
      if (this.isOdd(i)) {
        this.leftPlaylists.push(array[i]);
      } else {
        this.rightPlaylists.push(array[i]);
      }
    }
    console.log({leftArray: this.leftPlaylists, rightArray: this.rightPlaylists});
  }

  isOdd(inputNumber) {
    return inputNumber % 2;
  }

  distinguishEvenAndOdd() {

  }

  createPlaylist() {
    this.infoService.showPlaylistCreateForm();
  }
}
