import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from './../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { SidenavBroadcastService } from '../../services/sidenav-broadcast/sidenav-broadcast.service';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss']
})
export class Header2Component implements OnInit, OnDestroy {
  watcher: Subscription;
  activeMediaQuery = '';
  env: any = environment;

  constructor(public auth: AuthService,
              public router: Router,
              private sidenavBroadcaster: SidenavBroadcastService,
              private mediaObserver: MediaObserver) {

    this.watcher = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change.mqAlias;
    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  toggleMenus() {
    this.sidenavBroadcaster.toggleMenu();
  }

}
