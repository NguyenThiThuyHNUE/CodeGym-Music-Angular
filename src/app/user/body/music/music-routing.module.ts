import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MusicComponent} from './music.component';
import {CreateComponent} from './create/create.component';
import {AuthGuard} from '../../../gurad/auth.guard';
import {DetailComponent} from './detail/detail.component';
import {EditComponent} from './edit/edit.component';
import {DeleteComponent} from './delete/delete.component';
import {NowPlayingComponent} from './detail/now-playing/now-playing.component';
import {MainComponent} from '../main/main.component';

const routes: Routes = [
  {path: '', component: MusicComponent},
  {path: 'create', component: CreateComponent, canActivate: [AuthGuard]},
  {path: 'edit/:id', component: EditComponent},
  {path: 'delete/:id', component: DeleteComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicRoutingModule {
}
