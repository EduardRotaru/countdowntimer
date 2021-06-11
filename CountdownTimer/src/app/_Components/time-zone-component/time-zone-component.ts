import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-zone-component',
  templateUrl: './time-zone-component.html',
  styleUrls: ['./time-zone-component.scss']
})
export class TimeZoneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

// https://timezonedb.com/
// Play with this api (postman first)
// Find 3 fun challenges to do

// List Time Zone
// Get Time Zone
// Convert Time Zone
