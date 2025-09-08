import {Component, signal, OnInit, WritableSignal, OnDestroy, Signal, computed} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { InvalidDateError } from '../../exceptions/InvalidDateError';

export interface BirthdayParams {
  startingMonth: number;
  startingDay: number;
}

@Component({
  selector: 'app-birthday-countdown',
  imports: [],
  templateUrl: './birthday-countdown.component.html',
  styleUrls: ['./birthday-countdown.component.scss'],
  standalone: true,
})
export class BirthdayCountdownComponent implements OnInit, OnDestroy {
  remainingDays: WritableSignal<number> = signal(0);
  remainingHours: WritableSignal<number> = signal(0);
  remainingMinutes: WritableSignal<number> = signal(0);
  remainingSeconds: WritableSignal<number> = signal(0);
  name: WritableSignal<string> = signal("Bebé");
  isBirthday: Signal<boolean> = computed(() => {
    return this.remainingDays() === 0 && this.remainingHours() === 0
    && this.remainingMinutes() === 0 && this.remainingSeconds() === 0;
  });

  private timerId?: number;
  private targetMs: number = 0;

  private activatedRoute: ActivatedRoute;

  constructor(activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
    console.log("Birthday Component Created")
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.setTargetFromParams();
      this.recomputeRemaining();
    });
    this.startClock();
  }


  private getParams(): BirthdayParams {
    const startingDay = +this.activatedRoute.snapshot.paramMap.get('day')!;
    const startingMonth = +this.activatedRoute.snapshot.paramMap.get('month')!;
    this.name.set(this.activatedRoute.snapshot.paramMap.get('name') ?? this.name());

    if (startingMonth < 1 || startingMonth > 12) {
      throw new InvalidDateError(`Invalid month number, ${startingMonth} is not in the range 1 - 12`);
    }

    const testDayInput: Date = new Date(new Date().getFullYear(), startingMonth, 0);
    const numberOfDaysOfMonth: number = testDayInput.getDate();
    console.log(numberOfDaysOfMonth);

    if (startingDay < 1 || numberOfDaysOfMonth < startingDay) {
      throw new InvalidDateError(`Day ${startingDay} is not in the days range of the ${startingMonth} number month`);
    }

    return {startingMonth, startingDay};
  }

  private setTargetFromParams() {
    let birthdayParams: BirthdayParams = this.getParams();

    const currentDate: Date = new Date();
    const targetDate: Date = new Date(currentDate.getFullYear(), birthdayParams['startingMonth'] - 1, birthdayParams['startingDay']);

    if (targetDate.getTime() <= currentDate.getTime()) {
      targetDate.setFullYear(currentDate.getFullYear() + 1);
    }

    this.targetMs = targetDate.getTime();
  }

  private startClock(): void {
    this.timerId = window.setInterval(() => {
      this.recomputeRemaining();
    }, 1000);
  }

  private recomputeRemaining(): void {
    const msLeft = Math.max(0, this.targetMs - Date.now());

    // if (msLeft === 0 || (this.remainingMinutes() != 0 && this.remainingMinutes() < 27)) { // Dummy check to see if ngIf works. Do not asses this please
    if (msLeft === 0) {
      this.remainingDays.set(0);
      this.remainingHours.set(0);
      this.remainingMinutes.set(0);
      this.remainingSeconds.set(0);

      this.clearTimer();
      return;
    }

    let total = Math.floor(msLeft / 1000);

    const days = Math.floor(total / 86400);
    total %= 86400;
    const hours = Math.floor(total / 3600);
    total %= 3600;
    const minutes = Math.floor(total / 60);
    total %= 60;
    const seconds = total;

    this.remainingDays.set(days);
    this.remainingHours.set(hours);
    this.remainingMinutes.set(minutes);
    this.remainingSeconds.set(seconds);


  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  clearTimer (): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }

  transformToTwoDigits(signalNumber: number): string {
    return signalNumber.toString().padStart(2, '0');
  }
}
