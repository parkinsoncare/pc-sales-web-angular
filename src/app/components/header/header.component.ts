import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MenuToggleBroadcastService } from '../../services/menu-toggle-broadcast/menu-toggle-broadcast.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { faUser, faPowerOff, faLanguage, faGlobe } from '@fortawesome/free-solid-svg-icons';

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
               private menuBroadcast: MenuToggleBroadcastService) { }

  ngOnInit() {
  }

  toggleMenus() {
    this.menuBroadcast.toggleMenu();
  }

}
