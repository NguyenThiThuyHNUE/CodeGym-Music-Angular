import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {HeaderComponent} from './header/header.component';
import {BodyComponent} from './body/body.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './header/register/register.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {LoginComponent} from './header/login/login.component';

@NgModule({
  declarations: [UserComponent, HeaderComponent, BodyComponent, RegisterComponent, LoginComponent],
  entryComponents: [RegisterComponent, LoginComponent],
  imports: [
    MatExpansionModule,
    MatCheckboxModule,
    MatTabsModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UserRoutingModule,
  ]
})
export class UserModule {
}
