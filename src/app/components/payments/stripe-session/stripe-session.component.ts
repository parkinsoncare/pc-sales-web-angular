import { Component, Input, OnInit } from '@angular/core';
import { StripePaymentsService } from '../../../services/stripe-payments/stripe-payments.service';
import { MatSnackBar } from '@angular/material';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-stripe-session',
  templateUrl: './stripe-session.component.html',
  styleUrls: ['./stripe-session.component.scss']
})
export class StripeSessionComponent implements OnInit {
  @Input() user_Id: string;
  sessions: any[];

  itemsFound: number = 0;
  pageSize: number = 2;
  pageIndex: number = 0;
  pageSizeOptions: number [] = [2, 5, 10, 25];

  constructor(private stripe: StripePaymentsService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.stripe.getCompletedSessionsByAuth0UserId({
      user_id: this.user_Id,
      from: (this.pageIndex * this.pageSize), size: this.pageSize
    })
      .subscribe( r => {
        this.sessions = r.records;
        this.itemsFound = r.total;
      }, e => {
        this.snackMessage.open('Error getting purchase history', 'x',{verticalPosition: 'top'});
      });
  }

  pageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

}
