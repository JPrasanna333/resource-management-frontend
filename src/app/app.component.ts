import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { Campaign } from './models/campaigns/campaign';
import { Resource } from './models/resources/resource';
import { ProjectsService } from './services/projects/projects.service';
import { ResourcesService } from './services/resources/resources.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'resource-management-workspace';

  date: Date = new Date();
  currentView: string = 'month';

  projects: Campaign[] = [];
  resources: Resource[] = [];

  constructor(
    private projectsService: ProjectsService,
    private resourceService: ResourcesService
  ) {
    this.projectsService
      .getAllProjectsByInterval(startOfMonth(this.date), endOfMonth(this.date))
      .subscribe(
        (responseProjects: Campaign[]) => (this.projects = responseProjects)
      );

    this.resourceService
      .getAllResource(0, 5)
      .subscribe((responseResources: any) => {
        this.resources = responseResources;
      });
  }

  onChangeCalendarView(calendarView: string) {
    this.currentView = calendarView;
  }

  onChangeDate(date: Date) {
    if (this.currentView == 'month') {
      console.log('month api');
      this.projectsService
        .getAllProjectsByInterval(startOfMonth(date), endOfMonth(date))
        .subscribe(
          (responseProjects: Campaign[]) => (this.projects = responseProjects)
        );
    } else {
      console.log('week api');
      this.projectsService
        .getAllProjectsByInterval(startOfWeek(date), endOfWeek(date))
        .subscribe(
          (responseProjects: Campaign[]) => (this.projects = responseProjects)
        );
    }
  }

  onChangePagination(pageEvent: PageEvent) {
    this.resourceService
      .getAllResource(pageEvent.pageIndex, pageEvent.pageSize)
      .subscribe((responseResources: any) => {
        this.resources = responseResources;
      });
  }
}
