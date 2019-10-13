import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { environment } from './../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  publicGetResult = {status: 'Click above to try'};
  publicPostResult = {status: 'Click above to try'};
  privateGetResult = {status: 'Click above to try'};
  privatePostResult = {status: 'Click above to try'};
  permissionedAdminPostResult = {status: 'Click above to try'};
  permissionedNeverPostResult = {status: 'Click above to try'};

  publicPostMessage = 'Public POST message';
  privatePostMessage = 'Private POST message';
  permissionedAdminPostMessage = 'Permissionsed POST message';
  permissionedNeverPostMessage = 'Never permissioned POST message';

  env: any = environment;
  location: string;

  constructor(private restService: RestService,
              router: Router) { }

  ngOnInit() {
    // Used only for display purposes in the demo to say:
    // "Use Postman to call your endpoint at this URL"
    this.location = window.location.origin;
  }

  publicGet() {
    this.publicGetResult = { status: 'loading'};

    this.restService.publicGet()
      .subscribe ( result => {
        this.publicGetResult = result;
      }, error => {
        this.publicGetResult = error;
      });

  }

  publicPost() {
    this.publicPostResult = { status: 'loading'};

    this.restService.publicPost( { myData: this.publicPostMessage })
      .subscribe ( result => {
        this.publicPostResult = result;
      }, error => {
        this.publicPostResult = error;
      });
  }

  privateGet() {
    this.privateGetResult = { status: 'loading'};

    this.restService.privateGet()
      .subscribe ( result => {
        this.privateGetResult = result;
      }, error => {
        this.privateGetResult = error;
      });
  }

  privatePost() {
    this.privatePostResult = { status: 'loading'};

    this.restService.privatePost( { myData: this.privatePostMessage })
      .subscribe ( result => {
        this.privatePostResult = result;
      }, error => {
        this.privatePostResult = error;
      });
  }

  privateRequirePostPermission() {
    this.permissionedAdminPostResult = { status: 'loading'};

    this.restService.privateRequirePostPermission( { myData: this.permissionedAdminPostMessage })
      .subscribe ( result => {
        this.permissionedAdminPostResult = result;
      }, error => {
        this.permissionedAdminPostResult = error;
      });
  }

  privateNeverPermissionedPost() {
    this.permissionedNeverPostResult = { status: 'loading'};

    this.restService.privateRequireNeverPermission( {myData: 'Hello, World!'})
      .subscribe ( result => {
        this.permissionedNeverPostResult = result;
      }, error => {
        this.permissionedNeverPostResult = error;
      });
  }

  loadAll() {
    this.publicGet();
    this.publicPost();
    this.privateGet();
    this.privatePost();
    this.privateRequirePostPermission();
    this.privateNeverPermissionedPost();
  }

  // Eye candy: just a little color
  getClassFromStatus( resultObj ) {
    switch (resultObj.status) {
      case 'Click above to try':
        return 'idle';
        break;
      case 'loading':
        return 'loading';
        break;
      case 'success':
        return 'success';
        break;
      default:
        return 'failure';
        break;
    }
  }

  getDisplayURL( restServiceURL ) {
    if (restServiceURL.indexOf('http') === 0 ){
      return restServiceURL;
    }
    else {
      return this.location + restServiceURL;
    }
  }

  parseInt( x ) {
    return parseInt(x);
  }

}
