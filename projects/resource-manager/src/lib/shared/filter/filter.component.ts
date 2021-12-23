import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Campaign } from '../../models/campaigns/campaign';
import { DateFilter } from '../../models/filter-models/date/date-filter';
import { PriorityFilter } from '../../models/filter-models/priority/priority';
import { RegionFilter } from '../../models/filter-models/region/region-filter';
import { StatusFilter } from '../../models/filter-models/status/status';
import { FilterService } from '../../services/filter/filter.service';

@Component({
  selector: 'lib-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnChanges {
  panelOpenState: boolean = false;
  regions = ['IMEA', 'LATAM', 'EMEA', 'NAC', 'EPAC'];
  regionCopy = this.regions;
  priorityForm: FormGroup;
  regionForm: FormGroup;
  statusForm: FormGroup;
  categoryForm: FormGroup;
  rangeForm: FormGroup;
  startDateForm: FormGroup;
  endDateForm: FormGroup;

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

  regionFilter: RegionFilter = {
    IMEA: false,
    LATAM: false,
    EMEA: false,
    NAC: false,
    EPAC: false,
  };
  dateFilter: DateFilter = {
    startDate: new Date(),
    endDate: new Date(),
  };

  @Input() calendarView: string = '';

  @Input() weekProjects: Campaign[] = [];
  @Input() monthProjects: Campaign[] = [];

  monthRegionCount: any = {
    IMEA: 0,
    LATAM: 0,
    EMEA: 0,
    NAC: 0,
    EPAC: 0,
  };

  weekRegionCount: any = {
    IMEA: 0,
    LATAM: 0,
    EMEA: 0,
    NAC: 0,
    EPAC: 0,
  };

  monthPriorityCount: any = {
    high: 0,
    low: 0,
    medium: 0,
  };

  monthStatusCount: any = {
    defined: 0,
    in_progress: 0,
    completed: 0,
    on_hold: 0,
  };

  weekPriorityCount: any = {
    high: 0,
    low: 0,
    medium: 0,
  };

  weekStatusCount: any = {
    defined: 0,
    in_progress: 0,
    completed: 0,
    on_hold: 0,
  };

  constructor(
    private formBuilder: FormBuilder,
    private filterService: FilterService
  ) {
    this.priorityForm = this.formBuilder.group({
      high: false,
      low: false,
      medium: false,
    });
    this.statusForm = this.formBuilder.group({
      defined: false,
      in_progress: false,
      completed: false,
      on_hold: false,
    });
    this.categoryForm = this.formBuilder.group({
      na: false,
      qa: false,
      series: false,
    });
    this.regionForm = this.formBuilder.group({
      IMEA: false,
      LATAM: false,
      EMEA: false,
      NAC: false,
      EPAC: false,
    });
    this.rangeForm = this.formBuilder.group({
      start: new FormControl(),
      end: new FormControl(),
    });
    this.startDateForm = this.formBuilder.group({
      startDate: new FormControl(''),
    });
    this.endDateForm = this.formBuilder.group({
      endDate: new FormControl(''),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.monthRegionCount = {
      IMEA: 0,
      LATAM: 0,
      EMEA: 0,
      NAC: 0,
      EPAC: 0,
    };

    this.weekRegionCount = {
      IMEA: 0,
      LATAM: 0,
      EMEA: 0,
      NAC: 0,
      EPAC: 0,
    };

    this.monthPriorityCount = {
      high: 0,
      low: 0,
      medium: 0,
    };

    this.monthStatusCount = {
      defined: 0,
      in_progress: 0,
      completed: 0,
      on_hold: 0,
    };

    this.weekPriorityCount = {
      high: 0,
      low: 0,
      medium: 0,
    };

    this.weekStatusCount = {
      defined: 0,
      in_progress: 0,
      completed: 0,
      on_hold: 0,
    };

    this.monthProjects.forEach((campaignVal) => {
      this.monthPriorityCount[campaignVal.priority.toLowerCase()] += 1;
      this.monthStatusCount[campaignVal.status.toLowerCase()] += 1;
      this.monthRegionCount[campaignVal.region] += 1;
    });

    this.weekProjects.forEach((campaignVal) => {
      this.weekPriorityCount[campaignVal.priority.toLowerCase()] += 1;
      this.weekStatusCount[campaignVal.status.toLowerCase()] += 1;
      this.weekRegionCount[campaignVal.region] += 1;
    });
  }

  ngOnInit(): void {
    this.filterService.priorityFilter$.subscribe(
      (priorityFilter: PriorityFilter) => {
        this.priorityForm.setValue(priorityFilter);
      }
    );
    this.filterService.statusFilter$.subscribe((statusFilter: StatusFilter) => {
      this.statusForm.setValue(statusFilter);
    });
  }

  onChangePriority = (priorityForm: FormGroup) => {
    this.priorityFilter = {
      high: priorityForm.value.high,
      low: priorityForm.value.low,
      medium: priorityForm.value.medium,
    };
    this.filterService.onChangePriorityFilter(this.priorityFilter);
    this.filterService.priorityFilter$.next(this.priorityFilter);
  };

  onChangeRegion = (regionForm: FormGroup) => {
    this.regionFilter = {
      IMEA: regionForm.value.IMEA,
      LATAM: regionForm.value.LATAM,
      EMEA: regionForm.value.EMEA,
      NAC: regionForm.value.NAC,
      EPAC: regionForm.value.EPAC,
    };
    this.filterService.regionFilter$.next(this.regionFilter);
  };

  onChangeStatus = (statusForm: FormGroup) => {
    this.statusFilter = {
      defined: statusForm.value.defined,
      in_progress: statusForm.value.in_progress,
      completed: statusForm.value.completed,
      on_hold: statusForm.value.on_hold,
    };
    this.filterService.onChangeStatusFilter(this.statusFilter);
  };

  onChangeDate = (dateForm: FormGroup) => {
    this.dateFilter = {
      startDate: dateForm.value.startDate,
      endDate: dateForm.value.endDate,
    };
    this.filterService.onChangeDateFilter(this.dateFilter);
  };

  search(event: any): void {
    let value = (event.target as HTMLInputElement).value;
    this.regions = this.regionCopy;
    this.regions = this.regions.filter((val) =>
      val.toLowerCase().includes(value.toLowerCase())
    );
  }
}
