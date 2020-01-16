import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {HeaderComponent} from './header/header.component';
import {BodyComponent} from './body/body.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {LoginComponent} from './header/login/login.component';
import {AuthComponent} from './header/auth/auth.component';
import {_MatMenuDirectivesModule, MatListModule, MatMenuModule} from '@angular/material';
import {FooterComponent} from './footer/footer.component';
import {MainComponent} from './body/main/main.component';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import {ConfirmEqualValidatorDirective} from '../directive/confirm-equal-validator.directive';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {InfoComponent} from './body/info/info.component';
import {ProfileComponent} from './body/info/profile/profile.component';
import {PlaylistComponent} from './body/info/playlist/playlist.component';
import {EtcComponent} from './body/main/etc/etc.component';
import {NewComponent} from './body/info/playlist/new/new.component';
import {MusicModule} from './body/music/music.module';
import {SingerModule} from './body/singer/singer.module';

import {SongComponent} from './body/main/song/song.component';
import {NowPlayComponent} from './footer/now-play/now-play.component';
import {UploadComponent} from './body/upload/upload.component';
import {AllComponent} from './body/info/all/all.component';
import {FavoriteComponent} from './body/info/favorite/favorite.component';
import {TrackComponent} from './body/info/track/track.component';
import {CtPlaylistComponent} from './body/info/ct-playlist/ct-playlist.component';
import {ChangePasswordComponent} from './body/info/profile/change-password/change-password.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [UserComponent, HeaderComponent, BodyComponent, LoginComponent, AuthComponent,
    FooterComponent, MainComponent, ConfirmEqualValidatorDirective,
    InfoComponent, ProfileComponent, PlaylistComponent, EtcComponent, NewComponent, SongComponent, NowPlayComponent, UploadComponent,
    AllComponent, FavoriteComponent, TrackComponent, CtPlaylistComponent, ChangePasswordComponent],
  entryComponents: [LoginComponent, ProfileComponent, PlaylistComponent, EtcComponent, NewComponent, ChangePasswordComponent],
  exports: [
    HeaderComponent,
    BodyComponent,
    FooterComponent
  ],
  imports: [
    UserRoutingModule,
    MatListModule,
    MusicModule,
    SingerModule,
    MatProgressBarModule,
    SnotifyModule,
    MatSelectModule,
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
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatIconModule,
    NgxPaginationModule,
    MatSelectModule,
  ]

})
export class UserModule {
}
