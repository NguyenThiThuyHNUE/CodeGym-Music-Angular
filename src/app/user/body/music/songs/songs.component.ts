import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {IMusic} from '../../../../interface/i-music';
import {PlaylistService} from '../../../../service/playlist.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import {SongResponse} from '../../../../interface/song-response';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SongsComponent implements OnInit {
  songs: IMusic[];

  constructor(@Inject(MAT_DIALOG_DATA) public songId: any,
              private playlistService: PlaylistService) {
  }

  ngOnInit() {
    this.getSongsInPlaylist();
  }

  getSongsInPlaylist() {
    this.playlistService.getSongsInPlaylist(this.songId)
      .subscribe((response) => {
        this.handleGetSongsInPlaylistResponse(response);
      });
  }

  private handleGetSongsInPlaylistResponse(response: SongResponse) {
    this.songs = response.data;
  }
}
