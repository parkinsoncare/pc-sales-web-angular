import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-divider',
  templateUrl: './sidebar-divider.component.html',
  styleUrls: ['./sidebar-divider.component.scss']
})
export class SidebarDividerComponent implements OnInit {
  @Input() dividerText: string;

  constructor() { }

  ngOnInit() {
  }

}
