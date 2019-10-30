import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(private http: HttpClient) { }

  sendEmailOld(params: any): any {
    return new Promise((resolve, reject) => {
      const searchUrl = environment.restServiceURL + '/sendmail/send/';

      this.http.post(searchUrl, params)
        .subscribe(response => {
            resolve (response);
          },
          err => {
            reject (err);
          },
          () => {
            return;
          });
    });
  }

  sendEmail(params:any): Observable <any> {
    return this.http.post(environment.restServiceURL + '/sendmail/send/', params);
  }
}
