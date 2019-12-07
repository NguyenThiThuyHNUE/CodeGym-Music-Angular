import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {MusicComponent} from './music/music.component';
import {CreateComponent} from './music/create/create.component';


const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      {path: 'music', component: MusicComponent},
      {path: 'create', component: CreateComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule {
}
