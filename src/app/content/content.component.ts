import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { Campaign } from '../models/campaigns/campaign';
import { Resource } from '../models/resources/resource';
import { LoginService } from '../services/login/login.service';
import { ProjectsService } from '../services/projects/projects.service';
import { ResourcesService } from '../services/resources/resources.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  ngOnInit(): void {}
  
  date: Date = new Date();
  currentView: string = 'month';

  projects: Campaign[] = [];
  resources: Resource[] = [];
  role: string = '';

  constructor(
    private projectsService: ProjectsService,
    private resourceService: ResourcesService,
    private loginService: LoginService
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

    this.loginService.role$.subscribe((role) => {
      this.role = role;
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
