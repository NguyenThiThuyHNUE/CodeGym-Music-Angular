import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {Song} from './song';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import {ConfirmEqualValidatorDirective} from './directive/confirm-equal-validator.directive';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('552542181961129')
  }
]);

export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  providers: [
    {provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    {provide : AuthServiceConfig, useFactory: provideConfig },
    SnotifyService, Song
  ],
  imports: [
    SnotifyModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    SocialLoginModule
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
