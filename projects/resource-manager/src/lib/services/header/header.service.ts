import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  tabValue: string = 'projects';
  tabValue$: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.tabValue
  );

  constructor() {}

  onChangeTabValue = (currentTabValue: string) => {
    this.tabValue = currentTabValue;
    this.tabValue$.next(this.tabValue);
  };
}
