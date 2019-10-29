import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { environment } from './../../../environments/environment';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SendMailService} from '../../services/send-mail/send-mail.service';

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

  salesFormEmptyData: any = {
    name: ['', [Validators.required]],
    company: [''],
    email: ['', [Validators.email]],
    telephone: ['', [Validators.required]],
    country: [''],
    comment: ['']
  };

  contact = JSON.parse(JSON.stringify(this.emptyContact));

  constructor(private restService: RestService,
              router: Router, private fb: FormBuilder, private mailer: SendMailService ) {
    this.contactUsForm = this.fb.group(this.emptyContact);
  }

  ngOnInit() {
    // Used only for display purposes in the demo to say:
    // "Use Postman to call your endpoint at this URL"
    this.location = window.location.origin;
    this.setContact();
  }

  setContact() {
    this.contact = JSON.parse(JSON.stringify(this.emptyContact));
  }

  onSubmit() {
    alert('in onSubmit');
  }

}
