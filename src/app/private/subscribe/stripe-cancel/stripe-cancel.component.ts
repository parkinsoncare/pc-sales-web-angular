import { Component, OnInit } from '@angular/core';
import {StripePaymentsService} from '../../../services/stripe-payments/stripe-payments.service';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-stripe-cancel',
  templateUrl: './stripe-cancel.component.html',
  styleUrls: ['./stripe-cancel.component.scss']
})
export class StripeCancelComponent implements OnInit {

  sessionCancelledReason: string;
  sessionId: string;

  constructor(private stripe: StripePaymentsService,
              private snackMessage: MatSnackBar,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.sessionId = params['session_id'];
      this.stripe.sessionCancelled({sessionId: this.sessionId})
        .subscribe(r => {
        }, e => {
        });
    });
  }

  submitReason () {
    this.stripe.sessionCancelled({sessionId: this.sessionId, sessionCancelledReason: this.sessionCancelledReason})
      .subscribe(r => {
        alert('Thank you for the feedback');
      }, e => {
      });
  }

}
