import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable()
export class SecHeadersInterceptor implements HttpInterceptor {

  constructor(private authService: UserAuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers: any = {};

    let token = '';
    if (this.authService.authToken) {
      token = this.authService.authToken;
    } else {
      token = localStorage.getItem('token')?? '';
    }

    if (token != '') {
      headers.Authorization = `Bearer ${token}`;
    }

    return next.handle(request.clone({
      setHeaders: headers,
    }));
  }
}
