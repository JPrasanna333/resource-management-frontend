import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import {
  differenceInDays,
  differenceInHours,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  getDaysInMonth,
  isSameMonth,
  isSameWeek,
  isSameYear,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { Campaign } from '../../models/campaigns/campaign';
import { DateFilter } from '../../models/filter-models/date/date-filter';
import { PriorityFilter } from '../../models/filter-models/priority/priority';
import { RegionFilter } from '../../models/filter-models/region/region-filter';
import { StatusFilter } from '../../models/filter-models/status/status';
import { Resource } from '../../models/resources/resource';
import { CalendarService } from '../../services/calendar/calendar.service';
import { FilterService } from '../../services/filter/filter.service';
import { HeaderService } from '../../services/header/header.service';
import { EmployeeAllocationComponent } from '../employee-allocation/employee-allocation.component';
import { TaskAllocationComponent } from '../task-allocation/task-allocation.component';

@Component({
  selector: 'lib-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnChanges {
  calendarView: string = 'month';
  tabValue: string;
  searchText: string = ''; //third party filter applied

  currentDate = format(new Date(), 'MM/dd/yyyy');

  monthDate: Date = new Date();
  weekDate: Date = new Date();

  currentMonthDates: Date[] = [];
  currentWeekDates: Date[] = [];

  currentWeekProjects: Campaign[] = [];
  currentMonthProjects: Campaign[] = [];
  currentMonthProjectsCopy: Campaign[] = [];
  currentWeekProjectsCopy: Campaign[] = [];

  projectPanelOpenState: boolean = false;
  campaignPanelOpenState: boolean = false;

  priorityFilter: PriorityFilter;
  statusFilter: StatusFilter;
  regionFilter: RegionFilter;
  dateFilter: DateFilter;

  @Input() projects: Campaign[] = [];
  resources: Resource[] = [];

  @Input() resourcesResponse: any;

  constructor(
    private _calendarService: CalendarService,
    private headerService: HeaderService,
    private _filterService: FilterService,
    public dialog: MatDialog
  ) {
    this.tabValue = this.headerService.tabValue;
    this.priorityFilter = {
      high: false,
      low: false,
      medium: false,
    };
    this.statusFilter = {
      defined: false,
      in_progress: false,
      completed: false,
      on_hold: false,
    };
    this.regionFilter = {
      IMEA: false,
      LATAM: false,
      EMEA: false,
      NAC: false,
      EPAC: false,
    };
    this.dateFilter = {
      startDate: new Date(),
      endDate: new Date(),
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onChangeCurrentMonthProjects();
    this.onChangeCurrentWeekProjects();
    if (changes.resourcesResponse) {
      // this._calendarService.pageEvent$.next({
      //   length: this.resourcesResponse.totalElements,
      //   pageSize: this.resourcesResponse.size,
      //   pageIndex: this.resourcesResponse.number,
      // });
      this.resources = this.resourcesResponse.content;
    }

    // this.currentMonthProjects = changes.projects.currentValue
    // this.currentWeekProjects =  changes.projects.currentValue

    // this.currentWeekProjectsCopy =    this.currentWeekProjects
    // this.currentMonthProjectsCopy = this.currentMonthProjects
  }

  ngOnInit(): void {
    this.VerticalTimeLeftSpace();
    this.verticalTimeWeekLeftSpace();

    this._calendarService.currentMonthDates$.subscribe(
      (currentMonthDates: Date[]) => {
        this.currentMonthDates = currentMonthDates;
        this.onChangeCurrentMonthProjects();
      }
    );

    this._calendarService.currentWeekDates$.subscribe(
      (currentWeekDates: Date[]) => {
        this.currentWeekDates = currentWeekDates;
        this.onChangeCurrentWeekProjects();
      }
    );

    this._calendarService.calendarView$.subscribe(
      (currentCalendarView: string) => (this.calendarView = currentCalendarView)
    );

    this._calendarService.monthDate$.subscribe(
      (currentMonthDate: Date) => (this.monthDate = currentMonthDate)
    );

    this._calendarService.weekDate$.subscribe(
      (currentWeekDate: Date) => (this.weekDate = currentWeekDate)
    );

    this.headerService.tabValue$.subscribe(
      (currentTabValue: string) => (this.tabValue = currentTabValue)
    );

    this._filterService.priorityFilter$.subscribe(
      (priorityFilter: PriorityFilter) => {
        this.priorityFilter = priorityFilter;
        this.onChangePriorityFilter();
      }
    );

    this._filterService.statusFilter$.subscribe(
      (statusFilter: StatusFilter) => {
        this.statusFilter = statusFilter;
        this.onChangeStatusFilter();
      }
    );

    this._filterService.regionFilter$.subscribe(
      (regionFilter: RegionFilter) => {
        this.regionFilter = regionFilter;
        this.onChangeRegionFilter();
      }
    );
  }

  onChangePaginator(pageEvent: PageEvent) {
    this._calendarService.pageEvent$.next(pageEvent);
  }

  formatDate = (date: Date) => {
    return format(date, 'MM/dd/yyyy');
  };

  onChangeCurrentMonthProjects = () => {
    this.currentMonthProjects = this.projects.filter(
      (eachCampaign: Campaign) =>
        isSameMonth(eachCampaign.startDate, this.monthDate) ||
        isSameMonth(eachCampaign.endDate, this.monthDate) ||
        isWithinInterval(this.monthDate, {
          start: eachCampaign.startDate,
          end: eachCampaign.endDate,
        })
    );
    this.currentMonthProjectsCopy = [...this.currentMonthProjects];
  };

  onChangeCurrentWeekProjects = () => {
    this.currentWeekProjects = this.projects.filter(
      (eachTask: any) =>
        isSameWeek(eachTask.startDate, this.weekDate) ||
        isSameWeek(eachTask.endDate, this.weekDate) ||
        isWithinInterval(this.weekDate, {
          start: eachTask.startDate,
          end: eachTask.endDate,
        })
    );
    this.currentWeekProjectsCopy = [...this.currentWeekProjects];
  };

  onChangePriorityFilter = () => {
    let temp: Campaign[] = [];
    const isAllFlagsTurnedOff = Object.values(this.priorityFilter).every(
      (val) => val === false
    );
    if (isAllFlagsTurnedOff) {
      this.currentMonthProjectsCopy = [...this.currentMonthProjects];
      this.currentWeekProjectsCopy = [...this.currentWeekProjects];
      return;
    }
    this.currentMonthProjects.forEach((campaign) => {
      for (let [key, value] of Object.entries(this.priorityFilter)) {
        if (
          value &&
          campaign.priority.toString() == key.toUpperCase() &&
          !temp.find((nCampaign) => nCampaign.campaignId == campaign.campaignId)
        ) {
          temp.push(campaign);
        }
      }
    });

    this.currentWeekProjects.forEach((campaign) => {
      for (let [key, value] of Object.entries(this.priorityFilter)) {
        if (
          value &&
          campaign.priority.toString() == key.toUpperCase() &&
          !temp.find((nCampaign) => nCampaign.campaignId == campaign.campaignId)
        ) {
          temp.push(campaign);
        }
      }
    });

    this.currentMonthProjectsCopy = temp;
    this.currentWeekProjectsCopy = temp;
  };

  onChangeStatusFilter = () => {
    let temp: Campaign[] = [];
    const isAllFlagsTurnedOff = Object.values(this.statusFilter).every(
      (val) => val === false
    );
    if (isAllFlagsTurnedOff) {
      this.currentMonthProjectsCopy = [...this.currentMonthProjects];
      this.currentWeekProjectsCopy = [...this.currentWeekProjects];
      return;
    }
    this.currentMonthProjects.forEach((campaign) => {
      for (let [key, value] of Object.entries(this.statusFilter)) {
        if (
          value &&
          campaign.status.toString() == key.toUpperCase() &&
          !temp.find((nCampaign) => nCampaign.campaignId == campaign.campaignId)
        ) {
          temp.push(campaign);
        }
      }
    });

    this.currentWeekProjects.forEach((campaign) => {
      for (let [key, value] of Object.entries(this.statusFilter)) {
        if (
          value &&
          campaign.status.toString() == key.toUpperCase() &&
          !temp.find((nCampaign) => nCampaign.campaignId == campaign.campaignId)
        ) {
          temp.push(campaign);
        }
      }
    });

    this.currentMonthProjectsCopy = temp;
    this.currentWeekProjectsCopy = temp;
  };
  onChangeRegionFilter() {
    let temp: Campaign[] = [];
    const isAllFlagsTurnedOff = Object.values(this.regionFilter).every(
      (val) => val === false
    );
    if (isAllFlagsTurnedOff) {
      this.currentMonthProjectsCopy = [...this.currentMonthProjects];
      this.currentWeekProjectsCopy = [...this.currentWeekProjects];
      return;
    }
    this.currentMonthProjects.forEach((campaign) => {
      for (let [key, value] of Object.entries(this.regionFilter)) {
        if (
          value &&
          campaign.region == key.toUpperCase() &&
          !temp.find((c) => c.campaignId == campaign.campaignId)
        ) {
          temp.push(campaign);
        }
      }
    });

    this.currentWeekProjects.forEach((campaign) => {
      for (let [key, value] of Object.entries(this.regionFilter)) {
        if (
          value &&
          campaign.region == key.toUpperCase() &&
          !temp.find((c) => c.campaignId == campaign.campaignId)
        ) {
          temp.push(campaign);
        }
      }
    });

    this.currentMonthProjectsCopy = temp;
    this.currentWeekProjectsCopy = temp;
  }

  monthLeftSpace = (startDate: Date): string => {
    let margin;
    let noOfDaysInCurrentMonth = getDaysInMonth(this.monthDate);
    let eachContainerWidth = 84 / noOfDaysInCurrentMonth;

    // check if startDate and currentDate are equal
    if (
      this.monthDate.getMonth() === startDate.getMonth() &&
      this.monthDate.getFullYear() === startDate.getFullYear()
    ) {
      let days = startDate.getDate() - 1;
      margin = days * eachContainerWidth + 'vw';
      return margin;
    }
    return 0 + 'vw';
  };

  weekLeftSpace = (startDate: Date): string => {
    let margin;
    let eachContainerWidth = 84 / 7;

    // check if startDate and currentDate are equal
    if (
      isSameWeek(this.weekDate, startDate) &&
      isSameMonth(this.weekDate, startDate) &&
      isSameYear(this.weekDate, startDate)
    ) {
      let days = getDay(startDate);
      margin = days * eachContainerWidth + 'vw';
      return margin;
    }
    return 0 + 'vw';
  };

  monthWidth = (startDate: Date, endDate: Date): string => {
    let width;
    let calculateDifference: number;
    let currentMonth = this.monthDate;
    let findStartDateOfEndMonth = startOfMonth(endDate);
    let findEndDateOfStartMonth = endOfMonth(startDate);
    let noOfDaysInCurrentMonth = getDaysInMonth(currentMonth);
    let noOfDaysInStartMonth = getDaysInMonth(startDate);
    let noOfDaysInEndMonth = getDaysInMonth(endDate);

    // Check if startDate and endDate are in same month
    if (isSameMonth(startDate, endDate) && isSameYear(startDate, endDate)) {
      let eachContainerWidth = 84 / noOfDaysInStartMonth;
      calculateDifference = differenceInDays(endDate, startDate);
      width = (calculateDifference + 1) * eachContainerWidth + 'vw';
      return width;
    }
    // Check if endDate month and current month are same month
    else if (
      isSameMonth(currentMonth, endDate) &&
      isSameYear(currentMonth.getFullYear(), endDate.getFullYear())
    ) {
      let eachContainerWidth = 84 / noOfDaysInEndMonth;
      calculateDifference = differenceInDays(endDate, findStartDateOfEndMonth);
      width = (calculateDifference + 1) * eachContainerWidth + 'vw';
      return width;
    }
    // Check if startDate month and current month are same month
    else if (
      isSameMonth(startDate, currentMonth) &&
      isSameYear(startDate, currentMonth)
    ) {
      let eachContainerWidth = 84 / noOfDaysInStartMonth;
      calculateDifference = differenceInDays(
        findEndDateOfStartMonth,
        startDate
      );
      width = (calculateDifference + 1) * eachContainerWidth + 'vw';
      return width;
    }
    // check if both startDate and endDate are not related to current month
    else {
      let eachContainerWidth = 84 / noOfDaysInCurrentMonth;
      width = noOfDaysInCurrentMonth * eachContainerWidth + 'vw';
      return width;
    }
  };

  weekWidth = (startDate: Date, endDate: Date) => {
    let calculateDifference: number;
    let eachContainerWidth = 84 / 7;
    let width;

    if (
      isSameWeek(endDate, startDate) &&
      isSameMonth(startDate, endDate) &&
      isSameYear(startDate, endDate)
    ) {
      calculateDifference = differenceInDays(endDate, startDate);
      width = (calculateDifference + 1) * eachContainerWidth + 'vw';
      return width;
    } else if (isSameWeek(endDate, this.weekDate)) {
      calculateDifference = differenceInDays(
        endDate,
        startOfWeek(this.weekDate, { weekStartsOn: 1 })
      );
      width = (calculateDifference + 1) * eachContainerWidth + 'vw';
      return width;
    } else if (isSameWeek(startDate, this.weekDate)) {
      calculateDifference = differenceInDays(
        endOfWeek(this.weekDate),
        startDate
      );
      width = (calculateDifference + 1) * eachContainerWidth + 'vw';
      return width;
    } else {
      width = 7 * eachContainerWidth + 'vw';
      return width;
    }
  };

  openEmployeeDialog() {
    const dialogRef = this.dialog.open(EmployeeAllocationComponent, {
      height: '100vh',
      width: '37vw',
      panelClass: 'custom-dialog-container',
      position: {
        right: '0',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openTaskAllocation() {
    const dialogRef = this.dialog.open(TaskAllocationComponent, {
      height: '100vh',
      width: '40vw',
      panelClass: 'custom-dialog-container',
      position: {
        right: '0',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  VerticalTimeLeftSpace = () => {
    const currentDateTime = new Date();
    let eachContainerWidth = 84 / getDaysInMonth(this.monthDate);
    const eachHourWidth = eachContainerWidth / 24;
    const hoursDifference = differenceInHours(
      currentDateTime,
      new Date(
        currentDateTime.getFullYear(),
        currentDateTime.getMonth(),
        currentDateTime.getDate()
      )
    );
    const leftSpace = eachHourWidth * hoursDifference;
    return `${leftSpace}vw`;
  };

  verticalTimeWeekLeftSpace = () => {
    const currentDateTime = new Date();
    let eachContainerWidth = 84 / 7;
    const eachHourWidth = eachContainerWidth / 24;
    const hoursDifference = differenceInHours(
      currentDateTime,
      new Date(
        currentDateTime.getFullYear(),
        currentDateTime.getMonth(),
        currentDateTime.getDate()
      )
    );
    const leftSpace = eachHourWidth * hoursDifference;
    return `${leftSpace}vw`;
  };
}
