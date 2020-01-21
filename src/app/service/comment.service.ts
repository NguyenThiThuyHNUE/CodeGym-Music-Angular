import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Response} from '../interface/response';
import {Url} from '../../../url-project';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CreateCommentComponent} from '../user/body/music/detail/comment/create-comment/create-comment.component';
import {MainService} from './main.service';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpClient,
                public dialog: MatDialog) {
    }

    create(commentInfo): Observable<Response> {
        return this.http.post<Response>(Url + '/api/comment/create/', commentInfo);
    }

    getAllCommentOfSong(songId) {
        return this.http.get(Url + `/api/comments/${songId}`);
    }

    showFormCreateComment(config) {
        const dialogConfig = MainService.createConfigDialog(config);
        this.dialog.open(CreateCommentComponent, dialogConfig);
    }
}
