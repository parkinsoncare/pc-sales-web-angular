import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import {GTagManagerService} from '../../services/g-tag-manager/g-tag-manager.service';


enum RestStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Failure = 'failure'
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  publicGetRestResult: any;
  publicPostRestResult: any;
  privateGetRestResult: any;
  privatePostRestResult: any;

  publicGetStatus: string = '';
  publicPostStatus: string = '';
  privateGetStatus: string = '';
  privatePostStatus: string = '';

  constructor(private restService: RestService,
              private gtm: GTagManagerService) { }

  ngOnInit() {

  }

  loadData() {

    this.publicGetRestResult = '';
    this.publicPostRestResult = '';
    this.privateGetRestResult = '';
    this.privatePostRestResult = '';

    this.publicGetStatus = RestStatus.Loading;
    this.publicPostStatus = RestStatus.Loading;
    this.privateGetStatus = RestStatus.Loading;
    this.privatePostStatus = RestStatus.Loading;

    this.restService.publicGet()
      .subscribe ( result => {
        this.publicGetRestResult = result;
        this.publicGetStatus = RestStatus.Success;
      }, error => {
        this.publicGetRestResult = error;
        this.publicGetStatus = RestStatus.Failure;
      });

    this.restService.publicPut( {myData: 'Hello, World!'})
      .subscribe ( result => {
        this.publicPostRestResult = result;
        this.publicPostStatus = RestStatus.Success;
      }, error => {
        this.publicPostRestResult = error;
        this.publicPostStatus = RestStatus.Failure;
      });

    // Private calls
    this.restService.privateGet()
      .subscribe ( result => {
        this.privateGetRestResult = result;
        this.privateGetStatus = RestStatus.Success;
      }, error => {
        this.privateGetRestResult = error;
        this.privateGetStatus = RestStatus.Failure;
      });

    this.restService.privatePut( {myData: 'Hello, World!'})
      .subscribe ( result => {
        this.privatePostRestResult = result;
        this.privatePostStatus = RestStatus.Success;
      }, error => {
        this.privatePostRestResult = error;
        this.privatePostStatus = RestStatus.Failure;
      });

  }

}
