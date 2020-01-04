import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../../gurad/auth.guard';

import {SingerComponent} from './singer.component';
import {CreateComponent} from './create/create.component';


const routes: Routes = [
  {path: '', component: SingerComponent},
  {path: 'create', component: CreateComponent, canActivate: [AuthGuard]},
 ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingerRoutingModule { }
