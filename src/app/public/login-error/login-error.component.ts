import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login-error',
  templateUrl: './login-error.component.html',
  styleUrls: ['./login-error.component.scss']
})
export class LoginErrorComponent implements OnInit {
  errorType: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.errorType = params['errorType'];
      });
  }

}
