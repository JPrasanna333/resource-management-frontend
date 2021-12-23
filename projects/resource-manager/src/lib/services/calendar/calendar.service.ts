import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {
  isSameMonth,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  addDays,
  lastDayOfMonth,
  lastDayOfWeek,
  subDays,
  endOfWeek,
  startOfDay,
} from 'date-fns';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  calendarView: string = 'month';
  calendarView$: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.calendarView
  );

  monthDate: Date = new Date();
  monthDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(this.monthDate);
  weekDate: Date = new Date();
  weekDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(this.weekDate);

  pageEvent$: BehaviorSubject<PageEvent> = new BehaviorSubject<PageEvent>({
    pageIndex: 0,
    pageSize: 0,
    length: 0,
  });

  takeWeek(start: Date) {
    let date = startOfWeek(startOfDay(start), { weekStartsOn: 1 });

    return function () {
      const week = [...Array(7)].map((_, i) => addDays(date, i));
      date = addDays(week[6], 1);
      return week;
    };
  }

  takeMonth = (start: Date) => {
    let month: any[] = [];
    let date = start;

    function lastDayOfRange(range: any) {
      return range[range.length - 1][6];
    }

    return function () {
      function takeWeek(start = new Date()) {
        let date = startOfWeek(startOfDay(start), { weekStartsOn: 1 });

        return function () {
          const week = [...Array(7)].map((_, i) => addDays(date, i));
          date = addDays(week[6], 1);
          return week;
        };
      }
      const weekGen = takeWeek(startOfMonth(date));
      const endDate = startOfDay(endOfWeek(endOfMonth(date)));
      month.push(weekGen());

      while (lastDayOfRange(month) < endDate) {
        month.push(weekGen());
      }

      const range = month;
      month = [];
      date = addDays(lastDayOfRange(range), 1);

      return range;
    };
  };

  getWeekData = (date: Date): Date[] => {
    this.currentWeekDates = this.takeWeek(date)();
    return this.currentWeekDates;
  };

  getMonthData = (date: Date): Date[] => {
    let monthData: Date[] = [];
    this.takeMonth(date)().forEach((eachWeek: any) =>
      eachWeek.forEach((eachDay: Date) => {
        if (isSameMonth(eachDay, date)) {
          monthData.push(eachDay);
        }
      })
    );
    this.currentMonthDates = monthData;
    return monthData;
  };

  currentMonthDates: Date[] = [];
  currentMonthDates$: BehaviorSubject<Date[]> = new BehaviorSubject<Date[]>(
    this.getMonthData(this.monthDate)
  );
  currentWeekDates: Date[] = [];
  currentWeekDates$: BehaviorSubject<Date[]> = new BehaviorSubject<Date[]>(
    this.getWeekData(this.weekDate)
  );

  constructor() {}

  onClickPreviousMonth = (): void => {
    let firstDayMonth = startOfMonth(this.monthDate);
    this.monthDate = subDays(firstDayMonth, 1);
    this.monthDate$.next(this.monthDate);
    this.getMonthData(this.monthDate);
    this.currentMonthDates$.next(this.currentMonthDates);
  };

  onClickPreviousWeek = (): void => {
    let firstDayWeek = startOfWeek(this.weekDate, { weekStartsOn: 1 });
    this.weekDate = subDays(firstDayWeek, 1);
    this.weekDate$.next(this.weekDate);
    this.getWeekData(this.weekDate);
    this.currentWeekDates$.next(this.currentWeekDates);
  };

  onClickNextMonth = (): void => {
    let lastDayMonth = lastDayOfMonth(this.monthDate);
    this.monthDate = addDays(lastDayMonth, 1);
    this.monthDate$.next(this.monthDate);
    this.getMonthData(this.monthDate);
    this.currentMonthDates$.next(this.currentMonthDates);
  };

  onClickNextWeek = (): void => {
    let lastDayWeek = lastDayOfWeek(this.weekDate);
    this.weekDate = addDays(lastDayWeek, 1);
    this.weekDate$.next(this.weekDate);
    this.getWeekData(this.weekDate);
    this.currentWeekDates$.next(this.currentWeekDates);
  };

  getCurrentCalendarView = (): string => {
    return this.calendarView;
  };

  onChangeCalendarView = (currentCalendarView: string): void => {
    this.calendarView = currentCalendarView;
    this.calendarView$.next(this.calendarView);
  };

  getCurrentMonthDates = (): Date[] => {
    return this.currentMonthDates;
  };

  getCurrentWeekDates = (): Date[] => {
    return this.currentWeekDates;
  };
}
