import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {LoginComponent} from './header/login/login.component';
import {CreateComponent} from './body/music/create/create.component';
import {MainComponent} from './body/main/main.component';
import {AuthGuard} from '../gurad/auth.guard';
import {DetailComponent} from './body/music/detail/detail.component';
import {EditComponent} from './body/music/edit/edit.component';
import {DeleteComponent} from './body/music/delete/delete.component';
import {InfoComponent} from './body/info/info.component';

const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      {path: '', component: MainComponent},
      {path: 'info', component: InfoComponent, canActivate: [AuthGuard]},
      {path: 'music', loadChildren: './user/body/music/music.module#MusicModule'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
