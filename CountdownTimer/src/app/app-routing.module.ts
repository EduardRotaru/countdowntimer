import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AlarmComponent } from "./_Components/alarm/alarm.component";
import { StopwatchComponent } from "./_Components/stopwatch/stopwatch.component";
import { TimeZoneComponent } from "./_Components/time-zone-component/time-zone-component";
import { TimerComponent } from "./_Components/timer-component/timer-component";

const routes: Routes = [
    {path: '', component: TimeZoneComponent},
    {path: 'stopwatch', component: StopwatchComponent},
    {path: 'alarm', component: AlarmComponent},
    {path: 'timer', component: TimerComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}