import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { MenuToggleBroadcastService } from '../../services/menu-toggle-broadcast/menu-toggle-broadcast.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  @Input() type: string;

  constructor(public auth: AuthService,
              public sideMenuState: MenuToggleBroadcastService) { }

  ngOnInit() {
  }

  toggleText() {
    this.sideMenuState.toggleTextDescriptions();
  }

}
