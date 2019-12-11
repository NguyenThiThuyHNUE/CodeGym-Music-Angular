import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './user.component';
import {LoginComponent} from './header/login/login.component';


const routes: Routes = [
  {path: '', component: UserComponent},
  {path: 'login', component: LoginComponent , pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
