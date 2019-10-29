import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { SidenavBroadcastService } from '../../services/sidenav-broadcast/sidenav-broadcast.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  @Input() type: string;

  constructor(public auth: AuthService,
              public sidenavBroadcaster: SidenavBroadcastService) { }

  ngOnInit() {
  }

  toggleText() {
    this.sidenavBroadcaster.toggleTextDescriptions();
  }

}
