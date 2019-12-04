import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MusicComponent} from './music/music.component';
import {CreateComponent} from './music/create/create.component';


const homeRoutes: Routes = [{
  path: 'songs', component: MusicComponent, children: [
    {path: 'create', component: CreateComponent},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
