import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {LoginComponent} from './header/login/login.component';
import {MusicComponent} from './music/music.component';
import {CreateComponent} from './music/create/create.component';
import {MainComponent} from './body/main/main.component';
import {AuthGuard} from '../gurad/auth.guard';
import {DetailComponent} from './music/detail/detail.component';
import {EditComponent} from './music/edit/edit.component';
import {DeleteComponent} from './music/delete/delete.component';

const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      {path: '', component: MainComponent},
    ]
  },
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {
    path: 'music', component: MusicComponent, children:
      [
        {path: 'create', component: CreateComponent},
        {path: 'detail/:id', component: DetailComponent},
        {path: 'edit/:id', component: EditComponent},
        {path: 'delete/:id', component: DeleteComponent},
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
