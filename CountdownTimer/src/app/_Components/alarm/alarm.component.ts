import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent implements OnInit {
  currentTime!: any;
  timeForm!: FormGroup;

  hours!: number[]; 
  minutes!: string[];

  periods: string[] = ['AM', 'PM'];

  daysOfTheWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  selectedDays: string[]= [];
  dropdownSettings = {};

  alarms: Alarm[] = [];

  constructor(private fb: FormBuilder) { 
    this.hours = Array.from({length: 12}, (_, i) => ++i);
    this.minutes = Array.from(new Array(60), (x, i) => i++ < 9 ? `0${i}` : `${i}`);
  }

  ngOnInit(): void {
    this.timeForm = this.fb.group({
      hour: [''],
      minute: [''],
      days: [''],
      period: ['']
    });

    this.timeForm.controls['hour'].setValue(1, {onlySelf: true});
    this.timeForm.controls['minute'].setValue('01', {onlySelf: true});
    this.timeForm.controls['period'].setValue('AM', {onlySelf: true});

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  get hourValue(){
    return this.timeForm.get('hour')?.value;
  }

  get minuteValue(){
    return this.timeForm.get('minute')?.value;
  }

  get daysValue(){
    return this.timeForm.get('days')?.value;
  }

  get periodValue(){
    return this.timeForm.get('period')?.value;
  }

  setAlarm() {
    this.alarms.push({
      "hour": this.hourValue,
      "minute": this.minuteValue,
      "day": this.daysValue,
      "period": this.periodValue
    });

    var date = new Date();
    date.setHours(this.hourValue);
    date.setMinutes(this.minuteValue);

    var diff = new Date().getTime() - date.getTime();

    setTimeout(() => {
      alert('alarm is up');
    }, diff);

    this.selectedDays = [];
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  } 

  onItemDeSelect(item: any) {

  }

  removeAlarm(index: any){
    this.alarms.splice(index, 1);
  }

  resetSelection() {

  }
}

export class Alarm {
  public hour: string;
  public minute: string;
  public day: string[];
  public period: string;

  constructor(hour: string, minute: string, day: string[], period: string) {
    this.hour = hour;
    this.minute = minute;
    this.day = day;
    this.period = period;
  }
}

// Display all alarms, remove days if so
// Document more, if is PM, AM
// Make it ring at the right time
