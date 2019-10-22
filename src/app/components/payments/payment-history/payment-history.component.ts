import { Component, OnInit, Input } from '@angular/core';
import {StripePaymentsService} from '../../../services/stripe-payments/stripe-payments.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {
  @Input() user_Id: string;
  @Input() subscriptionId: string;

  payments: any[];

  itemsFound: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions: number [] = [2, 5, 10, 25];

  constructor(private stripe: StripePaymentsService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.stripe.getPaymentsBySubscriptionId({
      subscriptionId: this.subscriptionId,
      from: (this.pageIndex * this.pageSize), size: this.pageSize
    })
      .subscribe( r => {
        this.payments = r.records;
        this.itemsFound = r.total;
      }, e => {
        console.log(e);
        this.snackMessage.open('Error getting payment history', 'x',{verticalPosition: 'top'});
      });
  }

}
