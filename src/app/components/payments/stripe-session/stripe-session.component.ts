import { Component, Input, OnInit } from '@angular/core';
import { StripePaymentsService } from '../../../services/stripe-payments/stripe-payments.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-stripe-session',
  templateUrl: './stripe-session.component.html',
  styleUrls: ['./stripe-session.component.scss']
})
export class StripeSessionComponent implements OnInit {
  @Input() user_Id: string;
  result: string

  constructor(private stripe: StripePaymentsService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.stripe.getCompletedSessionsByAuth0UserId({user_id: this.user_Id})
      .subscribe( r => {
        this.result = JSON.stringify(r, null, 4);
      }, e => {
        this.snackMessage.open('Error searching for users', 'x',{verticalPosition: 'top'});
      });
  }

}
