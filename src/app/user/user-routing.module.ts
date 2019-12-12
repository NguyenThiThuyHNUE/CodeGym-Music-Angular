import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {LoginComponent} from './header/login/login.component';
import {MusicComponent} from './music/music.component';
import {CreateComponent} from './music/create/create.component';
import {MusicDetailComponent} from './body/music-detail/music-detail.component';

const routes: Routes = [
  {path: '', component: UserComponent},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {
    path: 'musics', component: MusicComponent, children:
      [{path: 'create', component: CreateComponent}]
  },

  {path: 'detail/music', component: MusicDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
