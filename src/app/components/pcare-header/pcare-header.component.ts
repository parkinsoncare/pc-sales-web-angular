import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SidenavBroadcastService } from '../../services/sidenav-broadcast/sidenav-broadcast.service';

@Component({
  selector: 'app-pcare-header',
  templateUrl: './pcare-header.component.html',
  styleUrls: ['./pcare-header.component.scss']
})
export class PcareHeaderComponent implements OnInit {

  env: any = environment;
  constructor(private sidenavBroadcaster: SidenavBroadcastService) { }

  ngOnInit() {
  }

  toggleMenus() {
    this.sidenavBroadcaster.toggleMenu();
  }

}
