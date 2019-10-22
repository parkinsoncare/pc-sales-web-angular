import {Component, Input, OnInit} from '@angular/core';
import {StripePaymentsService} from '../../../services/stripe-payments/stripe-payments.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss']
})
export class PlanDetailComponent implements OnInit {
  @Input() planId;
  plan: any;

  constructor(private stripe: StripePaymentsService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.stripe.getPlanById({
      planId: this.planId
    })
      .subscribe( r => {
        this.plan = r;
      }, e => {
        this.snackMessage.open('Error getting plan', 'x',{verticalPosition: 'top'});
      });
  }

}
