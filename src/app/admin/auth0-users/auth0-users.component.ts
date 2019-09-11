import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../../environments/environment';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-auth0-users',
  templateUrl: './auth0-users.component.html',
  styleUrls: ['./auth0-users.component.scss']
})
export class Auth0UsersComponent implements OnInit {

  removethis: string;

  users: any[];
  selectedUser: any;

  itemsFound: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  pageSizeOptions: number [] = [5, 10, 25];

  constructor(private rest: RestService,
              private snackMessage: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {

    const params = { pageIndex: this.pageIndex, pageSize: this.pageSize, searchTerms: { email: null }};

    this.rest.adminGetUsers(params)
      .subscribe ( r => {
        console.log(r);
        const response = JSON.parse(r);
        this.users = response.users;
        this.itemsFound = response.total;

      }, e => {
        this.snackMessage.open('Error searching for users', null,{verticalPosition: 'top', duration:  environment.snackBarDuration});
      });
  }

  pageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  selectUser(clickedUser) {
    this.selectedUser = null;

    const params = { user_id: clickedUser.user_id};

    this.rest.adminGetUser(params)
      .subscribe ( r => {
        console.log(r);
        const response = JSON.parse(r);
        this.selectedUser = response;
      }, e => {
        this.snackMessage.open('Error getting user', null,{verticalPosition: 'top', duration:  environment.snackBarDuration});
      });
  }

  isSelectedItem(listUser) {
    if (!this.selectedUser || this.selectedUser.user_id !== listUser.user_id) { return false; }
    else { return true; }
  }

}
