import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';

@Component({
  selector: 'app-demo-rest-call',
  templateUrl: './demo-rest-call.component.html',
  styleUrls: ['./demo-rest-call.component.scss']
})
export class DemoRestCallComponent implements OnInit {

  @Input() callType: string;

  restResult= {status: 'Click above to try'};

  constructor(private restService: RestService) { }

  ngOnInit() {
  }

  callRESTEndpoint() {
    switch (this.callType) {
      case 'publicGet':
        this.publicGet();
        break;
      case 'publicPost':
        this.publicPost();
        break;
      case 'privateGet':
        this.privateGet();
        break;
      case 'privatePost':
        this.privatePost();
        break;
      case 'privateRequirePostPermission':
        this.privateRequirePostPermission();
        break;
      case 'privateNeverPermissionedPost':
        this.privateNeverPermissionedPost();
        break;
    }
  }

  publicGet() {
    this.restResult = { status: 'loading'};

    this.restService.publicGet()
      .subscribe ( result => {
        this.restResult = result;
      }, error => {
        this.restResult = error;
      });
  }

  publicPost() {
    this.restResult = { status: 'loading'};

    this.restService.publicPost( {myData: 'Hello, World!'})
      .subscribe ( result => {
        this.restResult = result;
      }, error => {
        this.restResult = error;
      });
  }

  privateGet() {
    this.restResult = { status: 'loading'};

    this.restService.privateGet()
      .subscribe ( result => {
        this.restResult = result;
      }, error => {
        this.restResult = error;
      });
  }

  privatePost() {
    this.restResult = { status: 'loading'};

    this.restService.privatePost( {myData: 'Hello, World!'})
      .subscribe ( result => {
        this.restResult = result;
      }, error => {
        this.restResult = error;
      });
  }

  privateRequirePostPermission() {
    this.restResult = { status: 'loading'};

    this.restService.privateRequirePostPermission( {myData: 'Hello, World!'})
      .subscribe ( result => {
        this.restResult = result;
      }, error => {
        this.restResult = error;
      });
  }

  privateNeverPermissionedPost() {
    this.restResult = { status: 'loading'};

    this.restService.privateRequireNeverPermission( {myData: 'Hello, World!'})
      .subscribe ( result => {
        this.restResult = result;
      }, error => {
        this.restResult = error;
      });
  }

}
