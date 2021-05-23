 
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      console.log(sessionStorage.getItem('token'));
      req = req.clone({
        setHeaders: {
          //Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYXZhaW51c2UiLCJpc0FkbWluIjp0cnVlLCJleHAiOjE2MjE3Nzc3MDYsImlhdCI6MTYyMTc2ODcwNn0.UU21rkwyQ3X2TeWkE4VoGPia6QIrOwlh9STJwG931A8dgwZY49d5Gj25BgAS6pmVlpuDCjcWVZfH8bOlrPV1pw'        
        }
      })
    }

    return next.handle(req);

  }
}