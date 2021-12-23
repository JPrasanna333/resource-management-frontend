import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = '/api';

  role: string = '';
  // calendarView$: BehaviorSubject<string> = new BehaviorSubject<string>(
  //   this.calendarView
  // );
  role$: BehaviorSubject<string> = new BehaviorSubject<string>(this.role);

  // requestHeader = new HttpHeaders({
  //   'N0-Auth': 'true',
  // });
  constructor(private _http: HttpClient) {}

  login = (loginData: any) => {
    return this._http.post(this.baseUrl + '/authenticate', loginData);
  };

  onChangeRole = (role: string) => {
    this.role$.next(role);
  };
}
// , {
//   headers: this.requestHeader,
// });
