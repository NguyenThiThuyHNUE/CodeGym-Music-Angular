import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {MainComponent} from './body/main/main.component';
import {AuthGuard} from '../gurad/auth.guard';
import {InfoComponent} from './body/info/info.component';
import {UploadComponent} from './body/upload/upload.component';
import {AllComponent} from './body/info/all/all.component';
import {FavoriteComponent} from './body/info/favorite/favorite.component';
import {TrackComponent} from './body/info/track/track.component';
import {CtPlaylistComponent} from './body/info/ct-playlist/ct-playlist.component';

const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      {path: '', component: MainComponent},
      {
        path: 'info', component: InfoComponent, canActivate: [AuthGuard], children: [
          {path: 'all', component: AllComponent},
          {path: 'favorite', component: FavoriteComponent},
          {path: 'track', component: TrackComponent},
          {path: 'playlist', component: CtPlaylistComponent}
        ]
      },
      {path: 'upload', component: UploadComponent, canActivate: [AuthGuard]},
      {path: 'music', loadChildren: './body/music/music.module#MusicModule'},
      {path: 'singer', loadChildren: './body/singer/singer.module#SingerModule'}
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
