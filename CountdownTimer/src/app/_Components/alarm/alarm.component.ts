import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent implements OnInit {

  currentTime!: any;

  constructor() { }

  ngOnInit(): void {

  }

}

// How alarm works
// Set a time in a form AM PM e.g 5:45 PM 
// Set interval current time till its reaching the time set

// Features
// Switch european time to imperial time
// Play a Sound
