import {Component, OnInit} from '@angular/core';
import {SongService} from '../../../../service/song.service';
import {UserService} from '../../../../service/user.service';
import {IMusic} from '../../../../interface/i-music';
import {PlaylistService} from '../../../../service/playlist.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  userAvatar: string;
  userEmail: string;
  userSongs: IMusic[];
  playlists: [];

  constructor(private songService: SongService, private playListService: PlaylistService) {
  }

  ngOnInit() {
    this.setUserData();
    this.getUserSongs();
    this.getPlaylists();
  }

  getPlaylists() {
    this.playListService.getPlaylists(UserService.getUserId())
      .subscribe((response) => {
        this.handleGetPlaylistResponse(response);
      });
  }

  private handleGetPlaylistResponse(response) {
    this.playlists = response.data;
  }

  getUserSongs() {
    this.songService.getUserSongs().subscribe((response) => {
      this.userSongs = response.data.songs;
    });
  }

  setUserData() {
    this.userAvatar = UserService.getUserAvatar();
    this.userEmail = UserService.getUserEmail();
  }

}
