import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SingerComponent} from './singer.component';
import {CreateComponent} from './create/create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {SnotifyModule} from 'ng-snotify';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {SingerRoutingModule} from './singer-routing.module';

@NgModule({
  declarations: [SingerComponent, CreateComponent],
  imports: [
    SingerRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SingerModule { }
