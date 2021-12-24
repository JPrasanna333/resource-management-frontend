import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  baseUrl = '/api';

  constructor(private _http: HttpClient) {}

  register = (registerData: any) => {
    return this._http.post(this.baseUrl + '/registerNewUser', registerData);
  };
}
