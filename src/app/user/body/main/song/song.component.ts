import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMusic} from '../../../../interface/i-music';
import {SharedService} from '../../../../service/shared.service';
import {MainService} from '../../../../service/main.service';
import {SongService} from '../../../../service/song.service';

@Component({
    selector: 'app-song',
    templateUrl: './song.component.html',
    styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
    @Input() song: IMusic;
    @Input() songsUserHasLiked: number[];
    icon: boolean;
    isPlay: boolean;
    listTheSameSongs: IMusic[];

    constructor(private sharedService: SharedService,
                private songService: SongService,
                private mainService: MainService) {
    }

    ngOnInit() {
        this.handleWhenUserHoverToThisSong();
        this.getTheSameSongsWhenUserClickThisSong();
    }

    getTheSameSongsWhenUserClickThisSong() {
        this.songService.getTheSameSongs(this.song.category).subscribe((response) => {
            this.handleGetTheSameSongsResponse(response);
        });
    }

    handleGetTheSameSongsResponse(response) {
        this.listTheSameSongs = response.data.data;
    }

    handleWhenUserHoverToThisSong() {
        this.sharedService.currentSongEmitted.subscribe((song) => {
            if (this.isCurrentSongIsThisSong(song)) {
                return this.isPlay = true;
            }
            this.isPlay = false;
            return this.hidePlayIcon();
        });
    }

    isCurrentSongIsThisSong(song) {
        return song.id === this.song.id;
    }

    showEtc() {
        this.mainService.showEtc(this.song);
    }

    hidePlayIcon() {
        if (!this.isPlay) {
            return this.icon = false;
        }
    }

    showPlayIcon() {
        return this.icon = true;
    }

    onClick(song: IMusic) {
        this.sharedService.currentSongChange(song);
        this.sharedService.listTheSameSongsChange(this.listTheSameSongs);
    }
}
