import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-required-dialog',
  templateUrl: './login-required-dialog.component.html',
  styleUrls: ['./login-required-dialog.component.css']
})
export class LoginRequiredDialogComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService, public dialogRef: MatDialogRef<LoginRequiredDialogComponent>) { }

  ngOnInit() {
  }

  goToLogin() {
    this.auth.login();
  }

  goToSignup() {
    this.auth.login();
  }

  goToSalesContact() {
    this.dialogRef.close();
    this.router.navigate(['/public/contactus']);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
