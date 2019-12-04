import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';


@NgModule({
  declarations: [UserComponent, HeaderComponent, BodyComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
