import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resource } from 'src/app/models/resources/resource';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  baseUrl = '/api';

  constructor(private _http: HttpClient) {}

  getAllResource = (pageNo: number, limit: number): Observable<Resource[]> => {
    const url = this.baseUrl + `/resources?page-no=${pageNo}&limit=${limit}`;
    return this._http.get<Resource[]>(url);
  };
}
