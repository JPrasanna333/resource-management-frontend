import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Campaign } from './models/campaigns/campaign';
import { Resource } from './models/resources/resource';
import { CalendarService } from './services/calendar/calendar.service';
import { HeaderService } from './services/header/header.service';

@Component({
  selector: 'lib-resource-manager',
  templateUrl: './resource-manager.component.html',
  styleUrls: ['./resource-manager.component.scss'],
})
export class ResourceManagerComponent implements OnInit {
  tabValue: string;

  @Input() projects: Campaign[] = [];
  @Input() resources: Resource[] = [];
  @Input() role: string = '';

  @Output() date: EventEmitter<Date> = new EventEmitter<Date>();

  @Output() calendarView: EventEmitter<string> = new EventEmitter<string>();

  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  constructor(
    private headerService: HeaderService,
    private calendarService: CalendarService
  ) {
    this.tabValue = this.headerService.tabValue;

    this.calendarService.calendarView$.subscribe(
      (currentCalendarView: string) =>
        this.calendarView.emit(currentCalendarView)
    );

    this.calendarService.monthDate$.subscribe((currentMonthDate: Date) =>
      this.date.emit(currentMonthDate)
    );

    this.calendarService.weekDate$.subscribe((currentWeekDate: Date) =>
      this.date.emit(currentWeekDate)
    );

    this.calendarService.pageEvent$.subscribe((pageEvent) =>
      this.pageEvent.emit(pageEvent)
    );
  }

  ngOnInit(): void {
    this.headerService.tabValue$.subscribe(
      (currentTabValue) => (this.tabValue = currentTabValue)
    );
  }
}
