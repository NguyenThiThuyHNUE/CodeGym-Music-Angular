import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {HeaderComponent} from './header/header.component';
import {BodyComponent} from './body/body.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './header/login/login.component';



@NgModule({
  declarations: [UserComponent, HeaderComponent, BodyComponent, LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UserRoutingModule,
  ]
})
export class UserModule {
}
