import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralService } from '../Services/general.service';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

  constructor(private generalSrv: GeneralService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiList = ['login', 'register', 'category'];
    const url = request.url.split('/')
    const index = apiList.indexOf(url[url.length - 1]);

    if (index === -1) {
      const modifiedReq = request.clone({
        setHeaders: {
          Authorization: this.generalSrv.getToken(),
        }
      })
      return next.handle(modifiedReq);
    }
    return next.handle(request);
  }
}
