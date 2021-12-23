import { Component, Input, OnInit } from '@angular/core';
import { Campaign } from '../../models/campaigns/campaign';
import { CalendarService } from '../../services/calendar/calendar.service';

@Component({
  selector: 'lib-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  calendarView: string;
  panelOpenState: boolean = false;
  currentWeekTasks: any = [];
  currentMonthTasks: any = [];
  weekDate: Date = new Date();
  monthDate: any = new Date();

  @Input() projects: Campaign[] = [];

  constructor(private calendarService: CalendarService) {
    this.calendarView = this.calendarService.calendarView;
  }

  ngOnInit(): void {
    this.calendarService.weekDate$.subscribe(
      (weekDate: Date) => (this.weekDate = weekDate)
    );
    this.calendarService.monthDate$.subscribe(
      (monthDate: Date) => (this.monthDate = monthDate)
    );
    this.calendarService.calendarView$.subscribe(
      (currentCalendarView: string) => (this.calendarView = currentCalendarView)
    );
  }
}
