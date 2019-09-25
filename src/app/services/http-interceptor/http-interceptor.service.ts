import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Observable, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private auth: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.auth.loggedIn) {
      return this.auth.getTokenSilently$().pipe(
        mergeMap(token => {

          //console.log('token', JSON.stringify(token, null, 4));

          const tokenReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          });
          return next.handle(tokenReq);
        }),
        //catchError(err => { Observable.throw(err) } )

        catchError((err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught));
        })
      );
    }
    else {
      return next.handle(req);
    }
  }

  generalErrorHandler(error: any, caught: Observable<any>): Observable<any> {
    console.log('error caught: ', error);
    if (error.error === 'login_required') {
      console.log('token has expired');
    }
    return error;
  }
}
