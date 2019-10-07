import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from './../../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { StripePaymentsService } from '../../../services/stripe-payments/stripe-payments.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  tosFormGroup: FormGroup;
  dataHandlingFormGroup: FormGroup;
  productFormGroup: FormGroup;

  dataHandlingAgreement: string;
  tosAgreement: string;

  // Stripe
  stripeSession: any;

  constructor(private formBuilder: FormBuilder,
              private stripe: StripePaymentsService,
              private snackMessage: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private auth: AuthService) { }

  ngOnInit() {
    this.getAgreements();

    const tosShape = {
      termsOfServiceText: [this.tosAgreement],
      termsOfServiceAccepted: ['', [Validators.requiredTrue]]
    };
    this.tosFormGroup = this.formBuilder.group( tosShape );

    const dataHandlingShape = {
      dataHandlingText: [this.dataHandlingAgreement],
      dataHandlingAccepted: ['', [Validators.requiredTrue]]
    };
    this.dataHandlingFormGroup = this.formBuilder.group( dataHandlingShape );

    this.productFormGroup = this.formBuilder.group({
      product: ['', Validators.required]
    });
  }

  getAgreements() {
    const type1 = 'neuro-data-handling';
    const type2 = 'neuro-terms-of-service';

    forkJoin({
      tos: this.http.get('assets/agreements/en/tos.txt', { responseType: 'text' }),
      dataHandling: this.http.get('assets/agreements/en/data-handling.txt', { responseType: 'text' })
    })
      .subscribe( r => {

        this.dataHandlingAgreement = r.dataHandling;
        this.tosAgreement = r.tos;

        const tosShape = {
          termsOfServiceText: [this.tosAgreement],
          termsOfServiceAccepted: [false, [Validators.requiredTrue]]
        };
        this.tosFormGroup = this.formBuilder.group( tosShape );

        const dataHandlingShape = {
          dataHandlingText: [this.dataHandlingAgreement],
          dataHandlingAccepted: [false, [Validators.requiredTrue]]
        };
        this.dataHandlingFormGroup = this.formBuilder.group( dataHandlingShape );

      },  e => {
        this.snackMessage.open('Error loading consent content', null,{duration:  environment.snackBarDuration});
      });
  }

  getDataHandlingText() {
    return this.dataHandlingAgreement;
  }

  getTermsOfServiceText() {
    return this.tosAgreement;
  }

  async initiateStripe() {

    this.auth.userProfile$
      .subscribe( user => {

        const payment = {
          ...this.dataHandlingFormGroup.value,
          ...this.tosFormGroup.value,
          ...this.productFormGroup.value,
          createDate: new Date(),
          auth0UserSub: user.sub,
          purchaseData: environment.stripe.purchaseableItems[this.productFormGroup.value.product]
        };

        this.stripe.createSession(payment)
          .subscribe(stripeSession => {

            this.stripeSession = stripeSession;
            this.snackMessage.open('Got Stripe Session', null, {duration: environment.snackBarDuration, verticalPosition: 'bottom'});

            this.stripe.stripe.redirectToCheckout({
              // Make the id field from the Checkout Session creation API response
              // available to this file, so you can provide it as parameter here
              // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
              sessionId: stripeSession._id
            }).then((result) => {
              // If `redirectToCheckout` fails due to a browser or network
              // error, display the localized error message to your customer
              // using `result.error.message`.
              console.log(result);
            });

          }, e => {
            this.snackMessage.open('Error getting Stripe Session', null, {duration: environment.snackBarDuration, verticalPosition: 'top'});
          });
      }, e => {
        this.snackMessage.open('Error getting user profile', null, {duration: environment.snackBarDuration, verticalPosition: 'top'});
      });



  }

  setupPayment() {
    this.auth.userProfile$
      .subscribe( user => {

        const payment = {
          ...this.dataHandlingFormGroup.value,
          ...this.tosFormGroup.value,
          ...this.productFormGroup.value,
          createDate: new Date(),
          auth0UserSub: user.sub,
          purchaseData: environment.stripe.purchaseableItems[this.productFormGroup.value.product]
        };


        /*
        this.stripe.savePurchaseRequest(payment)
          .subscribe ( savedPayment => {
            this.creditCard(savedPayment);
          }, e => {
            this.snackMessage.open('Error saving payment Info!', null,{verticalPosition: 'top', duration:  environment.snackBarDuration});
          });
          */

      });
  }


  makeId(length) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}
