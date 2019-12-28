import {NgModule} from '@angular/core';

import {MusicRoutingModule} from './music-routing.module';
import {MusicComponent} from './music.component';
import {CreateComponent} from './create/create.component';
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
import {LoginComponent} from '../../header/login/login.component';
import {ProfileComponent} from '../info/profile/profile.component';
import {PlaylistComponent} from '../info/playlist/playlist.component';
import {EtcComponent} from '../main/etc/etc.component';
import {NewComponent} from '../info/playlist/new/new.component';


@NgModule({
  declarations: [MusicComponent, CreateComponent, DeleteComponent, EditComponent, DetailComponent, NowPlayingComponent, SongsComponent,
  ],
  entryComponents: [SongsComponent],
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
  ]
})
export class MusicModule {
}
