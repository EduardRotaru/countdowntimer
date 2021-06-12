import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';

// cheated like an idiot https://stackoverflow.com/questions/26329900/how-do-i-display-millisecond-in-my-stopwatch

@Component({
  selector: 'app-timer-component',
  templateUrl: './timer-component.html',
  styleUrls: ['./timer-component.scss']
})
export class TimerComponent implements OnInit {

   timeBegan: Date = new Date();
   timeStopped: Date =  new Date();
   stoppedDuration = 0;
   started!: any;

   timerText: string = '';

  constructor() { }

  ngOnInit(): void {
  }

   start() {
    if (this.timeBegan === null) {
        this.timeBegan = new Date();
    }

    if (this.timeStopped !== null) {
        this.stoppedDuration += (new Date().getTime() - this.timeStopped.getTime());
    }

    this.started = setInterval(() => {
      this.timerText = this.startTimer();
    }, 10);	
}

 stop() {
    this.timeStopped = new Date();
    clearInterval(this.started);
}
 
 reset() {
    clearInterval(this.started);
    this.stoppedDuration = 0;
    this.timeBegan = new Date();
    this.timeStopped = new Date();

    this.timerText = "00:00:00.000";
}

  startTimer(){
    var currentTime = new Date().getTime();

    var timeElapsed = new Date(currentTime - this.timeBegan.getTime() - this.stoppedDuration);
    var hour = timeElapsed.getUTCHours();
    var min = timeElapsed.getUTCMinutes();
    var s = timeElapsed.getUTCSeconds();
    var ms = timeElapsed.getUTCMilliseconds();

    return (hour > 9 ? `${hour}` : `0${hour}`) + " " +
          (min > 9 ?`${min}` : `0${min}`) + " " +
          (s > 9 ?`${s}` : `0${s}`) + " " +
          (ms > 9 ?`${ms}` : `0${ms}`);
  }

}
