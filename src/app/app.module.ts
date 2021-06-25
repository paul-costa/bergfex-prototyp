import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { SkiAreaComponent } from './ski-area/ski-area.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InfoDialogComponent } from './shared/info-dialog/info-dialog.component';
const MAT_MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,

  MatSidenavModule,
  MatDividerModule,
  MatCheckboxModule,

  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSliderModule,

  MatTableModule,

  MatTooltipModule,
  MatDialogModule,
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SkiAreaComponent,
    InfoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    MAT_MODULES,

    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
