import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { SidebarMenuComponent } from '../../components/sidebar-menu/sidebar-menu.component';
import { MatSidenav, MatSidenavContainer } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { MenuToggleBroadcastService } from '../../services/menu-toggle-broadcast/menu-toggle-broadcast.service';

@Component({
  selector: 'app-admin-root',
  templateUrl: './admin-root.component.html',
  styleUrls: ['./admin-root.component.scss']
})
export class AdminRootComponent implements OnInit, OnDestroy {
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
