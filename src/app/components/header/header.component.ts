import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { faUser, faPowerOff, faLanguage, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { SidenavBroadcastService } from '../../services/sidenav-broadcast/sidenav-broadcast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  env: any = environment;

  // From Auth0 nav-bar
  isCollapsed = true;
  faUser = faUser;
  faPowerOff = faPowerOff;
  faLanguage = faLanguage;
  faGlobe = faGlobe;

  constructor( private breakpointObserver: BreakpointObserver,
               public auth: AuthService,
               public router: Router,
               private sidenavBroadcaster: SidenavBroadcastService) { }

  ngOnInit() {
  }

  toggleMenus() {
    this.sidenavBroadcaster.toggleMenu();
  }

}
