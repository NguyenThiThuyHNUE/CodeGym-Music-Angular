import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {IMusic} from '../../../../interface/i-music';
import {PlaylistService} from '../../../../service/playlist.service';
import {Playlist} from '../../../../interface/playlist';
import {SongService} from '../../../../service/song.service';
import {SharedService} from '../../../../service/shared.service';

@Component({
    selector: 'app-singer-info',
    templateUrl: './singer-info.component.html',
    styleUrls: ['./singer-info.component.scss']
})
export class SingerInfoComponent implements OnInit {
    isPage = 'info';
    singerPlaylists: Playlist[];
    singerSongs: IMusic[];
    imgDisplayInInterfaceSrc = '../../../../../assets/img/bg-img/bg-7.jpg';

    constructor(@Inject(MAT_DIALOG_DATA) public singer,
                private playlistService: PlaylistService,
                private shareService: SharedService,
                private songService: SongService) {
    }

    ngOnInit() {
        this.getPlaylists();
        this.getSongs();
    }

    listenSong(song) {
        this.shareService.currentSongChange(song);
        this.shareService.listTheSameSongsChange(this.removeCurrentSongInArray(this.singerSongs[0], this.singerSongs));
        this.getSongs();
    }

    removeCurrentSongInArray(song, listSong) {
        const listSongs = listSong;
        listSongs.splice(listSongs.indexOf(song), 1);
        return listSongs;
    }

    getSongs() {
        this.songService.getSingerSongs(this.singer.id).subscribe((response) => {
            this.singerSongs = response.data;
        });
    }

    getPlaylists() {
        this.playlistService.getPlaylists(this.singer.user.id).subscribe((response) => {
            this.singerPlaylists = response.data;
        });
    }

    showInfo() {
        this.isPage = 'info';
    }

    showSongs() {
        this.isPage = 'songs';
    }

    showPlaylists() {
        this.isPage = 'playlists';
    }
}
