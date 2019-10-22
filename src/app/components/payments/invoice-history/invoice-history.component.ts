import {Component, Input, OnInit} from '@angular/core';
import {StripePaymentsService} from '../../../services/stripe-payments/stripe-payments.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-invoice-history',
  templateUrl: './invoice-history.component.html',
  styleUrls: ['./invoice-history.component.scss']
})
export class InvoiceHistoryComponent implements OnInit {
  @Input() stripeCustomerId: string;
  @Input() stripeSubscriptionId: string;
  stripeInvoices: any;

  constructor(private stripe: StripePaymentsService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    let params;
    if (this.stripeCustomerId) { params = { stripeCustomerId: this.stripeCustomerId }; }
    if (this.stripeSubscriptionId) { params = { stripeSubscriptionId: this.stripeSubscriptionId }; }

    params.size = 100;

    this.stripe.getInvoiceList(params)
      .subscribe( r => {
        this.stripeInvoices = r;
      }, e => {
        this.snackMessage.open('Error getting invoices', 'x', { verticalPosition: 'top' });
      });
  }
}
