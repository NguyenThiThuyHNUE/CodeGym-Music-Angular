import {NgModule} from '@angular/core';

import {MusicRoutingModule} from './music-routing.module';
import {MusicComponent} from './music.component';
import {CreateComponent} from './create/create.component';
// import {CreateComponent} from './detail/comment/create/create.component';
import {DeleteComponent} from './delete/delete.component';
import {EditComponent} from './edit/edit.component';
import {DetailComponent} from './detail/detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {SnotifyModule} from 'ng-snotify';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {NowPlayingComponent} from './detail/now-playing/now-playing.component';
import {SongsComponent} from './songs/songs.component';
import {ChangeNamePLComponent} from './songs/change-name-pl/change-name-pl.component';
import {UserModule} from '../../user.module';
import {CommentComponent} from './detail/comment/comment.component';
import {MatListModule} from '@angular/material/list';
import {CreateCommentComponent} from './detail/comment/create-comment/create-comment.component';


@NgModule({
  declarations: [MusicComponent, CreateComponent, DeleteComponent, EditComponent, DetailComponent,
    NowPlayingComponent, ChangeNamePLComponent, CommentComponent, CreateCommentComponent,
  ],
  entryComponents: [ChangeNamePLComponent, CommentComponent, CreateComponent, CreateCommentComponent],
  imports: [
    MusicRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatProgressBarModule,
    SnotifyModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSliderModule,
    MatTabsModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatListModule,
  ]
})
export class MusicModule {
}
