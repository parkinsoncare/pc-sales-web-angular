import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  @Input() type: string;

  showText: boolean = true;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  toggleText() {
    this.showText = !this.showText;
  }

}
