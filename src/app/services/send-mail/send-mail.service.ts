import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(private http: HttpClient) { }

  sendEmail(params: any): any {
    return new Promise((resolve, reject) => {
      const searchUrl = environment.restServiceURL + '/sendmail/send/';

      this.http.post(searchUrl, params.body)
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
}
