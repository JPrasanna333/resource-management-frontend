import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  header_value: string = '';
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    if(token != null){
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }
    return next.handle(req);
  }
}
