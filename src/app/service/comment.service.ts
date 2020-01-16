import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Response} from '../interface/response';
import {Url} from '../../../url-project';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CreateCommentComponent} from '../user/body/music/detail/comment/create-comment/create-comment.component';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient,
              public dialog: MatDialog) {
  }

  create(comentInfo): Observable<Response> {
    return this.http.post<Response>(Url + '/api/comment/create/', comentInfo);
  }

  getAll(userID, singerId) {
    return this.http.get(Url + `/api/comments/${userID}/${singerId}`);
  }

  showFormCreateComment(dialogConfig) {
    console.log(dialogConfig);
    this.dialog.open(CreateCommentComponent, dialogConfig);
  }
}
