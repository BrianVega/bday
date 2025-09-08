import { Component, signal, OnInit, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface BirthdayParams {
  startingMonth: number;
  startingDay: number;
}

@Component({
  selector: 'app-birthday-countdown',
  imports: [],
  templateUrl: './birthday-countdown.component.html',
  styleUrl: './birthday-countdown.component.scss'
})
export class BirthdayCountdownComponent implements OnInit
{
  protected remainingDays : WritableSignal<number> = signal(0);
  protected remainingHours : WritableSignal<number> = signal(0);
  protected remainingMinutes : WritableSignal<number> = signal(0);
  protected remainingSeconds : WritableSignal<number> = signal(0);

  protected name : WritableSignal<string> = signal("Bebé");

  private activatedRoute: ActivatedRoute;

  constructor(activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;

    console.log("Birthday Component Created")
  }

  ngOnInit(): void {
    let timeRemaining : TimeRemaining = this.getDifferenceBetweenDates();
    this.startClock(timeRemaining);
  }

  private getDifferenceBetweenDates() : TimeRemaining {
    let timeRemaining : TimeRemaining = {} as TimeRemaining;
    let birthdayParams : BirthdayParams = this.getParams();
    let currentDate : Date = new Date();
    let targetDate : Date = new Date(currentDate.getFullYear(), birthdayParams['startingMonth'] - 1, birthdayParams['startingDay']);

    if (currentDate > targetDate) {
      targetDate.setFullYear(targetDate.getFullYear() + 1);
    }

    let totalSeconds : number = Math.floor((targetDate.getTime() - currentDate.getTime()) / 1000);

    timeRemaining.days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;

    timeRemaining.hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;

    timeRemaining.minutes = Math.floor(totalSeconds / 60);
    totalSeconds %= 60;

    timeRemaining.seconds = totalSeconds;


    return timeRemaining;

  }


  private getParams() : BirthdayParams {
    const startingDay = +this.activatedRoute.snapshot.paramMap.get('day')!;
    const startingMonth = +this.activatedRoute.snapshot.paramMap.get('month')!;
    this.name.set(this.activatedRoute.snapshot.paramMap.get('name') ?? this.name());

    console.log(`Day: ${startingDay}, Month: ${startingMonth}, Name: ${this.name()}`);

    return { startingMonth, startingDay };


  }

  private startClock(timeRemaining : TimeRemaining) : void {
    this.remainingDays.set(timeRemaining.days);
    this.remainingHours.set(timeRemaining.hours);
    this.remainingMinutes.set(timeRemaining.minutes);
    this.remainingSeconds.set(timeRemaining.seconds);

    setInterval(() => {
      if (this.remainingSeconds() > 0) {
        this.remainingSeconds.set(this.remainingSeconds() - 1);
      } else {
        this.remainingSeconds.set(59);
        if (this.remainingMinutes() > 0) {
          this.remainingMinutes.set(this.remainingMinutes() - 1);
        } else {
          this.remainingMinutes.set(59);
          if (this.remainingHours() > 0) {
            this.remainingHours.set(this.remainingHours() - 1);
          } else {
            this.remainingHours.set(23);
            if (this.remainingDays() > 0) {
              this.remainingDays.set(this.remainingDays() - 1);
            } else {
              this.remainingDays.set(0);
              this.remainingHours.set(0);
              this.remainingMinutes.set(0);
              this.remainingSeconds.set(0);
            }
          }
        }
  }}, 1000);

  }

}
