import {Component, Input, OnInit} from '@angular/core';
import {StripePaymentsService} from '../../../services/stripe-payments/stripe-payments.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  @Input() stripeCustomerId;
  stripeCustomer: any;

  constructor(private stripe: StripePaymentsService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.stripe.getCustomerById({
      stripeCustomerId: this.stripeCustomerId
    })
      .subscribe( r => {
        this.stripeCustomer = r;
      }, e => {
        this.snackMessage.open('Error getting customer', 'x',{verticalPosition: 'top'});
      });
  }
}
