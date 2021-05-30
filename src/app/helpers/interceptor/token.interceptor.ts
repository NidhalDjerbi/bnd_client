import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  AUTH_HEADER: string = 'authorization';
  constructor(private CookieService:CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.CookieService.get('token')){
      request = request.clone({
      headers: request.headers.set(this.AUTH_HEADER, 'Bearer ' + this.CookieService.get('token') ),
      });
    }


    return next.handle(request);
  }
}
