import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit {
  timerForm!: FormGroup;

   time: Date = new Date();
   timer: any = "Not Set";
   date!: any;

  months!: string[];
  monthsTemp!: string[];
  days!: string[];
  daysTemp!: string[];
  hours!: string[];
  minutes!: string[];
  seconds!: string[];

  timeout: any;

  defaultValue = '01';
  defaultYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();

  monthsDisabled: boolean = false;

   constructor(private fb: FormBuilder) {
    this.months =  Array.from(new Array(12), (x, i) => i++ < 9 ? `0${i}` : `${i}`);
    this.monthsTemp = this.months;
    this.days = Array.from(new Array(31), (x, i) => i++ < 9 ? `0${i}` : `${i}`);
    this.daysTemp = this.days;
    this.hours = Array.from(new Array(12), (x, i) => i++ < 9 ? `0${i}` : `${i}`);
    this.minutes = Array.from(new Array(60), (x, i) => i++ < 9 ? `0${i}` : `${i}`);
    this.seconds = this.minutes;
   }

  ngOnInit() {
    this.timerForm = this.fb.group({
      year: ['', [Validators.min(this.defaultYear), Validators.max(2100), Validators.required]],
      month: ['', [Validators.min(1), Validators.max(12)]],
      day: ['', [Validators.min(1), Validators.max(31)]], 
      hour: ['', [Validators.min(1), Validators.max(12)]],
      minute: ['', [Validators.min(1), Validators.max(60)]],
      seconds: ['', [Validators.min(1), Validators.max(60)]]
    });

    this.setDefaultDDL();
    this.onChanges();
  }

  setDefaultDDL(){
    this.timerForm.controls['month'].setValue(this.defaultValue, {onlySelf: true});
    this.timerForm.controls['day'].setValue(this.defaultValue, {onlySelf: true});
    this.timerForm.controls['hour'].setValue(this.defaultValue, {onlySelf: true});
    this.timerForm.controls['minute'].setValue(this.defaultValue, {onlySelf: true});
    this.timerForm.controls['seconds'].setValue(this.defaultValue, {onlySelf: true});
  }

  get yearControlValue(){
    return this.timerForm.get('year')?.value;
  }

  get monthControlValue(){
    return this.timerForm.get('month')?.value;
  }

  get dayControlValue(){
    return this.timerForm.get('day')?.value;
  }

  get hourControlValue(){
    return this.timerForm.get('hour')?.value;
  }

  get minuteControlValue(){
    return this.timerForm.get('minute')?.value;
  }

  get secondControlValue(){
    return this.timerForm.get('seconds')?.value;
  }

  onChanges() {
    let path = this.timerForm;

    path.get('month')?.valueChanges.subscribe(month => {
      var m: number = +month;

      if (m != 2) {
        if (m % 2 == 0) {
          this.daysTemp = this.days.slice(0, -1);
        }
  
        if (m % 2 != 0) {
          var index = this.daysTemp.findIndex(x => x === `${31}`);

          if (index === -1)
            this.daysTemp.push(`${31}`);
        }
      }
      else {
        this.setLeapYear();
      }
    });

    path.get('year')?.valueChanges.subscribe(year => {
      var y = +year;
      
      if(y === this.defaultYear) {
        this.monthsTemp = this.months.slice(this.currentMonth, this.months.length - 1);
        this.timerForm.controls['month'].setValue(this.monthsTemp[0], {onlySelf: true});

      }
      else{
        this.monthsTemp = this.months;
      }
      
      if (this.monthControlValue === '02')
        this.setLeapYear();
    });
  }

  private isLeapYear(year: number): boolean {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
  }

  private setLeapYear():void {
    if (this.isLeapYear(this.yearControlValue)){
      this.daysTemp = this.days.slice(0, -3)
    }
    else {
      this.daysTemp = this.days.slice(0, -4)
    }
  }

  startTimeDownSetInterval() {
    var date = this.buildDate();
    var countDownDate = date.getTime();

    if(this.timeout !== undefined)
      clearInterval(this.timeout);

    this.timeout = setInterval(() => {

      var now = new Date().getTime();
      var distance = countDownDate - now;
    
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
      if(distance < 1){
        this.timer = "Countdown Expired";
        clearInterval(this.timeout);
      }
      else{
        this.timer = days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds ";
      }
  },1000);
  }

  private buildDate(): Date {
    return new Date(`${this.yearControlValue}-${this.monthControlValue}-${this.dayControlValue}T${this.hourControlValue}:${this.minuteControlValue}:${this.secondControlValue}`);
  } 

  resetForm(){
    this.timerForm.reset();
    this.setDefaultDDL();
    clearInterval(this.timeout);
    this.timer = "Countdown not set";
  }

}
