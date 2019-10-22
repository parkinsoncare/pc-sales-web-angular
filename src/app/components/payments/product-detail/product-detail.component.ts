import {Component, Input, OnInit} from '@angular/core';
import {StripePaymentsService} from '../../../services/stripe-payments/stripe-payments.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() productId;
  product: any;

  constructor(private stripe: StripePaymentsService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.stripe.getProductById({
      productId: this.productId
    })
      .subscribe( r => {
        this.product = r;
      }, e => {
        this.snackMessage.open('Error getting product', 'x',{verticalPosition: 'top'});
      });
  }
}
