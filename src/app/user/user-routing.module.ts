import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {MainComponent} from './body/main/main.component';
import {AuthGuard} from '../gurad/auth.guard';
import {InfoComponent} from './body/info/info.component';

const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      {path: '', component: MainComponent},
      {path: 'info', component: InfoComponent, canActivate: [AuthGuard]},
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
