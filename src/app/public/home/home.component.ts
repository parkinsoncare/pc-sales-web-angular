import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { environment } from './../../../environments/environment';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendMailService } from '../../services/send-mail/send-mail.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contactUsForm: FormGroup;

  env: any = environment;
  location: string;

  emptyContact = {
    name: ['', [Validators.required]],
    telNumber: ['', [Validators.required]],
    email: ['', [Validators.email]],
    acceptedTOC: ['', [Validators.requiredTrue]]
  };

  contact = JSON.parse(JSON.stringify(this.emptyContact));

  constructor(private restService: RestService,
              router: Router, private fb: FormBuilder,
              private mailer: SendMailService,
              private snackMessage: MatSnackBar) {
    this.setContact();
  }

  ngOnInit() {
    // Used only for display purposes in the demo to say:
    // "Use Postman to call your endpoint at this URL"
    this.location = window.location.origin;
    this.setContact();
  }

  setContact() {
    this.contactUsForm = this.fb.group(this.emptyContact)
  }

  onSubmit() {
    this.mailer.sendEmail(this.contactUsForm.value)
      .subscribe ( r => {
        this.snackMessage.open('Tuoi dati sono stati inviati a ParkinsonCare', 'x',{verticalPosition: 'top'});
        // This results in non-optimal ui (required fields are red)
        // Should be resolved before using
        // this.contactUsForm.reset();
      }, e => {
        this.snackMessage.open('Errore inviando suoi dati', 'x',{verticalPosition: 'bottom'});
      });
  }

}
