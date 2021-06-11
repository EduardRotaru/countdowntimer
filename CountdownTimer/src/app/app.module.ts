import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StopwatchComponent } from './_Components/stopwatch/stopwatch.component';
import { TimeZoneComponent } from './_Components/time-zone-component/time-zone-component';
import { AlarmComponent } from './_Components/alarm/alarm.component';
import { TimerComponent } from './_Components/timer-component/timer-component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    StopwatchComponent,
    TimeZoneComponent,
    TimerComponent,
    AlarmComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
