import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SidenavBroadcastService } from '../../services/sidenav-broadcast/sidenav-broadcast.service';
import { MatDrawer, MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { Subscription, Observable } from 'rxjs';
import { SidebarMenuComponent } from '../../components/sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-public-root',
  templateUrl: './public-root.component.html',
  styleUrls: ['./public-root.component.scss']
})
export class PublicRootComponent implements OnInit {

  @ViewChild(SidebarMenuComponent, {static: false}) sidebarMenu: SidebarMenuComponent;
  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;
  @ViewChild(MatSidenavContainer, {static: false}) sidenavContainer: MatSidenavContainer;
  menuToggleBroadcastSubscription: Subscription;
  textToggleBroadcastSubscription: Subscription;

  constructor(
              private sidenavBroadcaster: SidenavBroadcastService) {
    this.menuToggleBroadcastSubscription = sidenavBroadcaster.menuToggled$.subscribe( bValue => {
      this.toggleMenu();
    });
    this.textToggleBroadcastSubscription = sidenavBroadcaster.textToggled$.subscribe( bValue => {
      this.toggleText();
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.menuToggleBroadcastSubscription.unsubscribe();
    this.textToggleBroadcastSubscription.unsubscribe();
  }

  toggleMenu() {
    this.sidenav.toggle();
  }

  toggleText() {
    this.sidenavContainer.autosize = true;
    setTimeout(() => { this.sidenavContainer.autosize = false; } , 1000);
  }

}
