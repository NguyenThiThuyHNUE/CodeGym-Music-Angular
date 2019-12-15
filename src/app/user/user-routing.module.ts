import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {LoginComponent} from './header/login/login.component';
import {MusicComponent} from './music/music.component';
import {CreateComponent} from './music/create/create.component';
import {MusicDetailComponent} from './body/music-detail/music-detail.component';
import {MainComponent} from './body/main/main.component';

const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      {path: '', component: MainComponent},
      {path: 'detail/music', component: MusicDetailComponent}
    ]
  },
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {
    path: 'musics', component: MusicComponent, children:
      [{path: 'create', component: CreateComponent}]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
