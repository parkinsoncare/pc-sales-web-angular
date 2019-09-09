import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {MatDrawer, MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import { Subscription, Observable } from 'rxjs';
import { MenuToggleBroadcastService } from '../../services/menu-toggle-broadcast/menu-toggle-broadcast.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import {SidebarMenuComponent} from '../../components/sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-public-root',
  templateUrl: './public-root.component.html',
  styleUrls: ['./public-root.component.scss']
})
export class PublicRootComponent implements OnInit, OnDestroy {
  @ViewChild(SidebarMenuComponent, {static: false}) sidebarMenu: SidebarMenuComponent;
  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;
  @ViewChild(MatSidenavContainer, {static: false}) sidenavContainer: MatSidenavContainer;
  menuToggleBroadcastSubscription: Subscription;

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
