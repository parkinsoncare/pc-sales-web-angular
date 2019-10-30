import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SendMailService } from './../../services/send-mail/send-mail.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  salesForm: FormGroup;
  salesFormEmptyData: any = {
    name: ['', [Validators.required]],
    company: [''],
    email: ['', [Validators.email]],
    telephone: ['', [Validators.required]],
    country: [''],
    comment: ['']
  };

  constructor(private fb: FormBuilder, private mailer: SendMailService ) {
    this.salesForm = this.fb.group(this.salesFormEmptyData);
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('sales data: ', JSON.stringify(this.salesForm.value, null, 4));
    this.mailer.sendEmail( {body: this.salesForm.value})
      .subscribe( response => {
        alert('Your request was sent.');
        this.salesForm.reset();
      }, err => {
        alert ('There was an error in sending your request.');
      });
  }

}
