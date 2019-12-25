import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {HeaderComponent} from './header/header.component';
import {BodyComponent} from './body/body.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {AuthComponent} from './header/auth/auth.component';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material';
import {FooterComponent} from './footer/footer.component';
import {MainComponent} from './body/main/main.component';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {ConfirmEqualValidatorDirective} from '../directive/confirm-equal-validator.directive';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {InfoComponent} from './body/info/info.component';
import {ProfileComponent} from './body/info/profile/profile.component';

@NgModule({
  declarations: [UserComponent, HeaderComponent, BodyComponent, LoginComponent, AuthComponent,
    FooterComponent, MainComponent, ConfirmEqualValidatorDirective,
    InfoComponent, ProfileComponent],
  entryComponents: [LoginComponent, ProfileComponent],
  providers: [
    {provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  exports: [
    HeaderComponent,
    BodyComponent,
    FooterComponent
  ],
  imports: [
    UserRoutingModule,
    MatProgressBarModule,
    SnotifyModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSliderModule,
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
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
  ]

})
export class UserModule {
}
