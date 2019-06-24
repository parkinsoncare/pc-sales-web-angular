import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { MatDrawer } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { MenuToggleBroadcastService } from '../../services/menu-toggle-broadcast/menu-toggle-broadcast.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-public-root',
  templateUrl: './public-root.component.html',
  styleUrls: ['./public-root.component.scss']
})
export class PublicRootComponent implements OnInit, OnDestroy {
  @ViewChild('drawer', { static: true }) drawer: MatDrawer;
  menuToggleBroadcastSubscription: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(public auth: AuthService,
              private menuToggleBroadcast: MenuToggleBroadcastService,
              private breakpointObserver: BreakpointObserver) {
    this.menuToggleBroadcastSubscription = menuToggleBroadcast.menuToggled$.subscribe( bValue => {
      this.drawer.toggle();
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.menuToggleBroadcastSubscription.unsubscribe();
  }

}
