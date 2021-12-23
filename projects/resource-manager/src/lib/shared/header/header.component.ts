import { FilterService } from './../../services/filter/filter.service';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DisplayFieldsComponent } from '../display-fields/display-fields.component';
import { CalendarService } from '../../services/calendar/calendar.service';
import { HeaderService } from '../../services/header/header.service';
import { PriorityFilter } from '../../models/filter-models/priority/priority';
import { StatusFilter } from '../../models/filter-models/status/status';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  calendarView: string;
  removable = false;
  monthDate: Date = new Date();
  weekDate: Date = new Date();
  filterChips: string[] = [];

  priorityFilter: PriorityFilter = {
    high: false,
    low: false,
    medium: false,
  };

  statusFilter: StatusFilter = {
    defined: false,
    in_progress: false,
    completed: false,
    on_hold: false,
  };

  @Input() role: string = '';

  constructor(
    public dialog: MatDialog,
    private calendarService: CalendarService,
    private headerService: HeaderService,
    private filterService: FilterService
  ) {
    this.calendarView = this.calendarService.calendarView;
  }

  openDisplayFields() {
    const dialogRef = this.dialog.open(DisplayFieldsComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onToggle = (currentTabValue: string) => {
    this.headerService.onChangeTabValue(currentTabValue);
  };

  onClickNextMonth = (): void => {
    this.calendarService.onClickNextMonth();
  };

  onClickNextWeek = (): void => {
    this.calendarService.onClickNextWeek();
  };

  onClickPreviousMonth = (): void => {
    this.calendarService.onClickPreviousMonth();
  };

  onClickPreviousWeek = (): void => {
    this.calendarService.onClickPreviousWeek();
  };

  onClickToday(event: any) {
    console.log(event);
    this.calendarService.monthDate$.next(new Date(event.target.value));
    this.calendarService.weekDate$.next(new Date(event.target.value));

    this.calendarService.currentMonthDates$.next(
      this.calendarService.getMonthData(new Date(event.target.value))
    );
    this.calendarService.currentWeekDates$.next(
      this.calendarService.getWeekData(new Date(event.target.value))
    );
  }

  onClickCalendarViewButton = (currentCalendarView: string): void => {
    this.calendarService.calendarView$.next(currentCalendarView);
  };

  ngOnInit(): void {
    console.log(this.role);
    this.calendarService.calendarView$.subscribe(
      (currentCalendarView: string) => (this.calendarView = currentCalendarView)
    );
    this.calendarService.monthDate$.subscribe(
      (currentMonthDate: Date) => (this.monthDate = currentMonthDate)
    );
    this.calendarService.weekDate$.subscribe(
      (currentWeekDate: Date) => (this.weekDate = currentWeekDate)
    );

    this.filterService.priorityFilter$.subscribe(
      (priorityFilter: PriorityFilter) => {
        this.priorityFilter = priorityFilter;
        this.onchangePriorityFilter();
      }
    );
    this.filterService.statusFilter$.subscribe((statusFilter: StatusFilter) => {
      this.statusFilter = statusFilter;
      this.onchangeStatusFilter();
    });
  }

  onchangePriorityFilter() {
    for (let [key, value] of Object.entries(this.priorityFilter)) {
      if (value == true) {
        if (!this.filterChips.includes(key)) {
          this.filterChips.push(key);
        }
      } else if (value == false) {
        if (this.filterChips.includes(key)) {
          this.filterChips = this.filterChips.filter((chip) => key != chip);
        }
      }
    }
  }

  onchangeStatusFilter() {
    for (let [key, value] of Object.entries(this.statusFilter)) {
      if (value == true) {
        if (!this.filterChips.includes(key)) {
          this.filterChips.push(key);
        }
      } else if (value == false) {
        if (this.filterChips.includes(key)) {
          this.filterChips = this.filterChips.filter((chip) => key != chip);
        }
      }
    }
  }

  removeChips(chip: string) {
    this.filterChips;
    if (this.filterChips.includes(chip)) {
      this.filterChips = this.filterChips.filter((nchip) => chip != nchip);

      if (chip == 'high' || chip == 'low' || chip == 'medium') {
        this.priorityFilter[chip] = false;
        this.filterService.priorityFilter$.next(this.priorityFilter);
      } else if (
        chip == 'defined' ||
        chip == 'in_progress' ||
        chip == 'on_hold' ||
        chip == 'completed'
      ) {
        this.statusFilter[chip] = false;
        this.filterService.statusFilter$.next(this.statusFilter);
      }
    }
  }

  high(ob: MatCheckboxChange) {
    let v = true;
  }
}
