import {Component, Inject, Input, OnInit} from '@angular/core';
import {UserService} from '../../../../../../service/user.service';
import {FormBuilder, Validators} from '@angular/forms';
import {SnotifyService} from 'ng-snotify';
import {Response} from '../../../../../../interface/response';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CommentService} from '../../../../../../service/comment.service';
import {IMusic} from '../../../../../../interface/i-music';
import {MainService} from '../../../../../../service/main.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {

  createForm = this.fb.group({
    user_id: UserService.getUserId(),
    music_id: this.getMusicId(),
    comment: ['', Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public song: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateCommentComponent>,
    private commentService: CommentService,
    private Notify: SnotifyService,
    private mainService: MainService
  ) {
  }

  createComment() {
    return this.commentService.create(this.createForm.value)
      .subscribe((response) => {
        this.handleResponse(response);
      });
  }

  get comment() {
    return this.createForm.get('comment');
  }

  getMusicId() {
    return this.song.id;
  }

  private handleResponse(response: Response) {
    this.Notify.success(`${response.message}`, {timeout: 1000});
    this.resetForm();
  }

  private resetForm() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    // console.log(this.song);
  }
}
