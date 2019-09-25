import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StripePaymentsService } from '../../../services/stripe-payments/stripe-payments.service';
import { MatSnackBar } from '@angular/material';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-stripe-thanks',
  templateUrl: './stripe-thanks.component.html',
  styleUrls: ['./stripe-thanks.component.scss']
})
export class StripeThanksComponent implements OnInit {
  sessionId: string;
  session: any;
  env: string;
  paymentReferenceId: string;

  constructor(private stripe: StripePaymentsService,
              private snackMessage: MatSnackBar,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.sessionId = params['session_id'];
      this.loadData();
    });

  }

  loadData() {
    this.stripe.getSession({sessionId: this.sessionId})
      .subscribe(r => {
        this.session = r;
        console.log(this.session);
        [this.paymentReferenceId, this.env] = this.session._source.session.client_reference_id.split('|');
      }, e => {
        this.snackMessage.open('Error getting PatientId', null,{duration:  environment.snackBarDuration, verticalPosition: 'top'});
      });
  }


}
