import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DateFilter } from '../../models/filter-models/date/date-filter';
import { PriorityFilter } from '../../models/filter-models/priority/priority';
import { RegionFilter } from '../../models/filter-models/region/region-filter';
import { StatusFilter } from '../../models/filter-models/status/status';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  priorityFilter: PriorityFilter = {
    high: false,
    low: false,
    medium: false,
  };
  priorityFilter$: BehaviorSubject<PriorityFilter> =
    new BehaviorSubject<PriorityFilter>(this.priorityFilter);

  regionFilter: RegionFilter = {
    IMEA: false,
    LATAM: false,
    EMEA: false,
    NAC: false,
    EPAC: false,
  };
  regionFilter$: BehaviorSubject<RegionFilter> =
    new BehaviorSubject<RegionFilter>(this.regionFilter);

  statusFilter: StatusFilter = {
    defined: false,
    in_progress: false,
    completed: false,
    on_hold: false,
  };
  statusFilter$: BehaviorSubject<StatusFilter> =
    new BehaviorSubject<StatusFilter>(this.statusFilter);

  dateFilter: DateFilter = {
    startDate: new Date(),
    endDate: new Date(),
  };
  dateFilter$: BehaviorSubject<DateFilter> = new BehaviorSubject<DateFilter>(
    this.dateFilter
  );

  constructor() {}

  onChangePriorityFilter = (priorityForm: PriorityFilter) => {
    this.priorityFilter = priorityForm;
    this.priorityFilter$.next(this.priorityFilter);
  };

  onChangeRegionFilter = (regionForm: RegionFilter) => {
    this.regionFilter = regionForm;
    this.regionFilter$.next(this.regionFilter);
  };
  onChangeStatusFilter = (statusForm: StatusFilter) => {
    this.statusFilter = statusForm;
    this.statusFilter$.next(this.statusFilter);
  };

  onChangeDateFilter(dateForm: DateFilter) {
    this.dateFilter = dateForm;
    this.dateFilter$.next(this.dateFilter);
  }
}
