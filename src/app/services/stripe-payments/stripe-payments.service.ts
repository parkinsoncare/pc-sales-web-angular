import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripePaymentsService {
  stripe = new Stripe(environment.stripe.publishable_key); // use your test publishable key

  constructor(private http: HttpClient) { }

  createSession(params: any): Observable < any > {
    return this.http.post(environment.stripe.stripeRestServiceUrl + '/createSession/', params);
  }

  getSession(params: any): Observable < any > {
    return this.http.post(environment.stripe.stripeRestServiceUrl + '/getSession/', params);
  }

  getStripeSubscriptions(params: any): Observable < any > {
    return this.http.post(environment.stripe.stripeRestServiceUrl + '/getStripeSubscriptions/', params);
  }

  getSubcriptionPaymentHistory(params: any): Observable < any > {
    return this.http.post(environment.stripe.stripeRestServiceUrl + '/getSubcriptionPaymentHistory/', params);
  }

  getPayments(params: any): Observable < any > {
    return this.http.post(environment.stripe.stripeRestServiceUrl + '/getPayments/', params);
  }

  savePurchaseRequest(params: any): Observable < any > {
    return this.http.post(environment.stripe.stripeRestServiceUrl + '/savePurchaseRequest/', params);
  }

  sessionCancelled(params: any): Observable < any > {
    return this.http.post(environment.stripe.stripeRestServiceUrl + '/sessionCancelled/', params);
  }
}
