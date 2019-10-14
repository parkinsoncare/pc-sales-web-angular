import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { MenuToggleBroadcastService } from '../../services/menu-toggle-broadcast/menu-toggle-broadcast.service';
import { MatSidenavContainer, MatSidenav } from '@angular/material';
import { SidebarMenuComponent } from '../../components/sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-private-root',
  templateUrl: './private-root.component.html',
  styleUrls: ['./private-root.component.scss']
})
export class PrivateRootComponent implements OnInit, OnDestroy {
  @ViewChild(SidebarMenuComponent, {static: false}) sidebarMenu: SidebarMenuComponent;
  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;
  @ViewChild(MatSidenavContainer, {static: false}) sidenavContainer: MatSidenavContainer;

  menuToggleBroadcastSubscription: Subscription;

  constructor(public auth: AuthService,
              private menuToggleBroadcast: MenuToggleBroadcastService) {

    this.menuToggleBroadcastSubscription = menuToggleBroadcast.menuToggled$.subscribe( bValue => {
      this.resizeSidenav();
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.menuToggleBroadcastSubscription.unsubscribe();
  }

  resizeSidenav() {
    this.sidenavContainer.autosize = true;
    setTimeout(() => { this.sidenavContainer.autosize = false; } , 1000);
  }
}
