import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { MenuToggleBroadcastService } from '../../services/menu-toggle-broadcast/menu-toggle-broadcast.service';
import { MatSidenavContainer, MatSidenav } from '@angular/material';
import {SidebarMenuComponent} from '../../components/sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-private-root',
  templateUrl: './private-root.component.html',
  styleUrls: ['./private-root.component.scss']
})
export class PrivateRootComponent implements OnInit {
  @ViewChild(SidebarMenuComponent, {static: false}) sidebarMenu: SidebarMenuComponent;
  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;
  @ViewChild(MatSidenavContainer, {static: false}) sidenavContainer: MatSidenavContainer;

  menuToggleBroadcastSubscription: Subscription;
  showText = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(public auth: AuthService,
              private menuToggleBroadcast: MenuToggleBroadcastService,
              private breakpointObserver: BreakpointObserver) {

    this.menuToggleBroadcastSubscription = menuToggleBroadcast.menuToggled$.subscribe( bValue => {
      this.sidenav.toggle();
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.menuToggleBroadcastSubscription.unsubscribe();
  }

  toggleText() {
    this.sidebarMenu.toggleText();
    this.sidenavContainer.autosize = true;
    setTimeout(() => { this.sidenavContainer.autosize = false; } , 1000);
  }
}
